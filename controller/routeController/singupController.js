// external dependency 12345aA#
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// internal dependency
const Member = require('../../model/member');

const getSignupPage = (req, res) => {
    res.render('signup');
};
const addMember = async (req, res) => {
    // console.log(res.locals.html);

    try {
        const memberData = {
            bdnumber:parseInt( req.body.bdnumber),
            rank: req.body.rank,
            name: req.body.name,
            phone: req.body.phone,
            section: req.body.section,
            roll: req.member.roll,
        };
        const hashPassword = await bcrypt.hash(req.body.password, 10);

        const newMember = await new Member({ ...memberData, password: hashPassword });

        await newMember.save();

        // after save in db creat cookie and token
        
        const token = jwt.sign(memberData, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.cookie(process.env.COOKIE_NAME, token, {
            expires: new Date(Date.now() + 24 * 3600000),
            httpOnly: true,
            signed: true,
        });
        res.redirect('/');
    } catch (err) {
        if (res.locals.html) {
            res.render('signup', {
                errors: {
                    common: {
                        msg: err.message,
                    },
                },
                data: req.body,
            });
        } else {
            res.json({
                errors: {
                    common: {
                        msg: err.message,
                    },
                },
            });
        }
    }
};

module.exports = {
    getSignupPage,
    addMember,
};
