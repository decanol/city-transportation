const {Schema, model} = require("mongoose");


const schema = new Schema({
    gender: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    // birthday: {
    //     type: Date,
    //     required: true
    // },
    address: {
        type: String,
        required: true
    }
});

module.exports = model("VacanciesAppSchema", schema);
