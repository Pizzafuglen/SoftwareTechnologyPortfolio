/*
The job of the PrimaryRouter is to ensure the that the different paths call the corresponding methods in the right
controllers, leading the user to the correct views they are requesting.
 */

const express = require('express');
const {indexView} = require('../controllers/IndexController');
const {homeView} = require('../controllers/HomeController');
const router = express.Router();

router.get('/index', indexView);
router.get('/home',  homeView)
module.exports = router;