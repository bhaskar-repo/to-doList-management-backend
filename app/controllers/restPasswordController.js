const mongoose = require('mongoose');
const logger = require('../libs/loggerLib');
const responseLib = require('../libs/responseLib');
const passwordLib = require('../libs/generatePasswordLib');
let UserModel = mongoose.model('User');

/**
 * @author Bhaskar Pawar
 * @description resets the requested password
 * @param {*} req 
 * @param {*} res 
 */
let resetPassword = (req, res) => {

    UserModel.findOne({ email: req.body.email }, 'userId email password', (err, details) => {
        if (err) {
            logger.error('error in resetting password', 'UserController:resetPassword()', 1);
            let apiResponse = responseLib.generateResponse(true, 'password reset failed', 500, null);
            res.send(apiResponse);
        }
        else {
            passwordLib.comparePassword(req.body.password, details.password, (err, isMatch) => {
                if (err) {
                    logger.error('Error in validating paaword', 'UserController:login:resetPassword()', 1);
                    let apiResponse = responseLib.generateResponse(true, 'Could not validate your password', 500, null);
                    res.send(apiResponse);
                }
                else if (isMatch) {
                    logger.info('Old and New Password can not be same', 'UserController:resetPassword()', 1);
                    let apiResponse = responseLib.generateResponse(true, 'password is equal to old password', 201, null);
                    res.send(apiResponse);
                }
                else {
                    details.password = passwordLib.hashpassword(req.body.password);
                    details.save((err, userDetails) => {
                        if (err) {
                            logger.error('error in saving  password', 'UserController:resetPassword()', 1);
                            let apiResponse = responseLib.generateResponse(true, 'password reset failed', 500, null);
                            res.send(apiResponse);
                        }
                        else {
                            let response = {
                                userId: userDetails.userId,
                                email: userDetails.email
                            }
                            logger.info('password reset successfully', 'UserController:resetPassword()', 1);
                            let apiResponse = responseLib.generateResponse(false, 'password reset successful !', 200, response);
                            res.send(apiResponse);
                        }
                    })
                }
            })
        }
    })
}//end reset password

module.exports = {
    resetPassword: resetPassword
}