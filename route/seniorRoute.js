// external dependency
const express = require('express');

// internal dependency
const { getSeniorPage, getAllMember } = require('../controller/routeController/seniorController');
const { checkLogin } = require('../middleware/common/checkLogin');
const decorateHtml = require('../middleware/common/decorateHtml');

// Router
const router = express.Router();

const pageTitle = ' home Page';

// load home page
router.get('/', decorateHtml(pageTitle), checkLogin, getSeniorPage);

router.get('/allMember', getAllMember);

module.exports = router;
