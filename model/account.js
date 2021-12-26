/* eslint-disable comma-dangle */
// external dependency

const mongoose = require('mongoose');

const depositSchema = new mongoose.Schema(
    {
        depositBalance: { type: Number, default: 0 },
        totalDeposit: Number,
        depositBy: {
            name: { type: String, required: true },
            bdnumber: { type: String, required: true },
        },
        depositMonth: { type: String, required: true },
        depositDate: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);
const balanceSchema = new mongoose.Schema(
    {
        thisMonthWillPay: { type: Number, default: 0 },
        totalBalance: { type: Number, default: 0 },
        totalCost: { type: Number, default: 0 },
        thisMonth: String,
    },
    {
        timestamps: true,
    }
);
/*
const buyingSchema = new mongoose.Schema(
    {
        buyingBalance: { type: Number, default: 0 },
        boughtBy: {
            name: { type: String, required: true },
            bdnumber: { type: String, required: true },
        },
        buyingDate: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
); */

// deposit Model
const Deposit = mongoose.model('Deposit', depositSchema);
// Balance Model
const Balance = mongoose.model('Balance', balanceSchema);

module.exports = { Deposit, Balance };
