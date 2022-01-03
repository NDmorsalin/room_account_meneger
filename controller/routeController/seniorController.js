/* eslint-disable comma-dangle */
// external dependency
// internal dependency
const Member = require('../../model/member');
const {PendingDeposit, PendingBalance} = require('../../model/pendingAccount');

// load the home page
const getSeniorPage = (req, res) => {
    //console.log('senior page');
    res.render('senior');
};

// get all member from db
const getAllMember = async (req, res) => {
    console.log(req);
    try {
        const allMember = await Member.find({}, { password: 0 }).sort('bdnumber');
        console.log(allMember);
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

        console.log(allPendingDeposit);
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

module.exports = {
    getSeniorPage,
    getAllMember,
    getAllPendingDeposit,
};
