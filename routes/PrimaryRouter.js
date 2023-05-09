const express = require('express');
const {indexView} = require('../controllers/IndexController');
const {homeView} = require('../controllers/HomeController');
const router = express.Router();

router.get('/index', indexView);
router.get('/',  homeView)
module.exports = router;