/*
The job of the DataGathering is to ensure the corresponding methods for the URL calls
 */
const mysql = require('mysql2');
const con = mysql.createConnection({
    host: 'localhost',
    user: '***',
    password: '***',
    database: 'mydb'
}); // Creating a connection object to used when accessing the database (you need to have created the specific database in order to use this
function ConnectToDB() {
    con.connect(function (err) {
        if (err) throw err;
        console.log('Connected!');
    });
} // This method is responsible for testing the connection to mysql
function CreateDB() {
    const con = mysql.createConnection({
        host: 'localhost',
        user: '***',
        password: '***'
    });

    con.connect(function (err) {
        if (err) throw err;
        con.query("CREATE DATABASE mydb", function (err, result) {
            if (err) throw err;
            console.log("Database created");
        });
    });
} // This method is responsible for creating a database, with a specific name (in this case mydb)

function CreateGameOfferTable() {
    con.connect(function (err) {
        if (err) throw err;
        const sql = 'CREATE TABLE gameOfferTable (gameName VARCHAR(255), storeID VARCHAR(255), dealPrice VARCHAR(255))';
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Table created");
        });
    });
} // This method is responsible for creating the gameOfferTable table

function CreateStoreTable() {
    con.connect(function (err) {
        if (err) throw err;
        const sql = 'CREATE TABLE storeTable (storeID VARCHAR(255), storeName VARCHAR(255))';
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Table created");
        });
    });
} // This method is responsible for creating the storeTable table

function DropStoreTable() {
    con.connect(function (err) {
        if (err) throw err;
        const sql = 'DROP TABLE storeTable';
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Table deleted");
        });
    });
} // This method is responsible for dropping the storeTable table

function DropGameOfferTable() {
    con.connect(function (err) {
        if (err) throw err;
        const sql = `DROP TABLE gameOfferTable`;
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Table deleted");
        });
    });
} // This method is responsible for dropping the gameOfferTable table

function ShowTables() {
    con.connect(function (err) {
        if (err) throw err;
        const sql = `SHOW TABLES`;
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result)
        });
    });
} // This method is responsible for showing the tables currently in the database

function MigrateStoreTable() {
    con.connect(async function (err) {
        if (err) throw err;

        const storeResponse = await fetch('https://www.cheapshark.com/api/1.0/stores');
        const storeJson = await storeResponse.json();

        let counter = 0;

        for (const item of storeJson) {
            const storeIDInput = item['storeID']
            const storeNameInput = item['storeName']

            counter += 1;

            const sql = `INSERT INTO storeTable (storeID, storeName) VALUES ('${storeIDInput}', '${storeNameInput}')`;
            con.query(sql, function (err, result) {
                if (err) throw err;
            });
        }

        console.log("Inserted: " + counter + " records into storeTable")
    });
} // This method is responsible for migrating data from the API call to the storeTable

function MigrateGameOfferTable() {
    con.connect(async function (err) {
        if (err) throw err;

        const storeResponse = await fetch('https://www.cheapshark.com/api/1.0/games?id=612');
        const storeJson = await storeResponse.json();

        let counter = 0;

        for (const item of storeJson['deals']) {
            const storeIDInput = item['storeID']
            const dealPriceInput = item['price']
            const gameName = storeJson['info']['title']

            counter += 1;

            const sql = `INSERT INTO gameOfferTable (gameName, storeID, dealPrice) VALUES ('${gameName}', '${storeIDInput}','${dealPriceInput}')`;
            con.query(sql, function (err, result) {
                if (err) throw err;

            });
        }

        console.log("Inserted: " + counter + " records into gameOfferTable")
    });
}// This method is responsible for migrating data from the API call to the gameOfferTable

module.exports = {
    ConnectToDB,
    CreateDB,
    CreateGameOfferTable,
    DropStoreTable,
    DropGameOfferTable,
    CreateStoreTable,
    ShowTables,
    MigrateStoreTable,
    MigrateGameOfferTable
}; // Here we export all the above methods