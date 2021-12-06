const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config/auth.config");
const database = require("../models");
const toJSON = require('../functions/toJSON');
const User = database.user;

const signUp = async (req, res) => {
    const { username, email, password } = req.body;
    const user = new User({
        username: username,
        email: email,
        password: bcrypt.hashSync(password, 8),
    });
    await user.save();

    const token = jwt.sign(
        { id: user.id },
        config.secret,
        {
            expiresIn: 86400 // 48 hours before this token expires
        }
    );
    if (user)
        res.send({
            message: "User was registered successfully!",
            accessToken: token,
            ...toJSON(user, 'removePassword'),
        });
};

const signIn = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username })
    // .populate("friends")
    // .populate("friendRequests");
    /** Because we have a field called "roles" with an objectId Type and a ref of "Role",
     *  we use "populate" to query the original "Role" field and add it to the user object. 
    */
    if (!user) {
        res.status(400).send({ message: 'Username does not exist' });
        return;
    };

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
        return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
        });
    }

    const token = jwt.sign(
        { id: user.id },
        config.secret,
        {
            expiresIn: 86400 // 48 hours before this token expires
        }
    );

    res.status(200).send({
        ...toJSON(user, 'removePassword'),
        accessToken: token,
    });
};
const checkIfTokenIsValid = async (req, res) => {
    let { token } = req.query;
    jwt.verify(//To verify the token
        token,
        config.secret,
        (err, decoded) => {
            if (err) {
                return res.status(400).send({ message: "Token is expired or unauthorized!" });
            }
            res.status(200).send({ message: "Valid token" })
        });
}

module.exports = {
    signIn,
    signUp,
    checkIfTokenIsValid,
}