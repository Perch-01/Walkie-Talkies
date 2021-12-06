const { chatService } = require("../services");

const sendChat = async (req, res) => {
    try {
        const { userId, recieverId, chatLineId, message } = req.body;
        await chatService.sendChat(userId, recieverId, chatLineId, message)
        res.status(200).send({ message: "Sent" });
    }
    catch (error) {
        res.status(400).send(error);
    }
};
const getChat = async (req, res) => {
    try {
        const { chatLineId } = req.query;
        const chats = await chatService.getChat(chatLineId);
        res.status(200).send(chats);
    }
    catch (error) {
        res.status(400).send(error);
    }
};
const setChatNumberToZero = async (req, res) => {
    try {
        const { userId, recieverId } = req.body;
        await chatService.setChatNumberToZero(userId, recieverId);
        res.status(200).send({ message: "Set to zero" });
    }
    catch (error) {
        res.status(400).send(error);
    }
};

module.exports = {
    sendChat,
    getChat,
    setChatNumberToZero
}