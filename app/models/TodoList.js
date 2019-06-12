const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let todoListSchema = new Schema(
    {
        id: {
            type: String,
            index: true,
            unique: true
        },
        title: {
            type: String,
            default: ''
        },
        owner: {
            type: String
        },
        itemsList: [{
            itemId: String,
            title: String,
            description: String,
            startDate: Date,
            dueDate: Date,
            endDate: Date,
            fileName: {
                type: String,
                default: ''
            },
            fileLocation: {
                type: String,
                default: ''
            },
            isOpen: {
                type: Boolean,
                default: false
            },
            isDone: {
                type: Boolean,
                default: false
            },
            subitemsList: [{
                subItemId: String,
                title: String,
                isDone: {
                    type: Boolean,
                    default: false
                }
            }]
        }
        ],
        createdOn: {
            type: Date
        }
    }
)


module.exports = mongoose.model('TodoList', todoListSchema);