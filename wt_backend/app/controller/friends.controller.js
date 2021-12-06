const {
    friendService
} = require("../services");

const searchFriends = async (req, res) => {
    try {

        const { searchValue, userId } = req.query;
        const friends = await friendService.searchFriends(searchValue, userId)
        res.status(200).send(friends);
    }
    catch (error) {
        res.status(400).send(error);
    }
};

const listOfFriends = async (req, res) => {
    try {
        const { userId } = req.query;
        const friends = await friendService.listOfFriends(userId)
        res.status(200).send(friends);
    }
    catch (error) {
        res.status(400).send(error);
    }
};

const sendFriendRequest = async (req, res) => {
    try {
        const { username, id, recieverId } = req.body;
        const response = await friendService.sendFriendRequest(username, id, recieverId);
        res.status(200).send(response);
    }
    catch (error) {
        res.status(400).send(error);
    }
};

const acceptOrDeclineFriendRequest = async (req, res) => {
    try {
        const { userId, friendId, acceptFriendRequest, friendRequestId, username, friendUsername } = req.body;
        await friendService.acceptOrDeclineFriendRequest(userId, friendId, acceptFriendRequest, friendRequestId, username, friendUsername);
        res.status(200).send({ message: 'Accepted friend request!' });
    }
    catch (error) {
        res.status(400).send(error);
    }
};

const getFriendRequests = async (req, res) => {
    try {
        const { id } = req.query;
        const friendRequests = await friendService.getFriendRequests(id);
        res.status(200).send(friendRequests);
    }
    catch (error) {
        res.status(400).send(error);
    }
};

module.exports = {
    searchFriends,
    sendFriendRequest,
    acceptOrDeclineFriendRequest,
    getFriendRequests,
    listOfFriends,
}