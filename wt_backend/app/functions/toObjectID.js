const mongoose = require('mongoose');

const toObjectID = (id) => {
    return mongoose.Types.ObjectId(id);
}
module.exports = toObjectID;