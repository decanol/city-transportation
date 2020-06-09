const {Schema, model} = require("mongoose");


const schema = new Schema({
    title_vacancy: {
        type: String,
        required: true
    },
    content_vacancy: {
        type: String,
        required: true
    }

});

module.exports = model("VacancySchema", schema);
