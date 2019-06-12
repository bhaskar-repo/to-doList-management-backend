const mongoose = require('mongoose');
const logger = require('../libs/loggerLib');
const responseLib = require('../libs/responseLib');
const checkLib = require('../libs/checkLib');
const shortid = require('shortid');
const timeLib = require('../libs/timeLib');
const TodoListModel = mongoose.model('TodoList');

/**
 * @description will return single list
 * @author Bhaskar Pawar
 * @param {*} req 
 * @param {*} res 
 */
let getSingleList = (req, res) => {
    returnList = () => {
        return new Promise((resolve, reject) => {
            TodoListModel.findOne({ id: req.params.listId }, { owner: req.params.userId })
                .select('id title itemsList').exec((err, singleListObj) => {
                    if (err) {
                        logger.error('error in finding a list', 'editListController:getSingleList()', 1);
                        let apiResponse = responseLib.generateResponse(true, 'error in finding a list', 500, null);
                        reject(apiResponse);
                    }
                    else {
                        resolve(singleListObj);
                    }
                })
        })
    }//emd of return list

    returnList(req, res)
        .then((response) => {
            let apiResponse = responseLib.generateResponse(false, 'list found', 200, response);
            res.status(apiResponse.status).send(apiResponse);
        }).catch((err) => {
            res.status(err.status).send(err);
        })
}//end of getSingle list

/**
 * @description will add new item to the list
 * @author Bhaskar Pawar
 * @param {*} req 
 * @param {*} res 
 */
let addItemToList = (req, res) => {
    let title = checkLib.trim(req.body.title);
    let flag = false;
    addItem = () => {
        return new Promise((resolve, reject) => {
            TodoListModel.findOne({ id: req.params.listId }, { owner: req.params.userId })
                .select('title itemsList').exec((err, listDetails) => {
                    if (err) {
                        logger.error('failed to find a list', 'editListController:addItemToList:addItem()', 1);
                        let apiResponse = responseLib.generateResponse(true, 'failed to find a list', 500, null);
                        reject(apiResponse);
                    }
                    else if (checkLib.isEmpty(listDetails)) {
                        logger.error('not list found', 'editListController:addItemToList:addItem()', 1);
                        let apiResponse = responseLib.generateResponse(true, 'list not found', 202, null);
                        reject(apiResponse);
                    }
                    else {
                        if (!checkLib.isEmpty(listDetails.itemsList)) {
                            flag = listDetails.itemsList.some((obj) => { return obj.title === title });
                        }
                        if (flag) {
                            logger.info('item with this name already present', 'editListController:createNewList:createList()', 1);
                            let apiResponse = responseLib.generateResponse(true, 'item with this name already exists !', 201, null);
                            reject(apiResponse);
                        }
                        else {
                            let newItem = {
                                itemId: shortid.generate(),
                                title: title
                            }
                            listDetails.itemsList.push(newItem);
                            listDetails.save((err, result) => {
                                if (err) {
                                    logger.error('failed to add an item to the list', 'editListController:addItemToList:addItem()', 1);
                                    let apiResponse = responseLib.generateResponse(true, 'adding item to list failed', 500, null);
                                    reject(apiResponse);
                                }
                                else {
                                    let response = {
                                        title: listDetails.title,
                                        item: result.itemsList.pop()
                                    }
                                    resolve(response);
                                }
                            })
                        }
                    }
                })
        })
    }//end of add item

    addItem(req, res)
        .then((response) => {
            let apiResponse = responseLib.generateResponse(false, `added item to list ${response.title} sucessfully`, 200, response);
            res.status(apiResponse.status).send(apiResponse);
        }).catch((err) => {
            res.status(err.status).send(err);
        })
}//end of add item to list

/**
 * @description Will delete list item from DB
 * @author Bhaskar Pawar
 * @param {*} req 
 * @param {*} res
 * @returns {Response} response
 */
let deleteItemfromList = (req, res) => {
    deleteListItemDB = () => {
        return new Promise((resolve, reject) => {
            TodoListModel.findOne({ id: req.params.listId }, { owner: req.params.userId }).select('title itemsList')
                .exec((err, result) => {
                    if (err) {
                        logger.error('failed to find a list', 'editListController:deleteItemfromList:deleteListItemDB()', 1);
                        let apiResponse = responseLib.generateResponse(true, 'failed to find a list', 500, null);
                        reject(apiResponse);
                    }
                    else if (checkLib.isEmpty(result)) {
                        logger.error('not list found', 'editListController:deleteItemfromList:deleteListItemDB()', 1);
                        let apiResponse = responseLib.generateResponse(true, 'list not found', 202, null);
                        reject(apiResponse);
                    }
                    else {
                        let index = result.itemsList.findIndex(item => item.itemId === req.params.itemId);
                        let item = result.itemsList.find(item => item.itemId === req.params.itemId);
                        result.itemsList.splice(index, 1);
                        result.save((err, listItemDetails) => {
                            if (err) {
                                logger.error('failed to delet an item from the list', 'editListController:deleteItemfromList:deleteListItemDB()', 1);
                                let apiResponse = responseLib.generateResponse(true, 'deleting item from the list failed', 500, null);
                                reject(apiResponse);
                            }
                            else {
                                resolve(listItemDetails);
                            }
                        })
                    }
                })
        })
    }//end of delete list item DB

    deleteListItemDB(req, res)
        .then((response) => {
            let apiResponse = responseLib.generateResponse(false, `deleted item from the list ${response.title} sucessfully`, 200, response);
            res.status(apiResponse.status).send(apiResponse);
        }).catch((err) => {
            res.status(err.status).send(err);
        })

}//end delete list item

/**
 * @author Bhaskar Pawar
 * @description will mark item as open db
 * @param {*} req 
 * @param {*} res
 * @returns {Response} response
 */
let markItemIsOpen = (req, res) => {
    markOpen = () => {
        return new Promise((resolve, reject) => {
            TodoListModel.findOne({ id: req.params.listId }, { owner: req.params.userId }).select('id title itemsList')
                .exec((err, result) => {
                    if (err) {
                        logger.error('failed to find a list', 'editListController:markItemIsOpen:markOpen()', 1);
                        let apiResponse = responseLib.generateResponse(true, 'failed to find a list', 500, null);
                        reject(apiResponse);
                    }
                    else {
                        let item = result.itemsList.find(item => item.itemId === req.params.itemId);
                        item.startDate = timeLib.now();
                        item.isOpen = true;
                        item.isDone = false;
                        result.save((err, response) => {
                            if (err) {
                                logger.error('failed to mark item open', 'editListController:markItemIsOpen:markOpen()', 1);
                                let apiResponse = responseLib.generateResponse(true, 'mark item as open operation failed', 500, null);
                                reject(apiResponse);
                            }
                            else {
                                resolve(item);
                            }
                        })
                    }
                })
        })
    }//end of mark open

    markOpen(req, res)
    .then((response) => {
        let apiResponse = responseLib.generateResponse(false, 'item marked open successfully', 200, response);
        res.status(apiResponse.status).send(apiResponse);
    }).catch((err) => {
        res.status(err.status).send(err);
    })
}// end of mark item open

/**
 * @author Bhaskar Pawar
 * @description will mark item as done db
 * @param {*} req 
 * @param {*} res
 * @returns {Response} response
 */
let markItemIsDone = (req, res) => {
    markDone = () => {
        return new Promise((resolve, reject) => {
            TodoListModel.findOne({ id: req.params.listId }, { owner: req.params.userId }).select('id title itemsList')
                .exec((err, result) => {
                    if (err) {
                        logger.error('failed to find a list', 'editListController:markItemIsOpen:markOpen()', 1);
                        let apiResponse = responseLib.generateResponse(true, 'failed to find a list', 500, null);
                        reject(apiResponse);
                    }
                    else {
                        let item = result.itemsList.find(item => item.itemId === req.params.itemId);
                        item.endDate = timeLib.now();
                        item.isDone = true;
                        item.isOpen = false;
                        result.save((err, response) => {
                            if (err) {
                                logger.error('failed to mark item open', 'editListController:markItemIsOpen:markOpen()', 1);
                                let apiResponse = responseLib.generateResponse(true, 'mark item as open operation failed', 500, null);
                                reject(apiResponse);
                            }
                            else {
                                resolve(item);
                            }
                        })
                    }
                })
        })
    }//end of mark done

    markDone(req, res)
    .then((response) => {
        let apiResponse = responseLib.generateResponse(false, 'item marked done successfully', 200, response);
        res.status(apiResponse.status).send(apiResponse);
    }).catch((err) => {
        res.status(err.status).send(err);
    })
}//end of mark item done


module.exports = {
    getSingleList: getSingleList,
    addItemToList: addItemToList,
    deleteItemfromList: deleteItemfromList,
    markItemIsOpen: markItemIsOpen,
    markItemIsDone: markItemIsDone
}