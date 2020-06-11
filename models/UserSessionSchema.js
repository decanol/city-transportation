const {Schema, model} = require("mongoose");
require('./UserSchema');

const schema = new Schema ({
    user_id: {
        type: Schema.ObjectId, ref: 'UserSchema'
    },
    session: {
        type: String,
        required: true
    }
});

module.exports = model("UserSession", schema);
