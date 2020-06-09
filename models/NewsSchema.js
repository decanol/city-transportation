const {Schema, model} = require("mongoose");


const schema = new Schema({
    title_news: {
        type: String,
        required: true
    },
    content_news: {
        type: String,
        required: true
    }

});

module.exports = model("NewsSchema", schema);
