const {Schema, model} = require("mongoose");


const schema = new Schema({
    rout_number: {
        type: Number,
        required: true
    },
    tail_number: {
        type: Number,
        required: true
    },
    waybills_date: {
        type: Date,
        required: true
    },
    done_trips: {
        type: Number,
        required: true
    },
    drivers: {
        type: String,
        required: true
    },
    conductors: {
        type: String,
        required: true
    }

});

module.exports = model("WaybillsSchema", schema);
