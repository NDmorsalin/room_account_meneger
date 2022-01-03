/* eslint-disable comma-dangle */
// external dependency

// internal dependency
const Member = require('../../model/member');

const setRoll = async (req, res, next) => {
    try {
        const members = await Member.find({}, { password: 0 });
        const bdNumber = parseInt(req.body.bdnumber);
        const bdArr = [];
        if (bdNumber) {
            bdArr.push(bdNumber);
        }

        members.forEach((member) => {
            if (member && member.bdnumber) {
                bdArr.push(member.bdnumber);
            }
        });
        const bdSenior = Math.min(...bdArr);

        if (bdSenior === bdNumber) {
            const updateMwmber = await Member.updateMany(
                {},
                {
                    $set: {
                        roll: 'member',
                    },
                }
            );
            req.member = { roll: 'senior' };
            //console.log(updateMwmber);
        } else {
            req.member = { roll: 'member' };
        }
        //console.log(bdSenior, bdArr, req.member.roll);
        next();
    } catch (err) {
        console.log(err.message);
        next();
    }
};

module.exports = setRoll;
