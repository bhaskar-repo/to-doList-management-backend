const mongoose = require('mongoose');
const logger = require('../libs/loggerLib');
const responseLib = require('../libs/responseLib');
const checkLib = require('../libs/checkLib');
const timeLib = require('../libs/timeLib');
const UserModel = mongoose.model('User');

/**
 * @author Bhaska pawar
 * @description will add sender and receiver both a friend
 * @param {*} req 
 * @param {*} res 
 */
let acceptFriendRequest = (req, res) => {
    addSenderToFriends = () => {
        return new Promise((resolve, reject) => {
            UserModel.findOne({ userId: req.body.receiverId }).select('friends')
                .exec((err, result) => {
                    if (err) {
                        logger.error('error in finding user', 'requestsController:acceptFriendRequest:addSenderToFriends()', 1);
                        let apiResponse = responseLib.generateResponse(true, 'could not find user', 500, null);
                        reject(apiResponse);
                    }
                    else {
                        let sender = {
                            userId: req.body.senderId,
                            userName: req.body.senderName,
                            countryName: req.body.senderCountry,
                            createdOn: timeLib.now()
                        }
                        result.friends.push(sender);
                        result.save((err, senderDetails) => {
                            if (err) {
                                logger.error('error in saving user', 'requestsController:acceptFriendRequest:addSenderToFriends()', 1);
                                let apiResponse = responseLib.generateResponse(true, 'could not add friend', 500, null);
                                reject(apiResponse);
                            }
                            else {
                                resolve(sender);
                            }
                        })
                    }
                })
        })
    }//end of add sender friend

    addReceiverToFriends = (sender) => {
        return new Promise((resolve, reject) => {
            UserModel.findOne({ userId: req.body.senderId }).select('friends')
                .exec((err, result) => {
                    if (err) {
                        logger.error('error in finding user', 'requestsController:acceptFriendRequest:addSenderToFriends()', 1);
                        let apiResponse = responseLib.generateResponse(true, 'could not find user', 500, null);
                        reject(apiResponse);
                    }
                    else {
                        let receiver = {
                            userId: req.body.receiverId,
                            userName: req.body.receiverName,
                            countryName: req.body.receiverCountry,
                            createdOn: timeLib.now()
                        }
                        result.friends.push(receiver);
                        result.save((err, senderDetails) => {
                            if (err) {
                                logger.error('error in saving user', 'requestsController:acceptFriendRequest:addSenderToFriends()', 1);
                                let apiResponse = responseLib.generateResponse(true, 'could not add friend', 500, null);
                                reject(apiResponse);
                            }
                            else {
                                let response = {
                                    sender: sender,
                                    receiver: receiver
                                }
                                resolve(response);
                            }
                        })
                    }
                })
        })
    }//end of add receiver friend

    cancelRequest = (response) => {
        return new Promise((resolve, reject) => {
            UserModel.findOne({ userId: req.body.receiverId }).select('requests')
                .exec((err, result) => {
                    if (err) {
                        logger.error('error in fetching requests', 'requestsController:cancelUserRequest:cancelRequest()', 1);
                        let apiResponse = responseLib.generateResponse(true, 'could not fetch requests', 500, null);
                        reject(apiResponse);
                    }
                    else {
                        let requestObjIndex = result.requests.findIndex(request => request.userId === req.body.userId);
                        result.requests.splice(requestObjIndex, 1);
                        result.save((err, details) => {
                            if (err) {
                                logger.error('error in deleting requests', 'requestsController:cancelUserRequest:cancelRequest()', 1);
                                let apiResponse = responseLib.generateResponse(true, 'could not delete request', 500, null);
                                reject(apiResponse);
                            }
                            else {
                                resolve(response);
                            }
                        })
                    }
                })
        })
    }//end of cancel request

    addSenderToFriends(req, res)
        .then(addReceiverToFriends)
        .then(cancelRequest)
        .then((response) => {
            let apiResponse = responseLib.generateResponse(false, 'request has been accepted', 200, response);
            res.status(apiResponse.status).send(apiResponse);
        }).catch((err) => {
            res.status(err.status).send(err);
        })
}//end accept freind requests

/**
 * @description will cancel the request sent by user
 * @param {*} req 
 * @param {*} res
 * @returns {any} response
 */
let cancelUserRequest = (req, res) => {
    cancelRequest = () => {
        return new Promise((resolve, reject) => {
            UserModel.findOne({ userId: req.params.userId }).select('requests')
                .exec((err, result) => {
                    if (err) {
                        logger.error('error in fetching requests', 'requestsController:cancelUserRequest:cancelRequest()', 1);
                        let apiResponse = responseLib.generateResponse(true, 'could not fetch requests', 500, null);
                        reject(apiResponse);
                    }
                    else {
                        let requestObjIndex = result.requests.findIndex(request => request.userId === req.body.userId);
                        result.requests.splice(requestObjIndex, 1);
                        result.save((err, details) => {
                            if (err) {
                                logger.error('error in deleting requests', 'requestsController:cancelUserRequest:cancelRequest()', 1);
                                let apiResponse = responseLib.generateResponse(true, 'could not delete request', 500, null);
                                reject(apiResponse);
                            }
                            else {
                                resolve(details);
                            }
                        })
                    }
                })
        })
    }//end of cancel request

    cancelRequest(req, res)
        .then((response) => {
            let apiResponse = responseLib.generateResponse(false, 'request cancelled successfully', 200, response);
            res.status(apiResponse.status).send(apiResponse);
        }).catch((err) => {
            res.status(err.status).send(err);
        })
}//end of cancel User request

module.exports = {
    cancelUserRequest: cancelUserRequest,
    acceptFriendRequest: acceptFriendRequest
}