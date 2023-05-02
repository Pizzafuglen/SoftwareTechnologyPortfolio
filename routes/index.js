//js
const express = require('express');
const {indexView} = require('../controllers/indexController.js');
const router = express.Router();
router.get('../index', indexView);
module.exports = router;