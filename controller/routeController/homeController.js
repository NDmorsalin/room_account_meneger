/* eslint-disable comma-dangle */
// external dependency
// internal dependency
const Member = require('../../model/member');

const { Deposit, Balance } = require('../../model/account');

const { PendingBalance, PendingDeposit} = require('../../model/pendingAccount');

const Goods = require('../../model/goods');
const PendingGoods = require('../../model/pendingGoods');

// load the home page
const getHomePage = (req, res) => {
    res.render('home');
};

// get all member from db
const getAllMember = async (req, res) => {
    try {
        const balance = await Balance.findOne({ thisMonth: req.headers.thismonth });
        const allMember = await Member.find({}, { password: 0 }).sort('bdnumber');
        const lustDepositByMe = await Deposit.findOne({
            depositBy: { name: req.member.name, bdnumber: parseInt(req.member.bdnumber) },
            thisMonth: req.headers.thismonth,
        });

        // todo remove
        const lustDepositByAll = await Deposit.find({
            thisMonth: req.headers.thismonth,
        });

        // todo remove
        const goods = await Goods.find({
            thisMonth: req.headers.thismonth,
        });

        res.json({
            balance,
            allMember,
            lustDepositByAll,
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
/* 
const billDeposit = async (req, res) => {
    // add deposit balance amount in Deposit Schema

    const newDeposit = await new Deposit({
        depositBalance: parseInt(req.body.depositAmount, 10),
        totalDeposit: parseInt(req.body.depositAmount, 10),
        depositMonth: req.body.depositMonth,
        depositBy: {
            name: req.member.name,
            bdnumber: parseInt(req.member.bdnumber),
        },
    });
    await newDeposit.save();
    // update total deposit
    const deposit = await Deposit.find({
        depositBy: { name: req.member.name, bdnumber: parseInt(req.member.bdnumber) },
        thisMonth: req.body.depositMonth,
    });

    let ttlDeposit = 0;
    if (deposit) {
        deposit.forEach((dpst) => {
            ttlDeposit += dpst.depositBalance;
        });
        const updateDeposit = await Deposit.updateMany(
            {
                depositBy: { name: req.member.name, bdnumber: parseInt(req.member.bdnumber) },
                thisMonth: req.body.depositMonth,
            },
            {
                totalDeposit: ttlDeposit,
            }
        );
    }


    //  check Balance is present or not;
    const balance = await Balance.findOne({ thisMonth: req.body.depositMonth });
    // if balance is present and it's month is current month then update is or creat new
    if (balance) {
        if (balance.thisMonth === req.body.depositMonth) {
            const previousBalance = balance.totalBalance;

            await Balance.updateOne(
                { thisMonth: req.body.depositMonth },
                { totalBalance: previousBalance + parseInt(req.body.depositAmount, 10) }
            );
        } else {
            const newBalance = await new Balance({
                totalBalance: req.body.depositAmount,
                thisMonth: req.body.depositMonth,
            });
            newBalance.save();
        }
    } else {
        const newBalance = await new Balance({
            totalBalance: req.body.depositAmount,
            thisMonth: req.body.depositMonth,
        });
        newBalance.save();
    }
    // get updated balance for display
    const updatedBalance = await Balance.findOne({ thisMonth: req.body.depositMonth });
    res.json({
        totalDeposit: ttlDeposit,
        balance: updatedBalance,
    });
};
 */


const pendingBillDeposit = async (req, res) => {
    // add deposit balance amount in Deposit Schema

    const newPendingDeposit = await new PendingDeposit({
        depositBalance: parseInt(req.body.depositAmount, 10),
        totalDeposit: parseInt(req.body.depositAmount, 10),
        depositMonth: req.body.depositMonth,
        depositBy: {
            name: req.member.name,
            bdnumber: parseInt(req.member.bdnumber),
        },
    });
    await newPendingDeposit.save();
    /* 
    // update total deposit
    const deposit = await PendingDeposit.find({
        depositBy: { name: req.member.name, bdnumber: parseInt(req.member.bdnumber) },
        thisMonth: req.body.depositMonth,
    });

    let ttlDeposit = 0;
    if (deposit) {
        deposit.forEach((dpst) => {
            ttlDeposit += dpst.depositBalance;
        });
        const updateDeposit = await PendingDeposit.updateMany(
            {
                depositBy: { name: req.member.name, bdnumber: parseInt(req.member.bdnumber) },
                thisMonth: req.body.depositMonth,
            },
            {
                totalDeposit: ttlDeposit,
            }
        );
    }


    //  check Balance is present or not;
    const balance = await PendingBalance.findOne({ thisMonth: req.body.depositMonth });
    // if balance is present and it's month is current month then update is or creat new
    if (balance) {
        if (balance.thisMonth === req.body.depositMonth) {
            const previousBalance = balance.totalBalance;

            await PendingBalance.updateOne(
                { thisMonth: req.body.depositMonth },
                { totalBalance: previousBalance + parseInt(req.body.depositAmount, 10) }
            );
        } else {
            const newPendingBalance = await new PendingBalance({
                totalBalance: req.body.depositAmount,
                thisMonth: req.body.depositMonth,
            });
            newPendingBalance.save();
        }
    } else {
        const newPendingBalance = await new PendingBalance({
            totalBalance: req.body.depositAmount,
            thisMonth: req.body.depositMonth,
        });
        newPendingBalance.save();
    }
    // get updated balance for display
    const updatedPendingBalance = await PendingBalance.findOne({ thisMonth: req.body.depositMonth }); */
    res.json({
        message: 'Your deposit Balance is pending for confirmation'
    });
};


const buyGoods = async (req, res) => {
    // save goods
    const goods = await Goods({
        goodsNames: req.body.goods,
        totalPrice: req.body.totalPrice,
        boughtBy: {
            name: req.member.name,
            bdnumber: req.member.bdnumber,
        },
        thisMonth: req.body.thisMonth,
    });

    await goods.save();

    // update balance

    const balance = await Balance.findOne({ thisMonth: req.body.thisMonth });
    const prevBall = balance.totalBalance;
    const prevConst = balance.totalCost;

    const newBalance = await Balance.findOneAndUpdate(
        { thisMonth: req.body.thisMonth },
        {
            totalBalance: prevBall - req.body.totalPrice,
            totalCost: prevConst + req.body.totalPrice,
        },
        { new: true }
    );

    res.json({
        thisMonthWillPay: newBalance.thisMonthWillPay,
        totalBalance: newBalance.totalBalance,
        totalCost: newBalance.totalCost,
        goodsNames: goods.goodsNames,
        totalPrice: goods.totalPrice,
        boughtBy: goods.boughtBy,
        buyingDate: goods.buyingDate,
    });
};

module.exports = {
    getHomePage,
    getAllMember,
    //billDeposit,
    pendingBillDeposit,
    buyGoods,
};
