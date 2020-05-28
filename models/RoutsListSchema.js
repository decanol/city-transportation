const {Schema, model} = require("mongoose");


const schema = new Schema ({
    rout_number: {
        type: Number,
        required: true
    },
    start_station: {
        type: String,
        required: true
    },
    finish_station: {
        type: String,
        required: true
    },
    stations: {
        type: String,
        required: true
    },
    mileage: {
        type: Number,
        required: true
    }
});

module.exports = model("RoutsListSchema", schema);
