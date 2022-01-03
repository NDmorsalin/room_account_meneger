// external dependency
const express = require('express');

// internal dependency
const { getSeniorPage, getAllMember,getAllPendingDeposit } = require('../controller/routeController/seniorController');
const { checkLogin } = require('../middleware/common/checkLogin');
const decorateHtml = require('../middleware/common/decorateHtml');

// Router
const router = express.Router();

const pageTitle = 'Room senior';

// load home page
router.get('/', decorateHtml(pageTitle), checkLogin, getSeniorPage);

router.get('/allMember', getAllMember);

router.get('/getAllPendingDeposit', getAllPendingDeposit);

module.exports = router;
