/* eslint-disable no-underscore-dangle */
// external dependency
const createErrors = require('http-errors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// internal dependency
const Member = require('../../model/member');

const getLoginPage = (req, res) => {
    res.render('login');
};

const login = async (req, res) => {
    try {
        const member = await Member.findOne({
            $or: [{ bdnumber: req.body.phone }, { phone: req.body.phone }],
        });
        if (member && member._id) {
            const isValidPassword = await bcrypt.compare(req.body.password, member.password);

            if (isValidPassword) {
                const memberData = {
                    bdnumber: parseInt( member.bdnumber),
                    rank: member.rank,
                    name: member.name,
                    phone: member.phone,
                    section: member.section,
                    roll: member.roll,
                };

                const token = jwt.sign(memberData, process.env.JWT_SECRET, { expiresIn: process.env.COOKIE_EXPIRE });
                res.cookie(process.env.COOKIE_NAME, token, {
                    expires: new Date(Date.now() + process.env.COOKIE_EXPIRE),
                    httpOnly: true,
                    signed: true,
                });

                res.redirect('/');
            } else {
                throw createErrors(401, 'Authorization failed');
            }
        } else {
            throw createErrors(401, 'Authorization failed');
        }
    } catch (err) {
        res.render('login', {
            data: req.body,
            errors: {
                common: {
                    msg: err.message,
                },
            },
        });
    }
};

const logOut = (req, res) => {
    res.clearCookie(process.env.COOKIE_NAME);
    res.send('logged out');
};

module.exports = { getLoginPage, login, logOut };
