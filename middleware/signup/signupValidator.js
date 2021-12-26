// external dependency
const { check, validationResult } = require('express-validator');
const creatErrors = require('http-errors');

// internal dependency
const Member = require('../../model/member');

const signupFieldValidator = [
    check('bdnumber')
        .isLength({ min: 6 })
        .withMessage('BD Number is not less then 6 digit')
        .isNumeric()
        .withMessage('BD Number is only contain number')
        .custom(async (value) => {
            const member = await Member.findOne({ bdnumber: value });

            if (member && member.bdnumber) {
                throw creatErrors('BD Number is already used');
            } else {
                return true;
            }
        }),
    check('rank').isAlpha().trim().withMessage('Rank is Only Alphabet'),
    check('name').isAlpha('en-US', { ignore: ' -' }).trim().withMessage('Name is Only Alphabet'),
    check('phone')
        .isMobilePhone('bn-BD')
        .withMessage('Only Bangladeshi Mobile Number')
        .custom(async (value) => {
            const member = await Member.findOne({
                phone: value,
            });
            if (member && member.phone) {
                throw creatErrors('Mobile Number is already used');
            } else {
                return true;
            }
        }),
    check('section')
        .isAlpha('en-US', { ignore: ' -' })
        .trim()
        .withMessage('Section is Only Alphabet'),
    check('password').isStrongPassword().withMessage('Password Must Stronger '),
    check('cPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw creatErrors('Password confirmation does not match password');
        } else {
            return true;
        }
    }),
];

const signupValidatorError = async (req, res, next) => {
    const errors = validationResult(req);

    const mapErr = errors.mapped();
    if (Object.keys(mapErr).length === 0) {
        next();
    } else if (res.locals.html) {
        res.render('signup', {
            errors: mapErr,
            data: req.body,
        });
    } else {
        res.status(500).json({
            errors: mapErr,
        });
    }
};

module.exports = { signupFieldValidator, signupValidatorError };
