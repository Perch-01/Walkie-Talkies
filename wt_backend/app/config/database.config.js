const configuration = require('./');
//THESE ARE PARAMS FOR SETTING UP THE MONGODB DATABASE, Cluster1 
module.exports = {
    PASSWORD: configuration.database.PASSWORD,
    USER: configuration.database.USER,
    NAME: configuration.database.NAME,
};