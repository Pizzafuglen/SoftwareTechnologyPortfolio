/*
The job of the PrimaryRouter is to ensure the that the different paths call the corresponding methods in the right
controllers, leading the user to the correct views they are requesting.
 */

const express = require('express');
const mysql = require('mysql2');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Chri42d5',
    database: 'mydb'
});

const {indexView} = require('../controllers/IndexController');
const {homeView} = require('../controllers/HomeController');

const{CreateDB} = require('../public/resources/DataGathering')
const{CreateStoreTable} = require('../public/resources/DataGathering')
const{CreateGameOfferTable} = require('../public/resources/DataGathering')
const{DropGameOfferTable} = require('../public/resources/DataGathering')
const{DropStoreTable} = require('../public/resources/DataGathering')
const{ShowTables} = require('../public/resources/DataGathering')
const{MigrateStoreTable} = require('../public/resources/DataGathering')
const{MigrateGameOfferTable} = require('../public/resources/DataGathering')

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

router.get('/dropTables', function (req, res) {
    res.redirect('back')
    DropStoreTable()
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
router.get('/migrateStoreTable', function (req, res){
    res.redirect('back')
    MigrateStoreTable()
})
router.get('/migrateGameOfferTable', function (req, res) {
    res.redirect('back')
    MigrateGameOfferTable()
})
router.get('/completeMigration', function (req, res) {
    res.redirect('back')
    CreateStoreTable()
    CreateGameOfferTable()
    MigrateStoreTable()
    MigrateGameOfferTable()
})

router.get('/getGameOfferTable', function (req, res){
    con.query("SELECT * FROM gameOfferTable", (err, data) => {
        res.send(data)
    })
})
router.get('/getShopTable', function (req, res){
    con.query("SELECT * FROM storeTable", (err, data) => {
        res.json(data)
    })
})

module.exports = router;