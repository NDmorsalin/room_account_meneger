/* eslint-disable comma-dangle */
// external dependency
// internal dependency
const Member = require('../../model/member');
const { Deposit, Balance } = require('../../model/account');
const Goods = require('../../model/goods');
// load the home page
const getSeniorPage = (req, res) => {
    res.render('senior');
};

// get all member from db
const getAllMember = async (req, res) => {
    try {
        const balance = await Balance.findOne({ thisMonth: req.headers.thismonth });
        const allMember = await Member.find({}, { password: 0 }).sort('bdnumber');
        const lustDepositByMe = await Deposit.findOne({
            depositBy: { name: req.member.name, bdnumber: req.member.bdnumber },
            thisMonth: req.headers.thismonth,
        });

        const goods = await Goods.find({
            thisMonth: req.headers.thismonth,
        });
        res.json({
            balance,
            allMember,
            lustDepositByMe,
            goods,
        });
    } catch (err) {
        res.status(500).json({
            errors: {
                common: {
                    msg: err.message,
                },
            },
        });
    }
};
module.exports = {
    getSeniorPage,
    getAllMember,
};
