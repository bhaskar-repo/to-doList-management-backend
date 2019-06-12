
const appConfig = require('../../config/appConfig');
const userController = require('../controllers/userController');
const resetPassController = require('../controllers/restPasswordController');
const headerController = require('../controllers/headerController');
const requestsController = require('../controllers/requestsController');
const activityController = require('../controllers/activityController');
const authMiddleware = require('../middlewares/auth');
/**
 * This method is used to define routes for this module
 * @author Bhaskar Pawar
 * @param {*} app 
 */
const setRouter = (app) => {
    let baseUrl = `${appConfig.apiVersion}/users`;

    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/signup api for user signup.
     *
     * @apiParam {string} firstName of the user. (body params) (required)
     * @apiParam {string} lastName of the user. (body params) (required)
     * @apiParam {string} mobileNumber of the user. (body params) (required)
     * @apiParam {string} email email of the user. (body params) (required)
     * @apiParam {string} password password of the user. (body params) (required)
     * @apiParam {string} countryName countryName of the user (body Param) (required)
     * @apiParam {string} countryCode countryCode of the user (body param) (required)
     * @apiParam {string} countryPhoneCode of the user (body param) (required)
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "Signed up successfully !",
            "status": 200,
            "data": {
                "userId": "cQgKrzx8U",
                "firstName": "bhaskar",
                "lastName": "pawar",
                "countryName": "Bangladesh",
                "countryCode": "BD",
                "countryPhoneCode": "880",
                "email": "bhaskar@example.com",
                "createdOn": "2019-05-29T17:16:41.000Z"
            }
        }
    */
    app.post(`${baseUrl}/signup`, userController.signUp);

    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/login api for user login.
     * @apiParam {string} email email of the user. (body params) (required)
     * @apiParam {string} password password of the user. (body params) (required)
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * @apiSuccessExample {object} Success-Response:
     * {
            "error": false,
            "message": "login successful",
            "status": 200,
            "data": {
                "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6ImRsTTBhV3BaSyIsImlhdCI6MTU1OTE3MjUyNjU5MCwiZXhwIjoxNTU5MjU4OTI2LCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJpc3N1ZVRyYWNraW5nVG9vbCIsImRhdGEiOnsidXNlcklkIjoiY1FnS3J6eDhVIiwiZmlyc3ROYW1lIjoiYmhhc2thciIsImxhc3ROYW1lIjoicGF3YXIiLCJjb3VudHJ5TmFtZSI6IkJhbmdsYWRlc2giLCJjb3VudHJ5Q29kZSI6IkJEIiwiY291bnRyeVBob25lQ29kZSI6Ijg4MCIsImVtYWlsIjoiYmhhc2thckBleGFtcGxlLmNvbSIsInNlY3JldEtleSI6IlRoaXNpc215YXBwbGljYXRpb25zZWNyZXRrZXlzdG9yZWRpbkRCc290aGF0bm9ib2R5Q2FuR3Vlc3MifX0.mTHPf_-zohaLEY0Hcuc9vwZqFLuvDEifANEnsKNUPQo",
                "userDetails": {
                    "userId": "cQgKrzx8U",
                    "firstName": "bhaskar",
                    "lastName": "pawar",
                    "countryName": "Bangladesh",
                    "countryCode": "BD",
                    "countryPhoneCode": "880",
                    "email": "bhaskar@example.com"
                }
            }
        }
    */
    app.post(`${baseUrl}/login`, userController.login);
    app.get(`${baseUrl}/reset`, userController.checkUserExistence);

    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/sendemail api for user to send email for reset password.
     * @apiParam {string} email email of the user. (body params) (required)
     * @apiParam {string} ClientUrl . (body params) (required)
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * @apiSuccessExample {object} Success-Response:
     * {
            "error": false,
            "message": "reset password link sent successfully ! check your inbox",
            "status": 200,
            "data": {
                "accepted": [
                    "bhaskar26.pawar@gmail.com"
                ],
                "rejected": [],
                "envelopeTime": 1039,
                "messageTime": 1017,
                "messageSize": 389,
                "response": "250 2.0.0 OK  1559344676 x18sm8075150pfo.8 - gsmtp",
                "envelope": {
                    "from": "bhaskar90.pawar@gmail.com",
                    "to": [
                        "bhaskar26.pawar@gmail.com"
                    ]
                },
                "messageId": "<0114b13d-0f87-af2c-cc5c-32aabe6bf476@gmail.com>"
            }
        }
    */
    app.post(`${baseUrl}/sendemail`, userController.sendEmail);

     /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/reset api for user to send email for reset password.
     * @apiParam {string} email email of the user. (body params) (required)
     * @apiParam {string} password new password of the user. (body params) (required)
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * @apiSuccessExample {object} Success-Response:
     *  {
            "error": false,
            "message": "password reset successful !",
            "status": 200,
            "data": {
                "userId": "JKSgbe9-f",
                "email": "bhaskar26.pawar@gmail.com"
            }
        }
    */
    app.post(`${baseUrl}/logout`, userController.logout);
    app.post(`${baseUrl}/reset`, resetPassController.resetPassword);
    app.get(`${baseUrl}/:userId/notfriends`, authMiddleware.isAuthorized, headerController.getUsersWithoutFriends);
    app.get(`${baseUrl}/:userId/profile`, authMiddleware.isAuthorized, headerController.getSingUser);
    app.post(`${baseUrl}/:userId/sendrequest`, authMiddleware.isAuthorized, headerController.updateSentRequest);
    app.get(`${baseUrl}/:userId/requests`, authMiddleware.isAuthorized, headerController.getUserRequests);
    app.get(`${baseUrl}/:userId/friends`, authMiddleware.isAuthorized, headerController.getUserFriends);
    app.post(`${baseUrl}/:userId/requests/delete`, authMiddleware.isAuthorized, requestsController.cancelUserRequest);
    app.post(`${baseUrl}/requests/accept`, authMiddleware.isAuthorized, requestsController.acceptFriendRequest);
    app.get(`${baseUrl}/:userId/activities`, authMiddleware.isAuthorized, activityController.getActivities);
    app.post(`${baseUrl}/:userId/activities/:activityId/delete`, authMiddleware.isAuthorized, activityController.deleteActivity);
    
}

module.exports = {
    setRouter: setRouter
}