const {Schema, model} = require("mongoose");


const schema = new Schema({
    title_about: {
        type: String,
        required: true
    },
    content_about: {
        type: String,
        required: true
    }

});

module.exports = model("AboutSchema", schema);
