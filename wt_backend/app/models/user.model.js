const mongoose = require("mongoose");

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true, //to remove whitespace
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        friends: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Friend"
            }
        ],
        friendRequests: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "FriendRequest"
            }
        ],
    })
);
 
module.exports = User;