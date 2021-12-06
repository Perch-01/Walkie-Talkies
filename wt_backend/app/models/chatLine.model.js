const mongoose = require('mongoose');

const ChatLine = mongoose.model(
    "ChatLine",
    new mongoose.Schema({
        chats: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Chat"
            }
        ]
    })
);

module.exports = ChatLine;