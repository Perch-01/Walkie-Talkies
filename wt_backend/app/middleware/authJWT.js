const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const database = require("../models");
const User = database.user;

/**
 * This function checks if the JWT 
 * token provided is valid
 * @param {object} req
 * @param {object} res
 */
const verifyToken = async (req, res, next) => {
    let token = req.headers["x-access-token"] || req.headers["authorization"];

    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }
    else
        token = token.substring(7, token.length);//Extract the token

    jwt.verify(//To verify the token
        token,
        config.secret,
        (err, decoded) => {
            if (err) {
                return res.status(401).send({ message: "Unauthorized!" });
            }
            req.userId = decoded.id;
            next();
        });
};


const authJwt = {
    verifyToken,
};
module.exports = authJwt;