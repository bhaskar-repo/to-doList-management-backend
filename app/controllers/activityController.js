const mongoose = require('mongoose');
const timeLib = require("../libs/timeLib");
const responseLib = require('../libs/responseLib');
const checkLib = require('../libs/checkLib');
const logger = require('../libs/loggerLib');
const shortid = require('shortid');
const ActivityModel = mongoose.model('Activity');
const TodoListModel = mongoose.model('TodoList');
//every action will be captured in DB

/**
 * @author Bhaskar Pawar
 * @description this will fetch activities done by user
 * @param {*} req 
 * @param {*} res 
 */
let getActivities = (req, res) => {
    ActivityModel.find({ userId: req.params.userId }).
        exec((err, result) => {
            if (err) {
                logger.error('unable to find the activities', 'activityController:getActivities()', 1);
                let apiResponse = responseLib.generateResponse(true, 'error in finding a activities', 500, null);
                res.status(apiResponse.status).send(apiResponse);
            }
            else if (checkLib.isEmpty(result)) {
                logger.info('no activities found', 'activityController:getActivities()', 1);
                let apiResponse = responseLib.generateResponse(true, 'no activities found', 201, null);
                res.status(apiResponse.status).send(apiResponse);
            }
            else {
                let apiResponse = responseLib.generateResponse(false, 'activities fetched', 200, result);
                res.status(apiResponse.status).send(apiResponse);
            }
        })
}//end of get activities

/**
 * @description this will keep record of actions done in past
 * @param {any} activityData 
 */
let addToActivity = (activityData) => {

    let newActivity = new ActivityModel({
        activityId: shortid.generate(),
        userId: activityData.userId,
        userName: activityData.userName,
        message: activityData.message,
        activityType: activityData.activityType,
        undoActivity: activityData.undoActivity,
        listData: activityData.listData,
        itemData: activityData.itemData,
        subItemData: activityData.subItemData,
        updatedOn: timeLib.now()
    })

    newActivity.save((err, result) => {
        if (err) {
            logger.error('could not save the action to db', 'todoListSocketLib:add-to-activity event', 1);
        }
        else {
            logger.info('saved activity to DB', 'todoListSocketLib:add-to-activity event', 1);
        }
    })
}

/**
 * @author Bhaskar Pawar
 * @description will mark item as open db
 * @param {*} req 
 * @param {*} res
 * @returns {Response} response
 */
let markItemIsClose = (req, res) => {
    markClose = () => {
        return new Promise((resolve, reject) => {
            TodoListModel.findOne({ id: req.params.listId }, { owner: req.params.userId }).select('id title itemsList')
                .exec((err, result) => {
                    if (err) {
                        logger.error('failed to find a list', 'activityController:markItemIsClose:markClose()', 1);
                        let apiResponse = responseLib.generateResponse(true, 'failed to find a list', 500, null);
                        reject(apiResponse);
                    }
                    else {
                        let item = result.itemsList.find(item => item.itemId === req.params.itemId);
                        item.startDate = null;
                        item.endDate = null;
                        item.isOpen = false;
                        item.isDone = false;
                        result.save((err, response) => {
                            if (err) {
                                logger.error('failed to mark item close', 'activityController:markItemIsClose:markClose()', 1);
                                let apiResponse = responseLib.generateResponse(true, 'mark item as close operation failed', 500, null);
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

    markClose(req, res)
        .then((response) => {
            let apiResponse = responseLib.generateResponse(false, 'item marked closed successfully', 200, response);
            res.status(apiResponse.status).send(apiResponse);
        }).catch((err) => {
            res.status(err.status).send(err);
        })
}// end of mark item open

/**
 * @author Bhaskar Pawar
 * @description will mark sub item done in DB
 * @param {*} req 
 * @param {*} res 
 */
let markSubItemclose = (req, res) => {
    markClose = () => {
        return new Promise((resolve, reject) => {
            TodoListModel.findOne({ id: req.params.listId }, { owner: req.params.userId })
                .select('id title itemsList').exec((err, listDetail) => {
                    if (err) {
                        logger.error('error in finding a list', 'activityController:markSubItemClose:markClose()', 1);
                        let apiResponse = responseLib.generateResponse(true, 'list not found', 500, null);
                        reject(apiResponse);
                    }
                    else {
                        let item = listDetail.itemsList.find(item => item.itemId === req.params.itemId);
                        let subItem = item.subitemsList.find(subItem => subItem.subItemId === req.params.subItemId)
                        subItem.isDone = false
                        listDetail.save((err, updatedList) => {
                            if (err) {
                                logger.error('error in marking close sub item in a list', 'activityController:markSubItemClose:markClose()', 1);
                                let apiResponse = responseLib.generateResponse(true, 'marking close operation failed', 202, null);
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

    markClose(req, res)
        .then((response) => {
            let apiResponse = responseLib.generateResponse(false, 'Mark sub item done successsful', 200, response);
            res.status(apiResponse.status).send(apiResponse);
        }).catch((err) => {
            res.status(err.status).send(err);
        })
}//end of mark done sub item

/**
 * @description this is to delete the activity
 * @author Bhaskar Pawar
 * @param {*} req 
 * @param {*} res 
 */
let deleteActivity = (req, res) => {
    deleteThis = () => {
        return new Promise((resolve, reject) => {
            ActivityModel.findOneAndDelete({ userId: req.params.userId }, { activityId: req.params.activityId }, (err, result) => {
                if (err) {
                    logger.error('error in removing activity', 'activityController:deleteActivity:deleteThis()', 1);
                    let apiResponse = responseLib.generateResponse(true, 'could not remove the activity', 500, null);
                    reject(apiResponse);
                }
                else {
                    resolve(result);
                }
            })
        })
    }//end of delete this

    deleteThis(req, res)
    .then((response) => {
        let apiResponse = responseLib.generateResponse(false , 'deleted activity successfully', 200, response);
        res.status(apiResponse.status).send(apiResponse);
    }).catch((err) => {
        res.status(err.status).send(err);
    })
}//end of deleteActivity

module.exports = {
    addToActivity: addToActivity,
    deleteActivity: deleteActivity,
    getActivities: getActivities,
    markItemIsClose: markItemIsClose,
    markSubItemclose: markSubItemclose
}