const configuration = require('./');
module.exports = {
    secret: configuration.auth.jwtSecret,
};