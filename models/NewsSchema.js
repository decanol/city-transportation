const {Schema, model} = require("mongoose");


const schema = new Schema({
    title_news: {
        type: Text,
        required: true
    },
    content_news: {
        type: Text,
        required: true
    }

});

module.exports = model("NewsSchema", schema);
