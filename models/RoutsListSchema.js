const {Schema, model} = require("mongoose");


const schema = new Schema ({
    rout_number: {
        type: Number,
        required: true
    },
    stations: {
        type: String,
        required: true
    }
});

module.exports = model("RoutsListSchema", schema);
