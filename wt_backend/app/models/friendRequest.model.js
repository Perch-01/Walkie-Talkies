const mongoose = require('mongoose');

const FriendRequest = mongoose.model(
    "FriendRequest",
    new mongoose.Schema({
        username: {
            type: String,
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        mostRecentEditTime: {
            type: Number,
            required: true,
        },
    })
);

module.exports = FriendRequest;