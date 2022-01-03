/* eslint-disable comma-dangle */
// external dependency

const mongoose = require('mongoose');

const pendingGoodsSchema = new mongoose.Schema(
    {
        goodsNames: { type: Object, required: true },
        totalPrice: { type: Number, required: true },
        boughtBy: {
            name: { type: String, required: true },
            bdnumber: { type: String, required: true },
        },
        buyingDate: { type: Date, default: Date.now },
        thisMonth: String,
    },
    {
        timestamps: true,
    }
);

// goods model
const PendingGoods = mongoose.model('PendingGoods', pendingGoodsSchema);

module.exports = PendingGoods;
