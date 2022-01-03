/* eslint-disable comma-dangle */
// external dependency

const mongoose = require('mongoose');

const pendingDepositSchema = new mongoose.Schema(
    {
        depositBalance: { type: Number, default: 0 },
        totalDeposit: Number,
        depositBy: {
            name: { type: String, required: true },
            bdnumber: { type: Number, required: true },
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
const pendingBalanceSchema = new mongoose.Schema(
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


// deposit Model
const PendingDeposit = mongoose.model('PendingDeposit', pendingDepositSchema);
// Balance Model
const PendingBalance = mongoose.model('PendingBalance', pendingBalanceSchema);

module.exports = { PendingDeposit , PendingBalance };
