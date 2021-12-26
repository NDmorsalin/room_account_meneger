// external dependency
const { check, validationResult } = require('express-validator');

const loginValidatorFiled = [
    check('phone')
        .isLength({
            min: 1,
        })
        .withMessage('Mobile number or BD Number is required'),
    check('password').isStrongPassword().withMessage('Password Must Stronger '),
];

const loginValidatorErrors = (req, res, next) => {
    const errors = validationResult(req);

    const mapErrors = errors.mapped();

    if (Object.keys(mapErrors).length === 0) {
        next();
    } else {
        console.log(req.body);
        res.render('login', {
            data: req.body,
            errors: mapErrors,
        });
    }
};
module.exports = { loginValidatorFiled, loginValidatorErrors };
