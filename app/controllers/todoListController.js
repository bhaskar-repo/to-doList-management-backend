const mongoose = require('mongoose');
const shortid = require('shortid');
const checkLib = require('../libs/checkLib');
const timeLib = require('../libs/timeLib');
const logger = require('../libs/loggerLib');
const responseLib = require('../libs/responseLib');
const TodoListModel = mongoose.model('TodoList');

/**
 * @description this will send all the list to client
 * @author Bhaskar Pawar
 * @param {*} req 
 * @param {*} res 
 */
let getAllLists = (req, res) => {
    fetchAllLists = () => {
        return new Promise((resolve, reject) => {
            TodoListModel.find({ owner: req.params.userId }).select('-_id')
                .lean().exec((err, listData) => {
                    if (err) {
                        logger.error('error in fetching all the lists', 'todoListController:getAllLists:fetchAllLists()', 1);
                        let apiResponse = responseLib.generateResponse(true, 'could not load the lists(internal server error)', 500, null);
                        reject(apiResponse);
                    }
                    else if (checkLib.isEmpty(listData)) {
                        logger.error('no lists found', 'todoListController:getAllLists:fetchAllLists()', 1);
                        let apiResponse = responseLib.generateResponse(true, 'No lists Available', 201, null);
                        reject(apiResponse);
                    }
                    else {
                        resolve(listData);
                    }
                })
        })
    }// end of fetch all lists

    fetchAllLists(req, res)
        .then((response) => {
            let apiResponse = responseLib.generateResponse(false, 'lists fetched successfully', 200, response);
            res.status(apiResponse.status).send(apiResponse);
        }).catch((err) => {
            res.status(err.status).send(err);
        })

}//end get All Lists

/**
 * @description this will create an empty list
 * @author Bhaskar Pawar
 * @param {*} req 
 * @param {*} res 
 */
let createNewList = (req, res) => {
    let title = checkLib.trim(req.body.title);
    createList = () => {
        return new Promise((resolve, reject) => {
            TodoListModel.findOne({ title: title }, { owner: req.body.owner }, (err, result) => {
                if (!checkLib.isEmpty(result)) {
                    logger.info('list with this name already present', 'todoListController:createNewList:createList()', 1);
                    let apiResponse = responseLib.generateResponse(true, 'list with this name already exists !', 201, null);
                    reject(apiResponse);
                }
                else {
                    let newToDoList = new TodoListModel({
                        id: shortid.generate(),
                        title: title,
                        owner: req.body.owner,
                        createdOn: timeLib.now()
                    })

                    newToDoList.save((err, result) => {
                        if (err) {
                            logger.error('failed to create a list', 'todoListController:createNewList:createList()', 1);
                            let apiResponse = responseLib.generateResponse(true, 'failed to create list', 500, null);
                            reject(apiResponse);
                        }
                        else {
                            resolve(result);
                        }
                    })
                }
            })

        })
    }//end of create list

    createList(req, res)
        .then((response) => {
            let apiResponse = responseLib.generateResponse(false, 'new list created successfully !', 200, response);
            res.status(apiResponse.status).send(apiResponse);
        }).catch((err) => {
            res.status(err.status).send(err);
        })

}// end of create new list
/**
 * @description Will delete list from DB
 * @author Bhaskar Pawar
 * @param {*} req 
 * @param {*} res
 * @returns {Response} response
 */
let deleteList = (req, res) => {
    deleteListDB = () => {
        return new Promise((resolve, reject) => {
            TodoListModel.findOneAndRemove({ id: req.params.listId }, { owner: req.params.userId }, (err, result) => {
                if (err) {
                    logger.error('failed to find a list', 'todoListController:deleteList:deleteListDB()', 1);
                    let apiResponse = responseLib.generateResponse(true, 'failed to find a list', 500, null);
                    reject(apiResponse);
                }
                else if (checkLib.isEmpty(result)) {
                    logger.error('not list found', 'todoListController:deleteList:deleteListDB()', 1);
                    let apiResponse = responseLib.generateResponse(true, 'list not found', 202, null);
                    reject(apiResponse);
                }
                else {
                    resolve(result);
                }
            })
        })
    }//end of delete list DB

    deleteListDB(req, res)
        .then((response) => {
            let apiResponse = responseLib.generateResponse(false, `deleted list ${response.title} sucessfully`, 200, response);
            res.status(apiResponse.status).send(apiResponse);
        }).catch((err) => {
            res.status(err.status).send(err);
        })

}//end delete list 


module.exports = {
    createNewList: createNewList,
    getAllLists: getAllLists,
    deleteList: deleteList
}