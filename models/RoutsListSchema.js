const {Schema, model} = require("mongoose");
require('./StationsSchema');

const schema = new Schema ({
    rout_number: {
        type: Number,
        required: true
    },
    stations: [{ type: Schema.Types.ObjectId, ref: 'StationsSchema' }],
});

module.exports = model("RoutsListSchema", schema);
