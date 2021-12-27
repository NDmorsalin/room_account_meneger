/* eslint-disable comma-dangle */
// external dependency
const express = require('express');

// internal dependency
const { getSignupPage, addMember } = require('../controller/routeController/singupController');
const {
    signupFieldValidator,
    signupValidatorError,
} = require('../middleware/signup/signupValidator');

const decorateHtml = require('../middleware/common/decorateHtml');
const setRoll = require('../middleware/common/setRoll');
// Router
const router = express.Router();

const pageTitle = ' Signup page ';

// load signup page
router.get('/', decorateHtml(pageTitle), getSignupPage);

router.post(
    '/',
    decorateHtml(pageTitle),
    signupFieldValidator,
    signupValidatorError,
    setRoll,
    addMember
);
// export module

module.exports = router;
