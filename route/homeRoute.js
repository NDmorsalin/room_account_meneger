// external dependency
const express = require('express');

// internal dependency
const {
    getHomePage,
    getAllMember,
    //billDeposit,
    pendingBillDeposit,
    //buyGoods,
    pendingBuyGoods,
} = require('../controller/routeController/homeController');
const { checkLogin } = require('../middleware/common/checkLogin');
const decorateHtml = require('../middleware/common/decorateHtml');

// Router
const router = express.Router();

const pageTitle = 'Home ';

// load home page
router.get('/', decorateHtml(pageTitle), checkLogin, getHomePage);

router.get('/allMember', checkLogin, getAllMember);
/* 
router.post('/billDeposit', checkLogin, billDeposit); */

router.post('/pendingBillDeposit', checkLogin, pendingBillDeposit);
/* 
router.post('/buyGoods', checkLogin, buyGoods); */
router.post('/pendingBuyGoods', checkLogin, pendingBuyGoods);

module.exports = router;
