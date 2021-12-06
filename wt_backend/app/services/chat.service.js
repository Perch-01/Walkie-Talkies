const Chat = require('../models/chat.model');
const toObjectID = require('../functions/toObjectID');
const ChatLine = require('../models/chatLine.model');
const User = require('../models/user.model');
const Friends = require('../models/friends.model');

const sendChat = async (userId, recieverId, chatLineId, message) => {
    const newChat = await Chat.collection.insertOne({
        senderId: userId,
        message: message,
        date: new Date().getTime(),
    });
    const newChatId = newChat.insertedId.toJSON();
    await ChatLine.collection.updateOne(
        { _id: toObjectID(chatLineId) },
        { $push: { chats: toObjectID(newChatId) } }
    );
    const pipeline = [
        {
            $match: {
                _id: toObjectID(recieverId)
            }
        },
        {
            $lookup: {
                "from": "friends",
                "localField": "friends",
                "foreignField": "_id",
                "as": "friends"
            }
        },
        { $unwind: "$friends" },
        {
            $project: {
                "_id": 0,
                "friends": 1
            }
        },
        {
            $match: {
                "friends.friendId": userId,
            }
        }

    ];

    const friendObject_ = await User.aggregate(pipeline);
    const friendObject = friendObject_[0].friends;

    await Friends.updateOne(
        { _id: friendObject._id },
        {
            latestMessage: message,
            mostRecentEditTime: new Date().getTime(),
            $inc: { unreadMessages: 1 }
        })
    return true;
}
const setChatNumberToZero = async (userId, recieverId) => {
    const pipeline = [
        {
            $match: {
                _id: toObjectID(recieverId)
            }
        },
        {
            $lookup: {
                "from": "friends",
                "localField": "friends",
                "foreignField": "_id",
                "as": "friends"
            }
        },
        { $unwind: "$friends" },
        {
            $project: {
                "_id": 0,
                "friends": 1
            }
        },
        {
            $match: {
                "friends.friendId": userId,
            }
        }

    ];

    const friendObject_ = await User.aggregate(pipeline);
    const friendObject = friendObject_[0].friends;
    await Friends.updateOne(
        { _id: friendObject._id },
        {
            unreadMessages: 0
        })
    return true;
}
const getChat = async (chatLineId) => {
    const chats = await ChatLine.findOne({ _id: toObjectID(chatLineId) }).populate("chats");
    return chats?.chats;
}
module.exports = {
    sendChat,
    getChat,
    setChatNumberToZero
}