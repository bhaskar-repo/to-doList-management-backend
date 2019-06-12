const socketio = require('socket.io');
const logger = require('../libs/loggerLib');
const tokenLib = require("../libs/tokenLib.js");
const checkLib = require("../libs/checkLib.js");
const mongoose = require('mongoose');
const AuthModel = mongoose.model('Auth');
const events = require('events');
const eventEmitter = new events.EventEmitter();
const activityController = require('../controllers/activityController');

/**
 * @description all the real time communication handled by this method
 * @author Bhaskar Pawar
 * @param {*} server 
 */
let setServer = (server) => {
    let count = 0;
    let io = socketio.listen(server);
    let myIo = io.of('/');
    myIo.on('connection', (socket) => {
        socket.emit('verify-user', "");
        socket.on('set-user', (userDetails) => {
            AuthModel.findOne({ authToken: userDetails.authToken }, (err, authDetails) => {
                if (err) {
                    logger.error(err.message, 'Socket Connection', 1);
                } else if (checkLib.isEmpty(authDetails)) {
                    logger.error('No AuthorizationKey Is Present', 'Socket Connection', 1);
                } else {
                    tokenLib.verifyToken(authDetails.authToken, authDetails.tokenSecret, (err, decoded) => {
                        if (err) {
                            logger.error(err.message, 'Socket Connection', 1);
                        }
                        else {
                            let currentUser = decoded.data;
                            socket.userId = currentUser.userId;
                        }
                    });// end verify token

                }
            })
        })

        socket.on('join-socket', (room) => {
            socket.join(room);
        })

        socket.on('join-friends-room', (userFriends) => {
            userFriends.forEach(user => {
                console.log(user.userId);
                socket.join(`${user.userId}`);
            })
        })

        //to do list sockets
        socket.on('create-new-list', (createData) => {
            if (!createData.isUndo) {
                let activityData = {
                    userId: createData.userId,
                    userName: createData.userName,
                    message: `has created new list <b>${createData.data.title}</b>`,
                    activityType: 'createlist',
                    undoActivity: 'deletelist',
                    listData: createData.data,
                    itemData: null,
                    subItemData: null
                }
                eventEmitter.emit('add-to-activity', activityData);
                socket.emit('count-activities', count);
                socket.to(`${createData.userId}`).emit('notify-list-operation', createData);
            }
            socket.emit('update-list', createData.data);
            socket.broadcast.emit('update-list', createData.data);
        })//end of create new list listen event

        socket.on('delete-list', (deleteData) => {
            if (!deleteData.isUndo) {
                let activityData = {
                    userId: deleteData.userId,
                    userName: deleteData.userName,
                    message: `has deleted list <b>${deleteData.data.title}</b>`,
                    activityType: 'deletelist',
                    undoActivity: 'createlist',
                    listData: deleteData.data,
                    itemData: null,
                    subItemData: null
                }
                eventEmitter.emit('add-to-activity', activityData);
                
                socket.to(`${deleteData.userId}`).emit('notify-list-operation', deleteData);
            }
            socket.emit('update-list-deleted', deleteData.data);
            socket.broadcast.emit('update-list-deleted', deleteData.data);
        })//end of delete list listen event

        socket.on('add-item-to-list', (itemData) => {
            if (!itemData.isUndo) {
                let activityData = {
                    userId: itemData.userId,
                    userName: itemData.userName,
                    message: `added new item <b>${itemData.data.title}</b> to list <b>${itemData.listName}</b> `,
                    activityType: 'addItemToList',
                    undoActivity: 'deleteItemFromList',
                    listData: itemData.id,
                    itemData: itemData.data,
                    subItemData: null
                }
                eventEmitter.emit('add-to-activity', activityData);
                
                socket.to(`${itemData.userId}`).emit('notify-item-operation', itemData);
            }
            socket.emit('update-added-item-to-list', itemData.data);
            socket.broadcast.emit('update-added-item-to-list', itemData.data);
        })//end of add item to list listen event

        socket.on('edit-list-item', (itemData) => {
            if (!itemData.isUndo) {
                let activityData = {
                    userId: itemData.userId,
                    userName: itemData.userName,
                    message: `updated item <b>${itemData.itemName}</b> `,
                    activityType: 'editListItem',
                    undoActivity: 'undoEditItem',
                    listData: itemData.id,
                    itemData: {
                        itemId: itemData.itemId,
                        oldData: itemData.oldData
                    },
                    subItemData: null
                }
                eventEmitter.emit('add-to-activity', activityData);
                
            }

            socket.to(`${itemData.userId}`).emit('notify-edit-item', itemData);
        })//end of edit list item listen event

        socket.on('delete-list-item', (itemData) => {
            if (!itemData.isUndo) {
                let activityData = {
                    userId: itemData.userId,
                    userName: itemData.userName,
                    message: `deleted item <b>${itemData.data.title}</b> from list <b>${itemData.listName}</b> `,
                    activityType: 'deleteItemFromList',
                    undoActivity: 'addItemToList',
                    listData: itemData.id,
                    itemData: itemData.data,
                    subItemData: null
                }
                eventEmitter.emit('add-to-activity', activityData);
                
                socket.to(`${itemData.userId}`).emit('notify-item-operation', itemData);
            }
            socket.emit('update-deleted-item-list', itemData.data);
            socket.broadcast.emit('update-deleted-item-list', itemData.data);
        })//end of delete list item lsiten event

        socket.on('mark-item-open', (itemData) => {

            if (!itemData.isUndo) {
                let activityData = {
                    userId: itemData.userId,
                    userName: itemData.userName,
                    message: `has marked item <b>${itemData.data.title}</b> open of list <b>${itemData.listName}</b> `,
                    activityType: 'markedItemOpen',
                    undoActivity: 'markedItemClose',
                    listData: itemData.id,
                    itemData: itemData.data,
                    subItemData: null
                }
                eventEmitter.emit('add-to-activity', activityData);
                
                socket.to(`${itemData.userId}`).emit('notify-item-operation', itemData);
            }
            socket.emit('mark-item-open-completed', itemData.data);
            socket.broadcast.emit('mark-item-open-completed', itemData.data);
        })//end of mark item open listen event

        socket.on('mark-item-done', (itemData) => {
            if (!itemData.isUndo) {
                let activityData = {
                    userId: itemData.userId,
                    userName: itemData.userName,
                    message: `has marked item <b>${itemData.data.title}</b> done of list <b>${itemData.listName}</b> `,
                    activityType: 'markedItemDone',
                    undoActivity: 'markedItemOpen',
                    listData: itemData.id,
                    itemData: itemData.data,
                    subItemData: null
                }
                eventEmitter.emit('add-to-activity', activityData);
                
                socket.to(`${itemData.userId}`).emit('notify-item-operation', itemData);
            }
            socket.emit('mark-item-done-completed', itemData.data);
            socket.broadcast.emit('mark-item-done-completed', itemData.data);
        })//end of mark item done listen event

        socket.on('mark-item-close', (itemData) => {
            let activityData = {
                userId: itemData.userId,
                userName: itemData.userName,
                message: `has marked item <b>${itemData.data.title}</b> close of list <b>${itemData.listName}</b> `,
                activityType: 'markedItemclose',
                undoActivity: 'markedItemOpen',
                listData: itemData.id,
                itemData: itemData.data,
                subItemData: null
            }
            eventEmitter.emit('add-to-activity', activityData);
            socket.emit('mark-item-close-completed', itemData.data);
            socket.broadcast.emit('mark-item-close-completed', itemData.data);
            
        })//end of mark item done listen event


        socket.on('add-sub-item-to-items-list', (subItemData) => {
            if (!subItemData.isUndo) {
                let activityData = {
                    userId: subItemData.userId,
                    userName: subItemData.userName,
                    message: `has added sub item <b>${subItemData.data.title}</b> to item <b>${subItemData.itemName}</b> `,
                    activityType: 'addSubItem',
                    undoActivity: 'deleteSubItem',
                    listData: subItemData.id,
                    itemData: subItemData.itemId,
                    subItemData: subItemData.data
                }
                eventEmitter.emit('add-to-activity', activityData);
                
                socket.to(`${subItemData.userId}`).emit('notify-subItem-operation', subItemData);
            }
            socket.emit('update-added-sub-item-to-items-list', subItemData.data);
            socket.broadcast.emit('update-added-sub-item-to-items-list', subItemData.data);
        })//end of add sub item to items list listen event

        socket.on('delete-sub-item-from-items-list', (subItemData) => {
            if (!subItemData.isUndo) {
                let activityData = {
                    userId: subItemData.userId,
                    userName: subItemData.userName,
                    message: `has deleted sub item <b>${subItemData.data.title}</b> from item <b>${subItemData.itemName}</b> `,
                    activityType: 'deleteSubItem',
                    undoActivity: 'addSubItem',
                    listData: subItemData.id,
                    itemData: subItemData.itemId,
                    subItemData: subItemData.data
                }
                eventEmitter.emit('add-to-activity', activityData);
                
                socket.to(`${subItemData.userId}`).emit('notify-subItem-operation', subItemData);
            }
            socket.emit('update-deleted-sub-item-items-list', subItemData.data);
            socket.broadcast.emit('update-deleted-sub-item-items-list', subItemData.data);
        })//end of delete sub item to items list listen event

        socket.on('mark-subitem-done', (subItemData) => {
            if (!subItemData.isUndo) {
                let activityData = {
                    userId: subItemData.userId,
                    userName: subItemData.userName,
                    message: `has marked sub item <b>${subItemData.data.title}</b> done of item <b>${subItemData.itemName}</b> `,
                    activityType: 'markedSubItemDone',
                    undoActivity: 'markedSubItemClose',
                    listData: subItemData.id,
                    itemData: subItemData.itemId,
                    subItemData: subItemData.data
                }
                eventEmitter.emit('add-to-activity', activityData);
                
                socket.to(`${subItemData.userId}`).emit('notify-subItem-operation', subItemData);
            }
            socket.emit('mark-subitem-done-completed', subItemData.data);
            socket.broadcast.emit('mark-subitem-done-completed', subItemData.data);
        })//end of mark subitem done listen event

        socket.on('mark-subitem-close', (subItemData) => {
            let activityData = {
                userId: subItemData.userId,
                userName: subItemData.userName,
                message: `has marked sub item <b>${subItemData.data.title} </b> close of item <b>${subItemData.itemName}</b> `,
                activityType: 'markedSubItemClose',
                undoActivity: 'unmarkSubItemDone',
                listData: subItemData.id,
                itemData: subItemData.itemId,
                subItemData: subItemData.data
            }
            eventEmitter.emit('add-to-activity', activityData);
            socket.emit('mark-subitem-close-completed', subItemData.data);
            socket.broadcast.emit('mark-subitem-close-completed', subItemData.data);
            
        })//end of mark subitem done listen event

        socket.on('delete-activity', (data) => {
            socket.emit('deleted-activity', data);
            socket.broadcast.emit('deleted-activity', data);
        })

        //user operations
        socket.on('send-friend-request', (data) => {
            socket.join(data.receiverName);
            socket.to(data.receiverName).emit('notify-about-request', data);
        })

        socket.on('accept-request', (data) => {
            socket.join(data.senderName);
            socket.emit('decrement-request-count', data);
            socket.to(data.senderName).emit('request-accepted', data);
        })//end of accept request listen event

        socket.on('cancel-request', (userId) => {
            socket.emit('update-cancel-request', userId);
        })//end of cancel request listen event

        socket.on('disconnect', () => {
            console.log("disconnected socket");
        })

    })

}

//every action will be captured in DB
eventEmitter.on('add-to-activity', (activityData) => {
    activityController.addToActivity(activityData);
})

module.exports = {
    setServer: setServer
}   