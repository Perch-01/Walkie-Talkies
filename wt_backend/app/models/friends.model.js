const mongoose = require('mongoose');

const Friends = mongoose.model(
    "Friend",
    new mongoose.Schema({
        username: {
            type: String,
            required: true,
        },
        friendId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        unreadMessages: {
            type: Number,
            //required: true,
        },
        latestMessage: {
            type: String,
            //required: true,
        },
        mostRecentEditTime: {
            type: Number,
            //required: true,
        },
        chatLineId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
    })
);

module.exports = Friends;