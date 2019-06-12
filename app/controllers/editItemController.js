const mongoose = require('mongoose');
const logger = require('../libs/loggerLib');
const responseLib = require('../libs/responseLib');
const checkLib = require('../libs/checkLib');
const timeLib = require('../libs/timeLib');
const shortid = require('shortid');
const TodoListModel = mongoose.model('TodoList');
const awsFileUpload = require('../libs/awsFileUpload');

singleUpload = awsFileUpload.single('file');

/**
 * will upload file to amazon s3 bucket
 * @author Bhaskar Pawar
 * @param {*} req 
 * @param {*} res 
 */
let uploadFileCloud = (req, res) => {
    uploadToAWSS3 = () => {
        return new Promise((resolve, reject) => {
            singleUpload(req, res, (err) => {
                if (err) {
                    logger.error('AWS file upload failed', 'issueController:uploadFile()', 1);
                    let apiResponse = responseLib.generateResponse(true, 'Error in uploading file on aws', 202, null);
                    reject(apiResponse);
                }
                else {
                    logger.info('file uploaded to aws', 'issueController:uploadFile()', 1);
                    let response = {
                        fileName: req.file.originalname,
                        fileLocation: req.file.location
                    }
                    resolve(response);
                }
            })
        })
    }//end of upload to AWSS3

    uploadToAWSS3(req, res)
        .then((file) => {
            let apiResponse = responseLib.generateResponse(false, 'File uploaded', 200, file);
            res.send(apiResponse);
        }).catch((err) => {
            res.send(err);
        })
}// end of upload file cloud


/**
 * @author Bhaskar Pawar
 * @decription will return the single item to client
 * @param {*} req 
 * @param {*} res 
 */
let getSingleItem = (req, res) => {
    getItem = () => {
        return new Promise((resolve, reject) => {
            TodoListModel.findOne({ id: req.params.listId }, { owner: req.params.userId })
                .select('id title itemsList').exec((err, listDetails) => {
                    if (err) {
                        logger.error('failed to find a list', 'editItemController:getSingleItem:getItem()', 1);
                        let apiResponse = responseLib.generateResponse(true, 'failed to find a list', 500, null);
                        reject(apiResponse);
                    }
                    else {
                        let item = listDetails.itemsList.find(item => item.itemId === req.params.itemId);
                        resolve(item);
                    }
                })
        })
    }//end of get Item

    getItem(req, res)
        .then((response) => {
            let apiResponse = responseLib.generateResponse(false, 'item fetched', 200, response);
            res.status(apiResponse.status).send(apiResponse);
        }).catch((err) => {
            res.status(err.status).send(err);
        })
}//end of get single item

/**
 * @author Bhaskar Pawar
 * @decription will edit the single item in the list
 * @param {*} req 
 * @param {*} res 
 */
let editItemInList = (req, res) => {
    editItem = () => {
        return new Promise((resolve, reject) => {
            TodoListModel.findOne({ id: req.params.listId }, { owner: req.params.userId })
                .select('title itemsList').exec((err, listDetails) => {
                    if (err) {
                        logger.error('failed to find a list', 'editItemController:editItemInList:editItem()', 1);
                        let apiResponse = responseLib.generateResponse(true, 'failed to find a list', 500, null);
                        reject(apiResponse);
                    }
                    else {
                        let item = listDetails.itemsList.find(item => item.itemId === req.params.itemId);
                        item.title = checkLib.trim(req.body.title);
                        item.description = checkLib.trim(req.body.description);
                        item.fileName = req.body.fileName;
                        item.fileLocation = req.body.fileLocation;
                        item.dueDate = req.body.dueDate;
                        item.createdOn = timeLib.now();
                        listDetails.save((err, result) => {
                            if (err) {
                                logger.error('error in updating item in the list', 'editItemController:editItemInList:editItem()', 1);
                                let apiResponse = responseLib.generateResponse(true, 'item updation failed', 500, null);
                                reject(apiResponse);
                            }
                            else {
                                resolve(item);
                            }
                        })
                    }
                })
        })
    }//end of get Item

    editItem(req, res)
        .then((response) => {
            let apiResponse = responseLib.generateResponse(false, 'item edited successfully ', 200, response);
            res.status(apiResponse.status).send(apiResponse);
        }).catch((err) => {
            res.status(err.status).send(err);
        })
}//end of get single item


/**
 * @description will add new sub item to the the items list
 * @author Bhaskar Pawar
 * @param {*} req 
 * @param {*} res 
 */
let addSubItemToItemList = (req, res) => {
    let title = checkLib.trim(req.body.title);
    let flag = false;
    addSubItem = () => {
        return new Promise((resolve, reject) => {
            TodoListModel.findOne({ id: req.params.listId }, { owner: req.params.userId })
                .select('itemsList').exec((err, listDetails) => {
                    if (err) {
                        logger.error('failed to find a list', 'editItemController:addSubItemToItemList:addSubItem()', 1);
                        let apiResponse = responseLib.generateResponse(true, 'failed to find a list', 500, null);
                        reject(apiResponse);
                    }
                    else if (checkLib.isEmpty(listDetails)) {
                        logger.error('not list found', 'editItemController:addSubItemToItemList:addSubItem()', 1);
                        let apiResponse = responseLib.generateResponse(true, 'list not found', 202, null);
                        reject(apiResponse);
                    }
                    else {
                        let item = listDetails.itemsList.find(item => item.itemId === req.params.itemId);
                        if (!checkLib.isEmpty(item.subitemsList)) {
                            flag = item.subitemsList.some((obj) => { return obj.title === title });
                        }
                        if (flag) {
                            logger.info('sub item with this name already present', 'editItemController:addSubItemToItemList:addSubItem()', 1);
                            let apiResponse = responseLib.generateResponse(true, 'sub item with this name already exists !', 201, null);
                            reject(apiResponse);
                        }
                        else {
                            let newSubItem = {
                                subItemId: shortid.generate(),
                                title: title
                            }
                            item.subitemsList.push(newSubItem);
                            listDetails.save((err, result) => {
                                if (err) {
                                    logger.error('failed to add sub item to the items list', 'editItemController:addItemToList:addItem()', 1);
                                    let apiResponse = responseLib.generateResponse(true, 'adding sub item to items list failed', 500, null);
                                    reject(apiResponse);
                                }
                                else {
                                    let details = {
                                        title: item.title,
                                        subItem: newSubItem
                                    }
                                    resolve(details);
                                }
                            })
                        }
                    }
                })
        })
    }//end of add sub item

    addSubItem(req, res)
        .then((response) => {
            let apiResponse = responseLib.generateResponse(false, `added sub item to items list ${response.title} sucessfully`, 200, response);
            res.status(apiResponse.status).send(apiResponse);
        }).catch((err) => {
            res.status(err.status).send(err);
        })
}//end of add sub item to items list

/**
 * @description Will delete list sub item from DB
 * @author Bhaskar Pawar
 * @param {*} req 
 * @param {*} res
 * @returns {Response} response
 */
let deleteSubItemfromItemsList = (req, res) => {
    deleteListSubItemDB = () => {
        return new Promise((resolve, reject) => {
            TodoListModel.findOne({ id: req.params.listId }, { owner: req.params.userId }).select('title itemsList')
                .exec((err, result) => {
                    if (err) {
                        logger.error('failed to find a list', 'editItemController:deleteSubItemfromItemsList:deleteListSubItemDB()', 1);
                        let apiResponse = responseLib.generateResponse(true, 'failed to find a list', 500, null);
                        reject(apiResponse);
                    }
                    else if (checkLib.isEmpty(result)) {
                        logger.error('not list found', 'editItemController:deleteSubItemfromItemsList:deleteListSubItemDB()', 1);
                        let apiResponse = responseLib.generateResponse(true, 'list not found', 202, null);
                        reject(apiResponse);
                    }
                    else {
                        let item = result.itemsList.find(item => item.itemId === req.params.itemId);
                        let index = item.subitemsList.findIndex(subItem => subItem.subItemId === req.params.subItemId);
                        item.subitemsList.splice(index, 1);
                        result.save((err, listItemDetails) => {
                            if (err) {
                                logger.error('failed to delet an item from the list', 'editItemController:deleteSubItemfromItemsList:deleteListSubItemDB()', 1);
                                let apiResponse = responseLib.generateResponse(true, 'deleting item from the list failed', 500, null);
                                reject(apiResponse);
                            }
                            else {
                                let response = {
                                    title: item.title,
                                    details: listItemDetails
                                }
                                resolve(response);
                            }
                        })
                    }
                })
        })
    }//end of delete items list sub item DB

    deleteListSubItemDB(req, res)
        .then((response) => {
            let apiResponse = responseLib.generateResponse(false, `deleted sub item from the items list ${response.title} sucessfully`, 200, response);
            res.status(apiResponse.status).send(apiResponse);
        }).catch((err) => {
            res.status(err.status).send(err);
        })

}//end delete items list sub item

/**
 * @author Bhaskar Pawar
 * @description will mark sub item done in DB
 * @param {*} req 
 * @param {*} res 
 */
let markSubItemDone = (req, res) => {
    markDone = () => {
        return new Promise((resolve, reject) => {
            TodoListModel.findOne({id : req.params.listId} , {owner: req.params.userId})
            .select('id title itemsList').exec((err, listDetail) => {
                if (err) {
                    logger.error('error in finding a list', 'editItemController:markSubItemDone:markDone()', 1);
                    let apiResponse = responseLib.generateResponse(true, 'list not found', 500, null);
                    reject(apiResponse);
                }
                else {
                    let item = listDetail.itemsList.find(item => item.itemId === req.params.itemId);
                    let subItem = item.subitemsList.find(subItem => subItem.subItemId === req.params.subItemId)
                    subItem.isDone = req.body.isDone;
                    listDetail.save((err, updatedList) => {
                        if (err) {
                            logger.error('error in marking done item in a list', 'editItemController:markSubItemDone:markDone()', 1);
                            let apiResponse = responseLib.generateResponse(true, 'marking done operation failed', 202, null);
                            reject(apiResponse);
                        }
                        else {
                            resolve(subItem);
                        }
                    })
                }
            })
        })
    }//end of mark done

    markDone(req, res)
    .then((response) => {
        let apiResponse = responseLib.generateResponse(false, 'Mark sub item done successsful', 200, response);
        res.status(apiResponse.status).send(apiResponse);
    }).catch((err) => {
        res.status(err.status).send(err);
    })
}//end of mark done sub item



module.exports = {
    getSingleItem: getSingleItem,
    editItemInList: editItemInList,
    addSubItemToItemList: addSubItemToItemList,
    deleteSubItemfromItemsList: deleteSubItemfromItemsList,
    markSubItemDone: markSubItemDone,
    uploadFileCloud: uploadFileCloud
}