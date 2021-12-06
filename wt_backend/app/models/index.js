const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//This is our entire database
const database = {};

database.mongoose = mongoose;

database.user = require("./user.model");
database.friends = require("./friends.model");
database.friendRequest = require("./friendRequest.model");
database.chat = require("./chat.model");
database.chatLine = require("./chatLine.model");

module.exports = database;