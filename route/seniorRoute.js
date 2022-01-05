// external dependency
const express = require('express');

// internal dependency
const { getSeniorPage, getAllMember, getAllPendingDeposit,getAllPendingGoods,acceptDeposit,deleteDeposit,acceptGoods,deleteGoods } = require('../controller/routeController/seniorController');
const { checkLogin } = require('../middleware/common/checkLogin');
const decorateHtml = require('../middleware/common/decorateHtml');

// Router
const router = express.Router();

const pageTitle = 'Room senior';

// load home page
router.get('/', decorateHtml(pageTitle), checkLogin, getSeniorPage);

router.get('/allMember',checkLogin, getAllMember);

router.get('/getAllPendingDeposit',checkLogin, getAllPendingDeposit);

router.get('/getAllPendingGoods',checkLogin, getAllPendingGoods);

router.delete('/acceptDeposit',checkLogin, acceptDeposit);

router.delete('/deleteDeposit',checkLogin, deleteDeposit);

router.delete('/acceptGoods',checkLogin, acceptGoods);

router.delete('/deleteGoods',checkLogin, deleteGoods);

module.exports = router;
