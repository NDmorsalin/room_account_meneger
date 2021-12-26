/* eslint-disable comma-dangle */
// external dependency
const mongoose = require('mongoose');
// external dependency

const memberSchema = new mongoose.Schema(
    {
        bdnumber: {
            type: String,
            trim: true,
            required: true,
        },
        rank: {
            type: String,
            trim: true,
            required: true,
        },
        name: {
            type: String,
            trim: true,
            required: true,
        },
        phone: {
            type: String,
            trim: true,
            required: true,
        },
        section: {
            type: String,
            trim: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Member = mongoose.model('Member', memberSchema);

module.exports = Member;
