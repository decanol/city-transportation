const {Schema, model} = require("mongoose");


const schema = new Schema({
    tail_number: {
        type: Number,
        required: true
    },
    gov_number: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    release_date: {
        type: Date,
        required: true
    },
    mileage: {
        type: Number,
        required: true
    },
    last_repair_date: {
        type: Date,
        required: true
    }

});

module.exports = model("BusesSchema", schema);
