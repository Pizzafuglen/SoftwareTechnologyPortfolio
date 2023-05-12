/*
The job of the PrimaryRouter is to ensure the that the different paths call the corresponding methods in the right
controllers, leading the user to the correct views/data they are requesting
 */

const express = require('express'); // Including the express module in order to make the server that will host the URLs
const mysql = require('mysql2'); // Including the mysql module for accessing the database

const con = mysql.createConnection({
    host: 'localhost',
    user: '***',
    password: '***',
    database: 'mydb'
}); // Creating a connection object to used when accessing the database (you need to have created the specific database in order to use this

/*
Hereunder are the routing for the two views provided in the /controllers folder
 */
const {indexView} = require('../controllers/IndexController');
const {homeView} = require('../controllers/HomeController');

/*
The inclusions hereunder all serve the purpose of making available the methods of the DataGathering.js file
 */
const{CreateDB} = require('../public/resources/DataGathering')
const{CreateStoreTable} = require('../public/resources/DataGathering')
const{CreateGameOfferTable} = require('../public/resources/DataGathering')
const{DropGameOfferTable} = require('../public/resources/DataGathering')
const{DropStoreTable} = require('../public/resources/DataGathering')
const{ShowTables} = require('../public/resources/DataGathering')
const{MigrateStoreTable} = require('../public/resources/DataGathering')
const{MigrateGameOfferTable} = require('../public/resources/DataGathering')

const router = express.Router(); // Creating a router object to use when responding to the URL requests send by the user

/*
Hereunder follow the actual routing for the two views provided. The router object is responsible for returning the views, when the appropriate URL is accessed
 */
router.get('/index', indexView);
router.get('/home', homeView);

router.get('/createStoreTable', function (req, res){
    res.redirect('back')
    CreateStoreTable()
}) // This URL is responsible for redirecting back to the current page, before calling the CreateStoreTable method in the DataGathering.js file
router.get('/createGameOfferTable', function (req, res){
    res.redirect('back')
    CreateGameOfferTable()
}) // This URL is responsible for redirecting back to the current page, before calling the CreateGameOfferTable method in the DataGathering.js file
router.get('/dropStoreTable', function (req, res) {
    res.redirect('back')
    DropStoreTable()
}) // This URL is responsible for redirecting back to the current page, before calling the DropStoreTable method in the DataGathering.js file
router.get('/dropGameOfferTable', function (req, res) {
    res.redirect('back')
    DropGameOfferTable()
}) // This URL is responsible for redirecting back to the current page, before calling the CreateGameOfferTable method in the DataGathering.js file
router.get('/dropTables', function (req, res) {
    res.redirect('back')
    DropStoreTable()
    DropGameOfferTable()
}) // This URL is responsible for redirecting back to the current page, before calling both the DropStoreTable and the DropGameOfferTable methods in the DataGathering.js file
router.get('/createDB', function (req, res){
    res.redirect('back')
    CreateDB()
})// This URL is responsible for redirecting back to the current page, before calling the CreateDB method in the DataGathering.js file
router.get('/showTables', function (req, res){
    res.redirect('back')
    ShowTables()
})// This URL is responsible for redirecting back to the current page, before calling the ShowTables method in the DataGathering.js file
router.get('/migrateStoreTable', function (req, res){
    res.redirect('back')
    MigrateStoreTable()
})// This URL is responsible for redirecting back to the current page, before calling the MigrateStoreTable method in the DataGathering.js file
router.get('/migrateGameOfferTable', function (req, res) {
    res.redirect('back')
    MigrateGameOfferTable()
})// This URL is responsible for redirecting back to the current page, before calling the MigrateGameOfferTable method in the DataGathering.js file
router.get('/completeMigration', function (req, res) {
    res.redirect('back')
    CreateStoreTable()
    CreateGameOfferTable()
    MigrateStoreTable()
    MigrateGameOfferTable()
})// This URL is responsible for redirecting back to the current page, before calling the CreateStoreTable, CreateGameOfferTable, MigrateStoreTable, and MigrateGameOfferTable methods in the DataGathering.js file

router.get('/getGameOfferTable', function (req, res){
    con.query("SELECT * FROM gameOfferTable", (err, data) => {
        res.send(data)
    })
})// This URL is responsible for sending the query response (selecting everything from the gameOfferTable) back as the response to the GET request
router.get('/getShopTable', function (req, res){
    con.query("SELECT * FROM storeTable", (err, data) => {
        res.json(data)
    })
})// This URL is responsible for sending the query response (selecting everything from the storeTable) back as the response to the GET request

module.exports = router;// Here we export the router as an object