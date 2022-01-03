/* eslint-disable comma-dangle */
// external dependency
const mongoose = require('mongoose');
// external dependency

const PendingMemberSchema = new mongoose.Schema(
    {
        bdnumber: {
            type: Number,
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
        roll: {
            type: String,
            default: 'member',
            enum: ['member', 'senior'],
        },
    },
    {
        timestamps: true,
    }
);

const PendingMember = mongoose.model('PendingMember', PendingMemberSchema);

module.exports = Member;
