const User = require('../models/user.model');
const Friends = require('../models/friends.model');
const FriendRequest = require('../models/friendRequest.model');
const ChatLine = require('../models/chatLine.model');
const toObjectID = require('../functions/toObjectID');
const searchFriends = async (searchValue, userId) => {
    const pipeline = [
        {
            $search:
            {
                autocomplete: {
                    query: searchValue,
                    path: "username"
                }
            }
        },
        {
            $match: {
                _id: { $not: { $eq: toObjectID(userId) } }
            }
        },
        {
            $lookup: {
                "from": 'friendrequests',
                "localField": "friendRequests",
                "foreignField": "_id",
                "as": "friendRequests"
            }
        },
        {
            $lookup: {
                "from": 'friends',
                "localField": "friends",
                "foreignField": "_id",
                "as": "friends"
            }
        },
        {
            $project: {
                "_id": 1,
                "username": 1,
                "friends": 1,
                "friendRequests": 1,
            }
        }
    ];
    const friends = await User.aggregate(pipeline);
    for (let i = 0; i < friends.length; i++) {
        let isFriend = false,
            friendRequestSent = false,
            friendObjectId = '';

        const currentFriends = friends[i].friends;
        for (let k = 0; k < currentFriends.length; k++)
            if (currentFriends[k].friendId === (userId)) {
                isFriend = true;
                friendObjectId = (currentFriends[k]._id);
            }

        const currentFriendRequests = friends[i].friendRequests;
        for (let k = 0; k < currentFriendRequests.length; k++)
            if (currentFriendRequests[k].userId === (userId))
                friendRequestSent = true;

        friends[i].isFriend = isFriend;
        friends[i].friendRequestSent = friendRequestSent;
        if (isFriend) {
            const listOfFriends = friends[i].friends;
            for (let k = 0; k < listOfFriends.length; k++) {

                const { friendId, chatLineId } = listOfFriends[k];
                if (friendId == userId) {
                    friends[i].chatLineId = chatLineId;
                    const pipeline_ = [
                        {
                            $match: {
                                _id: toObjectID(userId),
                            }
                        },
                        {
                            $lookup: {
                                "from": 'friends',
                                "localField": "friends",
                                "foreignField": "_id",
                                "as": "friends"
                            }
                        },
                        {
                            $project: {
                                "_id": 0,
                                "friends": 1,
                            }
                        },
                        {
                            $unwind: "$friends"
                        },
                        {
                            $match: {
                                "friends.chatLineId": chatLineId,
                            }
                        }
                    ];
                    const friendObject = await User.aggregate(pipeline_);
                    friends[i].friendObject = friendObject[0]?.friends;
                }
            }
        }
        delete friends[i].friends;
        delete friends[i].friendRequests;
    };





    return friends;
};

const listOfFriends = async (userId) => {
    const pipeline = [
        {
            $match: {
                _id: toObjectID(userId),
            }
        },
        {
            $lookup: {
                "from": 'friends',
                "localField": "friends",
                "foreignField": "_id",
                "as": "friends"
            }
        },
        {
            $project: {
                "friends": 1,
            }
        }
    ];
    const listOfFriends = await User.aggregate(pipeline);
    return listOfFriends[0]?.friends ? listOfFriends[0]?.friends : [];
};

const sendFriendRequest = async (username, id, recieverId) => {
    let alreadyRecievedFriendRequest = false;
    let friendRequestId = '';
    let friendUsername = '';
    const listOfFriendRequests = await getFriendRequests(id);
    for (let i = 0; i < listOfFriendRequests.length; i++) {
        const currentFriendRequest = listOfFriendRequests[i];
        if (currentFriendRequest.userId = recieverId) {

            alreadyRecievedFriendRequest = true;
            friendRequestId = currentFriendRequest._id;
            friendUsername = currentFriendRequest.username;
        }
    }


    if (alreadyRecievedFriendRequest) {
        await acceptOrDeclineFriendRequest(
            id,
            recieverId,
            true,
            friendRequestId.toString(),
            username,
            friendUsername
        );
        return {
            isFriend: true,
            friendId: recieverId,
            friendUsername: friendUsername,
        };
    } else {
        const newFriendRequest = await FriendRequest.collection.insertOne({
            username: username,
            userId: id,
            mostRecentEditTime: new Date().getTime(),
        });
        const newFriendRequestID = newFriendRequest.insertedId.toJSON();
        await User.collection.updateOne(
            { _id: toObjectID(recieverId) },
            { $push: { friendRequests: toObjectID(newFriendRequestID) } }
        );
        return {
            isFriend: false,
            friendId: recieverId,
            friendUsername: friendUsername,
        };
    }
}


const acceptOrDeclineFriendRequest = async (
    userId,
    friendId,
    acceptFriendRequest,
    friendRequestId,
    username,
    friendUsername
) => {
    await User.collection.updateOne({ _id: toObjectID(userId) }, {
        $pull: {
            friendRequests: {
                $in: [toObjectID(friendRequestId)]
            },
        }
    });
    await FriendRequest.collection.deleteOne({ _id: toObjectID(friendRequestId) });
    if (acceptFriendRequest) {//now accept the friend request by adding the friend to both users
        const newChatLine = await ChatLine.collection.insertOne({ chats: [] });
        const newChatLineId = newChatLine.insertedId.toJSON();
        const friend1 = await Friends.collection.insertOne({
            username: friendUsername,
            friendId: friendId,
            chatLineId: newChatLineId,
        });
        const friendId1 = friend1.insertedId.toJSON();
        await User.collection.updateOne(
            { _id: toObjectID(userId) },
            { $push: { friends: toObjectID(friendId1) } }
        );

        const friend2 = await Friends.collection.insertOne({
            username: username,
            friendId: userId,
            chatLineId: newChatLineId,
        });
        const friendId2 = friend2.insertedId.toJSON();
        await User.collection.updateOne(
            { _id: toObjectID(friendId) },
            { $push: { friends: toObjectID(friendId2) } }
        );
    }

    return true;
};


const getFriendRequests = async (id) => {
    const pipeline = [
        {
            $match:
            {
                _id: toObjectID(id)
            }
        },
        {
            $lookup: {
                "from": 'friendrequests',
                "localField": "friendRequests",
                "foreignField": "_id",
                "as": "friendRequests"
            }
        },
        {
            $project: {
                "friendRequests": 1
            },
        }

    ];
    const listOfFriendRequests = await User.aggregate(pipeline);
    return listOfFriendRequests[0]?.friendRequests ? listOfFriendRequests[0]?.friendRequests : [];
}


module.exports = {
    searchFriends,
    sendFriendRequest,
    acceptOrDeclineFriendRequest,
    getFriendRequests,
    listOfFriends,
};