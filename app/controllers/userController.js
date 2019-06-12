/** required modules for user controller */
const mongoose = require('mongoose');
const shortid = require('shortid');
const logger = require('../libs/loggerLib');
const checkLib = require('../libs/checkLib');
const tokenLib = require('../libs/tokenLib');
const responseLib = require('../libs/responseLib');
const passwordLib = require('../libs/generatePasswordLib');
const validateInput = require('../libs/paramsValidationLib');
const time = require('../libs/timeLib');
const nodeMailer = require('nodemailer');
let UserModel = mongoose.model('User');
let AuthModel = mongoose.model('Auth');
let GlobalConfigModel = mongoose.model('GlobalConfig');


/**
 * @description new user will be added to the system
 * @author Bhaskar Pawar
 * @param {*} req 
 * @param {*} res 
 */
let signUp = (req, res) => {
    let validateUserInput = () => {
        return new Promise((resolve, reject) => {
            if (req.body.email) {
                if (validateInput.validateEmail(req.body.email)) {
                    let apiResponse = responseLib.generateResponse(true, 'Invalid email', 500, null);
                    reject(apiResponse);
                } else if (checkLib.isEmpty(req.body.password)) {
                    let apiResponse = responseLib.generateResponse(true, 'password parameter is missing', 202, null)
                    reject(apiResponse);
                } else {
                    if (validateInput.validatePassword(req.body.password)) {
                        let apiResponse = responseLib.generateResponse(true, 'Password:Minimum 8 characters which contain only characters,numeric digits, underscore and first character must be a letter', 201, null)
                        reject(apiResponse);
                    }
                    else {
                        resolve(req);
                    }
                }
            } else {
                logger.error('Field Missing During User Creation', 'userController: createUser()', 5)
                let apiResponse = responseLib.generateResponse(true, 'One or More Parameter(s) is missing', 202, null)
                reject(apiResponse)
            }
        })
    }// end validate user input

    let createUser = (req) => {
        return new Promise((resolve, reject) => {
            UserModel.findOne({ email: req.body.email }).
                lean()
                .exec((err, retrievedUserDetails) => {
                    if (err) {
                        logger.error(err.message, 'userController: createUser', 10)
                        let apiResponse = responseLib.generateResponse(true, 'Failed To Create User', 500, null)
                        reject(apiResponse);
                    } else if (checkLib.isEmpty(retrievedUserDetails)) {
                        let newUser = new UserModel({
                            userId: shortid.generate(),
                            firstName: req.body.firstName,
                            lastName: req.body.lastName || '',
                            fullName: req.body.firstName + " " + req.body.lastName, 
                            mobileNumber: req.body.mobileNumber,
                            countryName: req.body.countryName,
                            countryCode: req.body.countryCode,
                            countryPhoneCode: req.body.countryPhoneCode,
                            email: req.body.email,
                            password: passwordLib.hashpassword(req.body.password),
                            createdOn: time.now()
                        })
                        newUser.save((err, newUser) => {
                            if (err) {
                                logger.error(err.message, 'userController: createUser', 10)
                                let apiResponse = responseLib.generateResponse(true, 'Failed to create new User', 500, null)
                                reject(apiResponse)
                            } else {
                                let newUserObj = newUser.toObject();
                                resolve(newUserObj)
                            }
                        })
                    } else {
                        logger.error('User Cannot Be Created.User Already Present', 'userController: createUser', 4)
                        let apiResponse = responseLib.generateResponse(true, 'User Already Present With this Email', 202, null)
                        reject(apiResponse)
                    }
                })
        })
    }// end create user function


    validateUserInput(req, res)
        .then(createUser)
        .then((resolve) => {
            delete resolve.password;
            delete resolve._id;
            delete resolve.__v;
            let apiResponse = responseLib.generateResponse(false, 'Signed up successfully !', 200, resolve);
            res.status(apiResponse.status).send(apiResponse);
        })
        .catch((err) => {
            res.status(err.status).send(err);
        })
}// end of sign up function

/**
 * @description logs in user to the application
 * @author Bhaskar Pawar
 * @param {Request} req 
 * @param {Response} res 
 */
let login = (req, res) => {

    let findUser = () => {
        return new Promise((resolve, reject) => {
            if (req.body.email) {
                logger.info('email is not empty', 'userController:login:findUser()', 10);
                UserModel.findOne({ email: req.body.email })
                    .lean().exec((err, userDetails) => {
                        if (err) {
                            logger.error('Error in fetching user information', 'UserController:login:findUser()', 1);
                            let apiResponse = responseLib.generateResponse(true, 'Internal server error occured while fetching user information', 500, null);
                            reject(apiResponse);
                        }
                        else if (checkLib.isEmpty(userDetails)) {
                            logger.info('Requested user is not found', 'UserController:login:findUser()', 2);
                            let apiResponse = responseLib.generateResponse(true, 'User with this email not found Kindly sign up to continue ', 201, null);
                            reject(apiResponse);
                        }
                        else {
                            logger.info('User Found', 'UserController:login:findUser()', 1);
                            resolve(userDetails);
                        }
                    })
            }
        })
    }//end of find User

    let validatePassword = (userDetails) => {
        return new Promise((resolve, reject) => {
            passwordLib.comparePassword(req.body.password, userDetails.password, (err, isMatch) => {
                if (err) {
                    logger.error('Error in validating password', 'UserController:login:validatePassword()', 1);
                    let apiResponse = responseLib.generateResponse(true, 'Could not validate your password', 500, null);
                    reject(apiResponse);
                }
                else if (isMatch) {
                    logger.info('Password matched', 'UserController:login:validatePassword()', 1);
                    let retrievedUserInfo = responseLib.returnFilteredObj(userDetails);
                    resolve(retrievedUserInfo);
                }
                else {
                    logger.info('password is not matched', 'UserController:login:validatePassword()', 1);
                    let apiResponse = responseLib.generateResponse(true, 'Incorrect password entered', 202, null);
                    reject(apiResponse);
                }
            })
        })
    }// end of validate password

    getSecretKeyFromDB = (apiResponse) => {
        return new Promise((resolve, reject) => {
            GlobalConfigModel.find({}, 'secretKey').select('-_id')
                .lean()
                .exec((err, secretKeyDB) => {
                    if (err) {
                        logger.error('error fetching secretKey', ' tokenLib:generateToken()', 1);
                        let apiResponse = responseLib.generateResponse(true, 'Error in fetching secretkey', 500, null);
                        reject(apiResponse);
                    }
                    else if (checkLib.isEmpty(secretKeyDB)) {
                        logger.error('error fetching secretKey', ' tokenLib:generateToken()', 1);
                        let apiResponse = responseLib.generateResponse(true, 'Error in fetching secretkey', 500, null);
                        reject(apiResponse);
                    }
                    else {
                        apiResponse.secretKey = secretKeyDB[0].secretKey;
                        resolve(apiResponse);
                    }
                })
        })
    }//  end of get secretKeyFromDB

    let generateToken = (retrievedUserInfo) => {
        return new Promise((resolve, reject) => {
            tokenLib.generateToken(retrievedUserInfo, (err, tokenDetails) => {
                if (err) {
                    logger.error('failed to generate token', 'UserController:login:generateToken()', 1);
                    let apiResponse = responseLib.generateResponse(true, 'Internal Error:Token generation failed', 500, null);
                    reject(apiResponse);
                }
                else {
                    delete retrievedUserInfo.secretKey;
                    tokenDetails.userDetails = retrievedUserInfo;
                    resolve(tokenDetails);
                }
            })
        })
    }//end of generate Token

    let saveToken = (tokenDetails) => {
        return new Promise((resolve, reject) => {
            AuthModel.findOne({ userId: tokenDetails.userDetails.userId }, (err, retrievedTokenDetails) => {
                if (err) {
                    logger.error('unable to save token', 'userController:login:saveToken()', 1);
                    let apiResponse = responseLib.generateResponse(true, 'token saving failed', 500, null);
                    reject(apiResponse);
                }
                else if (checkLib.isEmpty(retrievedTokenDetails)) {
                    let newAuthToken = new AuthModel({
                        userId: tokenDetails.userDetails.userId,
                        authToken: tokenDetails.token,
                        tokenSecret: tokenDetails.tokenSecret,
                        tokenGenerationTime: time.now()
                    })
                    newAuthToken.save((err, result) => {
                        if (err) {
                            logger.error('error saving new token', 'userController:login:saveToken()', 1);
                            let apiResponse = responseLib.generateResponse(true, 'new token saving failed', 500, null);
                            reject(apiResponse);
                        }
                        else {
                            let response = {
                                authToken: result.authToken,
                                userDetails: tokenDetails.userDetails
                            }
                            resolve(response);
                        }
                    })
                }
                else {
                        retrievedTokenDetails.authToken = tokenDetails.token,
                        retrievedTokenDetails.tokenSecret = tokenDetails.tokenSecret,
                        retrievedTokenDetails.tokenGenerationTime = tokenDetails.tokenGenerationTime
                        retrievedTokenDetails.save((err, authDetails) => {
                        if (err) {
                            logger.error('error updating existing token', 'userController:login:saveToken()', 1);
                            let apiResponse = responseLib.generateResponse(true, 'token updation failed', 500, null);
                            reject(apiResponse);
                        }
                        else {
                            let response = {
                                authToken: authDetails.authToken,
                                userDetails: tokenDetails.userDetails
                            }
                            resolve(response);
                        }
                    })
                }
            })
        })
    }//end of save token

    findUser(req, res)
        .then(validatePassword)
        .then(getSecretKeyFromDB)
        .then(generateToken)
        .then(saveToken)
        .then((response) => {
            let apiResponse = responseLib.generateResponse(false, 'login successful', 200, response);
            res.status(200);
            res.status(apiResponse.status).send(apiResponse);
            logger.info('login successful', 'userController:login()', 1);
        }).catch((err) => {
            res.status(err.status).send(err);
            logger.error('login failed', 'userController:login()', 1);
        })

}// end of login

/**
 * @description check whether user is present or not
 * @author Bhaskar Pawar
 * @param {*} req 
 * @param {*} res 
 */
let checkUserExistence = (req, res) => {
    UserModel.findOne({ email: req.query.email }, (err, details) => {
        if (err) {
            logger.error('Error in fetching user information', 'UserController:login:findUser()', 1);
            let apiResponse = responseLib.generateResponse(true, 'Internal server error occured while fetching user information', 500, null);
            res.status(apiResponse.status).send(apiResponse);
        }
        else if (checkLib.isEmpty(details)) {
            logger.info('Requested user is not found', 'UserController:login:findUser()', 2);
            let apiResponse = responseLib.generateResponse(true, 'User with this email not found Kindly sign up to continue ', 201, null);
            res.status(apiResponse.status).send(apiResponse);
        }
        else {
            logger.info('User Found', 'UserController:login:findUser()', 1);
            let apiResponse = responseLib.generateResponse(false, 'User found', 200, details);
            res.status(apiResponse.status).send(apiResponse);
        }
    })
}// end of check user existence

/**
 * @description This is to send email to the user for resetting password
 * @author Bhaskar Pawar
 * @param {*} req 
 * @param {*} res 
 */
let sendEmail = (req, res) => {
    sendNewEmail = () => {
        return new Promise((resolve, reject) => {
            console.log(process.env.EMAIL)
            console.log(process.env);
            var transporter = nodeMailer.createTransport({
                service: 'gmail',
                auth: {
                       user: `${process.env.EMAIL}`,
                       pass: `${process.env.PASSWORD}`
                   }
               });
            const mailOptions = {
                from: `${process.env.EMAIL}`, // sender address
                to: req.body.email, // list of receivers
                subject: 'Reset Password', // Subject line
                html: `<p><a href=${req.body.clientUrl}/reset?email=${req.body.email}>Click here</a> to reset password</p>`// plain text body
              };
            
            transporter.sendMail(mailOptions, function (err, info) {
                if(err) {
                    console.log(err);
                  logger.error('error in sending email', 'UserController:sendEmail()', 1);
                  let apiResponse = responseLib.generateResponse(true, 'Internal Server Error', 500, null);
                  reject(apiResponse);
                }
                else{
                    logger.info('sent email', 'UserController:sendEmail()', 1);
                    resolve(info);
                }
             });
        })
    }//end of send new email

    sendNewEmail(req, res)
    .then((resolve) => {
        let apiResponse = responseLib.generateResponse(false, 'reset password link sent successfully ! check your inbox', 200, resolve);
        res.status(apiResponse.status).send(apiResponse);
    }).catch((err) => {
        res.status(err.status).send(err);
    })
}//end send email


/**
 * @author Bhaskar Pawar
 * @description function to logout user.
 * @param {String} userId
 */
let logout = (req, res) => {
    AuthModel.findOneAndRemove({ userId: req.body.userId }).
        lean().exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'user Controller: logout', 10)
                let apiResponse = responseLib.generateResponse(true, `error occurred: ${err.message}`, 202, null)
                res.send(apiResponse)
            } else if (checkLib.isEmpty(result)) {
                let apiResponse = responseLib.generateResponse(true, 'Already Logged Out or Invalid UserId', 202, null)
                res.send(apiResponse)
            } else {
                let apiResponse = responseLib.generateResponse(false, 'Logged Out Successfully', 200, null)
                res.send(apiResponse)
            }
        })
} // end of the logout function.

module.exports = {
    login: login,
    signUp: signUp,
    checkUserExistence: checkUserExistence,
    sendEmail: sendEmail,
    logout: logout
}
