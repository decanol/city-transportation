const {Schema, model} = require("mongoose");
require('./StationsSchema');

const schema = new Schema ({
    rout_number: {
        type: Number,
        required: true
    },
    stations: [{ type: Schema.Types.ObjectId, ref: 'StationsSchema' }],
    rout_mileage: {
        type: Number,
        required: true
    },
    trip_time: {
        type: Number,
        required: true
    },
    planned_trips_number: {
        type: Number,
        required: true
    }
});

module.exports = model("RoutsListSchema", schema);
