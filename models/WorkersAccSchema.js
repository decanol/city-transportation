const {Schema, model} = require("mongoose");
require('./WorkersSchema');

const schema = new Schema({
    reg_number: {
        type: Number,
        required: true
    },
    post: {
        type: String,
        required: true
    },
    accept_date: {
        type: Date,
        required: true
    },
    tail_number: {
        type: Number,
        required: true
    }
});

schema.virtual('worker', {
    ref: 'WorkersSchema',
    localField: 'reg_number',
    foreignField: 'reg_number',
    justOne: true,
});

module.exports = model("WorkersAccSchema", schema);
