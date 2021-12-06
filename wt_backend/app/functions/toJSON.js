const toJSON = (mongoObject, type = null) => {
    switch (type) {
        case 'removePassword': {
            let obj = { ...mongoObject.toJSON() };
            delete obj.password;
            return obj;
        } break;
        default: {
            return mongoObject.toJSON();
        } break;
    }
}
module.exports = toJSON;