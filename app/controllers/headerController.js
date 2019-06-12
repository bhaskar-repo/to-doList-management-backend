const mongoose = require('mongoose');
const logger = require('../libs/loggerLib');
const responseLib = require('../libs/responseLib');
const checkLib = require('../libs/checkLib');
const timeLib = require('../libs/timeLib');
const UserModel = mongoose.model('User');

/**
 * @author Bhaskar Pawar
 * @description will return user requests
 * @param {*} req 
 * @param {*} res
 * @returns {any} response 
 */
let getUserRequests = (req, res) => {
    getRequests = () => {
        return new Promise((resolve, reject) => {
            UserModel.findOne({ userId: req.params.userId }).select('requests')
                .exec((err, details) => {
                    if (err) {
                        logger.error('error in fetching requests', 'headerController:getUserRequestsCount:getRequests()', 1);
                        let apiResponse = responseLib.generateResponse(true, 'could not fetch requests', 500, null);
                        reject(apiResponse);
                    }
                    else if (checkLib.isEmpty(details)) {
                        logger.info('no requests found', 'headerController:getUserRequestsCount:getRequests()', 1);
                        let apiResponse = responseLib.generateResponse(true, 'no requests found', 201, null);
                        reject(apiResponse);
                    }
                    else {
                        resolve(details.requests);
                    }
                })
        })
    }//end of get request

    getRequests(req, res)
        .then((response) => {
            let apiResponse = responseLib.generateResponse(false, 'requests fetched', 200, response);
            res.status(apiResponse.status).send(apiResponse);
        }).catch((err) => {
            res.status(err.status).send(err);
        })
}//get user requests


/**
 * @author Bhaskar Pawar
 * @description will return user friends
 * @param {*} req 
 * @param {*} res
 * @returns {any} response 
 */
let getUserFriends = (req, res) => {
    getFriends = () => {
        return new Promise((resolve, reject) => {
            UserModel.findOne({ userId: req.params.userId }).select('friends')
                .exec((err, details) => {
                    if (err) {
                        logger.error('error fetching friends', 'headerController:getUserFriends:getFriends()', 1);
                        let apiResponse = responseLib.generateResponse(true, 'could not fetch friends', 500, null);
                        reject(apiResponse);
                    }
                    else if (checkLib.isEmpty(details)) {
                        logger.info('no friends found', 'headerController:getUserFriends:getFriends()', 1);
                        let apiResponse = responseLib.generateResponse(true, 'no friends found', 201, null);
                        reject(apiResponse);
                    }
                    else {
                        resolve(details.friends);
                    }
                })
        })
    }//end of get friends

    getFriends(req, res)
        .then((response) => {
            let apiResponse = responseLib.generateResponse(false, 'friends fetched', 200, response);
            res.status(apiResponse.status).send(apiResponse);
        }).catch((err) => {
            res.status(err.status).send(err);
        })
}//get user friends end

/**
 * @description ge All the users which are not friends and in requests
 * @author  Bhaskar Pawar
 * @param {*} req 
 * @param {*} res 
 * @returns {any} Response
 */
let getUsersWithoutFriends = (req, res) => {
    getUsers = () => {
        return new Promise((resolve, reject) => {
            UserModel.find({}).select('userId fullName countryName mobileNumber email requests friends').where('userId').nin(req.params.userId)
                .exec((err, result) => {
                    if (err) {
                        logger.error('error in fetching users', 'headerController:getAllUsers:getUsers()', 1);
                        let apiResponse = responseLib.generateResponse(true, 'users could not found', 500, null);
                        reject(apiResponse);
                    }
                    else if (checkLib.isEmpty(result)) {
                        logger.info('users not found', 'headerController:getAllUsers:getUsers()', 1);
                        let apiResponse = responseLib.generateResponse(true, 'users not found', 201, null);
                        reject(apiResponse);
                    }
                    else {
                        resolve(result);
                    }
                })
        })
    }//end of get users

    getUsers(req, res)
        .then((response) => {
            let apiResponse = responseLib.generateResponse(false, 'users fetched', 200, response);
            res.status(apiResponse.status).send(apiResponse);
        }).catch((err) => {
            res.status(err.status).send(err);
        })
}// get users wihtout friends

/**
 * @description will fetch the single user
 * @param {*} req 
 * @param {*} res 
 */
let getSingUser = (req, res) => {
    getUser = () => {
        return new Promise((resolve, reject) => {
            UserModel.findOne({ userId: req.params.userId }).select('userId fullName countryName mobileNumber email countryPhoneCode')
                .exec((err, result) => {
                    if (err) {
                        logger.error('error in a finding user', 'headerController:getAllUsers:getUser()', 1);
                        let apiResponse = responseLib.generateResponse(true, 'could not found a user', 500, null);
                        reject(apiResponse);
                    }
                    else {
                        resolve(result);
                    }
                })
        })
    }// end of get user

    getUser(req, res)
        .then((response) => {
            let apiResponse = responseLib.generateResponse(false, 'user fetched', 200, response);
            res.status(apiResponse.status).send(apiResponse);
        }).catch((err) => {
            res.status(err.status).send(err);
        })
}//end of get single user

/**
 * @description saves the user to the requests table
 * @author Bhaskar Pawar
 * @param {*} req 
 * @param {*} res 
 */
let updateSentRequest = (req, res) => {
    updateRequest = () => {
        return new Promise((resolve, reject) => {
            UserModel.findOne({ userId: req.params.userId }).select('userId requests')
                .exec((err, result) => {
                    if (err) {
                        logger.error('error in a finding user', 'headerController:getAllUsers:getUser()', 1);
                        let apiResponse = responseLib.generateResponse(true, 'could not found a user', 500, null);
                        reject(apiResponse);
                    }
                    else {
                        let user = {
                            userId: req.body.userId,
                            userName: req.body.userName,
                            countryName: req.body.countryName,
                            createdOn: timeLib.now()
                        }
                        result.requests.push(user);
                        result.save((err, details) => {
                            if (err) {
                                logger.error('error in saving user request', 'headerController:getAllUsers:getUser()', 1);
                                let apiResponse = responseLib.generateResponse(true, 'saving user request failed', 500, null);
                                reject(apiResponse);
                            }
                            else {
                                resolve(user);
                            }
                        })
                    }
                })
        })
    }//end of update request

    updateRequest(req, res)
        .then((response) => {
            let apiResponse = responseLib.generateResponse(false, 'request has been sent successfully', 200, response);
            res.status(apiResponse.status).send(apiResponse);
        }).catch((err) => {
            res.status(500).send(err);
        })
}//end of update sent request

module.exports = {
    getUsersWithoutFriends: getUsersWithoutFriends,
    getSingUser: getSingUser,
    updateSentRequest: updateSentRequest,
    getUserRequests: getUserRequests,
    getUserFriends: getUserFriends
}