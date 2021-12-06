const database = require("../models");
const User = database.user;

/**
 * This function checks if the username or the email 
 * has been used before 
 * @param {object} req
 * @param {object} res
 */
const checkDuplicateUsernameOrEmail = async (req, res, next) => {
    //Check if the username exists already
    const { username, email } = req.body;
    const user = await User.findOne({ username: username });
    const user_ = await User.findOne({ email: email });
    if (user) {
        res.status(400).send({ message: "Username is already in use!" });
    }
    if (user_) {
        res.status(400).send({ message: "Email is already in use!" });
        return;
    }
    next();
};


const verifyAuthentication = {
    checkDuplicateUsernameOrEmail,
};

module.exports = verifyAuthentication;