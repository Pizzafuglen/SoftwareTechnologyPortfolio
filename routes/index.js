const express = require('express');
const {indexView} = require('../controllers/indexController');
const {homeView} = require('../controllers/homeController');
const router = express.Router();
router.get('/index', indexView);
router.get('/',  homeView)
module.exports = router;