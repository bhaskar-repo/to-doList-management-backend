const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let activitiesSchema = new Schema({
    activityId: {
        type: String,
        index: true,
        unique: true
    },
    userId: {
        type: String,
        index: true
    },
    userName: {
        type: String
    },
    message: {
        type: String
    },
    activityType: {
        type: String
    },
    undoActivity: {
        type: String
    },
    listData: {
        type: Object
    },
    itemData: {
        type: Object
    },
    subItemData: {
        type: Object
    },
    updatedOn: {
        type: Date
    }
})

module.exports = mongoose.model('Activity', activitiesSchema);