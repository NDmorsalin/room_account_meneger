// external dependency
const express = require('express');

// internal dependency
const { login, getLoginPage, logOut } = require('../controller/routeController/loginController');
const { loginValidatorFiled, loginValidatorErrors } = require('../middleware/login/loginValidator');
const decorateHtml = require('../middleware/common/decorateHtml');
const { redirectLogIn } = require('../middleware/common/checkLogin');
// Router

const router = express.Router();

const pageTitle = ' Login page ';

// load signup page
router.get('/', decorateHtml(pageTitle), redirectLogIn, getLoginPage);

router.post('/', decorateHtml(pageTitle), loginValidatorFiled, loginValidatorErrors, login);

router.delete('/', logOut);
// export module

module.exports = router; // external dependency
