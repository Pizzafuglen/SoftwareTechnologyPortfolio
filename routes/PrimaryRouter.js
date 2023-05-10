/*
The job of the PrimaryRouter is to ensure the that the different paths call the corresponding methods in the right
controllers, leading the user to the correct views they are requesting.
 */

const express = require('express');

const {indexView} = require('../controllers/IndexController');
const {homeView} = require('../controllers/HomeController');

const{CreateDB} = require('../public/resources/DataGathering')
const{CreateStoreTable} = require('../public/resources/DataGathering')
const{CreateGameOfferTable} = require('../public/resources/DataGathering')
const{DropGameOfferTable} = require('../public/resources/DataGathering')
const{DropStoreTable} = require('../public/resources/DataGathering')
const{ShowTables} = require('../public/resources/DataGathering')


const router = express.Router();

router.get('/index', indexView);
router.get('/home', homeView);
router.get('/createStoreTable', function (req, res){
    res.redirect('back')
    CreateStoreTable()
})
router.get('/createGameOfferTable', function (req, res){
    res.redirect('back')
    CreateGameOfferTable()
})
router.get('/dropStoreTable', function (req, res) {
    res.redirect('back')
    DropStoreTable()
})
router.get('/dropGameOfferTable', function (req, res) {
    res.redirect('back')
    DropGameOfferTable()
})
router.get('/createDB', function (req, res){
    res.redirect('back')
    CreateDB()
})
router.get('/showTables', function (req, res){
    res.redirect('back')
    ShowTables()
})

module.exports = router;