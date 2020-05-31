const {Schema, model} = require("mongoose");


const schema = new Schema ({
    stations: {
        type: String,
        required: true
    }
});

module.exports = model("StationsSchema", schema);
