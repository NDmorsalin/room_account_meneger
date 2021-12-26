// external dependency
const express = require('express');

// internal dependency
const {
    getHomePage,
    getAllMember,
    billDeposit,
    buyGoods,
} = require('../controller/routeController/homeController');
const { checkLogin } = require('../middleware/common/checkLogin');
const decorateHtml = require('../middleware/common/decorateHtml');

// Router
const router = express.Router();

const pageTitle = ' home Page';

// load home page
router.get('/', decorateHtml(pageTitle), checkLogin, getHomePage);

router.get('/allMember', checkLogin, getAllMember);

router.post('/billDeposit', checkLogin, billDeposit);

router.post('/buyGoods', checkLogin, buyGoods);

module.exports = router;
