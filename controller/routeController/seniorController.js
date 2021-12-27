/* eslint-disable comma-dangle */
// external dependency
// internal dependency
const Member = require('../../model/member');

// load the home page
const getSeniorPage = (req, res) => {
    res.render('senior');
};

// get all member from db
const getAllMember = async (req, res) => {
    try {
        const allMember = await Member.find({}, { password: 0 }).sort('bdnumber');

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
module.exports = {
    getSeniorPage,
    getAllMember,
};
