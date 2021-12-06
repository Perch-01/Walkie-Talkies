const mongoose = require('mongoose');

const Chat = mongoose.model(
    "Chat",
    new mongoose.Schema({
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        message: {
            type: String,
            required: true,
        },
        date: {
            type: Number,
            required: true,
        },
    })
);

module.exports = Chat;