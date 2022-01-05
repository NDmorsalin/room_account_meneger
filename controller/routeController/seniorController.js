/* eslint-disable comma-dangle */
// external dependency
// internal dependency
const Member = require("../../model/member");
const {
  PendingDeposit,
  PendingBalance,
} = require("../../model/pendingAccount");
const { Deposit, Balance } = require("../../model/account");

const PendingGoods = require('../../model/pendingGoods');
const Goods = require('../../model/goods');

// load the home page
const getSeniorPage = (req, res) => {
  //console.log('senior page');
  res.render("senior");
};

// get all member from db
const getAllMember = async (req, res) => {
  try {
    const allMember = await Member.find({}, { password: 0 }).sort("bdnumber");
    res.json({
      allMember,
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

// get all getAllPendingDeposit from db
const getAllPendingDeposit = async (req, res) => {
  try {
    const allPendingDeposit = await PendingDeposit.find();
    res.json({
      allPendingDeposit,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      errors: {
        common: {
          msg: err.message,
        },
      },
    });
  }
};

const getAllPendingGoods = async (req, res)=>{
  try{
    const allPendingGoods = await PendingGoods.find();
    res.json({
      allPendingGoods,
    });
  }catch(err){
    console.log(err);
    res.status(500).json({
      errors: {
        common: {
          msg: err.message,
        },
      },
    });
  }
}

const acceptDeposit = async (req, res) => {
  try {
    const pDeposit = await PendingDeposit.findByIdAndDelete(req.body.id);

    // add deposit balance amount in Deposit Schema

    const newDeposit = await new Deposit({
      depositBalance: pDeposit.depositBalance,
      totalDeposit: pDeposit.depositBalance,
      depositMonth: pDeposit.depositMonth,
      depositBy: {
        name: req.member.name,
        bdnumber: parseInt(req.member.bdnumber),
      },
    });
    await newDeposit.save();
    // update total deposit
    const deposit = await Deposit.find({
      depositBy: {
        name: req.member.name,
        bdnumber: parseInt(req.member.bdnumber),
      },
      thisMonth: pDeposit.depositMonth,
    });

    let ttlDeposit = 0;
    if (deposit) {
      deposit.forEach((dpst) => {
        ttlDeposit += dpst.depositBalance;
      });
      const updateDeposit = await Deposit.updateMany(
        {
          depositBy: {
            name: req.member.name,
            bdnumber: parseInt(req.member.bdnumber),
          },
          thisMonth: pDeposit.depositMonth,
        },
        {
          totalDeposit: ttlDeposit,
        }
      );
    }

    //  check Balance is present or not;
    const balance = await Balance.findOne({ thisMonth: pDeposit.depositMonth });
    // if balance is present and it's month is current month then update is or creat new
    if (balance) {
      if (balance.thisMonth === pDeposit.depositMonth) {
        const previousBalance = balance.totalBalance;

        await Balance.updateOne(
          { thisMonth: pDeposit.depositMonth },
          {
            totalBalance:
              previousBalance + parseInt(pDeposit.depositBalance, 10),
          }
        );
      } else {
        const newBalance = await new Balance({
          totalBalance: pDeposit.depositBalance,
          thisMonth: pDeposit.depositMonth,
        });
        newBalance.save();
      }
    } else {
      const newBalance = await new Balance({
        totalBalance: pDeposit.depositBalance,
        thisMonth: pDeposit.depositMonth,
      });
      newBalance.save();
    }


    res.json({
      message: "deposit balance is accepted",
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

const deleteDeposit = async (req, res) => {
  try {
    const pDeposit = await PendingDeposit.findByIdAndDelete(req.body.id);
    console.log(pDeposit);

    res.json({
      message: "pending deposit is deleted",
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

const acceptGoods = async (req, res) => {
  try {
    const pGoods = await PendingGoods.findByIdAndDelete(req.body.id);
    (pGoods);

    // save goods
    const goods = await Goods({
      goodsNames: pGoods.goodsNames,
      totalPrice: pGoods.totalPrice,
      boughtBy: {
          name: req.member.name,
          bdnumber: req.member.bdnumber,
      },
      thisMonth: pGoods.thisMonth,
  });
//console.log(goods);

  await goods.save();

  // update balance

  const balance = await Balance.findOne({ thisMonth: pGoods.thisMonth });
  const prevBall = balance.totalBalance;
  const prevConst = balance.totalCost;

  const newBalance = await Balance.findOneAndUpdate(
      { thisMonth: pGoods.thisMonth },
      {
          totalBalance: prevBall - pGoods.totalPrice,
          totalCost: prevConst + pGoods.totalPrice,
      },
      { new: true }
  ); 
    res.json({
      message: "Pending goods is accepted",
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

const deleteGoods = async (req, res) => {
  try {
    const pGoods = await PendingGoods.findByIdAndDelete(req.body.id);
    //console.log(req.body.id);
    //console.log(pGoods);

    res.json({
      message: "pending Goods is deleted",
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
  getAllPendingDeposit,
  getAllPendingGoods,
  acceptGoods,
  acceptDeposit,
  deleteDeposit,
  deleteGoods,
};
