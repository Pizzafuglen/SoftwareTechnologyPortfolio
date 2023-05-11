const mysql = require('mysql2');
const string_decoder = require("string_decoder");
const {int32Read} = require("mysql/lib/protocol/Auth");

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Chri42d5',
    database: 'mydb'
});

/*
The method so far calls the database, to ensure that there is a connection established
 */
function ConnectToDB() {
    con.connect(function (err) {
        if (err) throw err;
        console.log('Connected!');
    });
}

function CreateDB() {
    con.connect(function (err) {
        if (err) throw err;
        con.query("CREATE DATABASE mydb", function (err, result) {
            if (err) throw err;
            console.log("Database created");
        });
    });
}

function CreateGameOfferTable() {
    con.connect(function (err) {
        if (err) throw err;
        const sql = 'CREATE TABLE gameOfferTable (gameName VARCHAR(255), storeID VARCHAR(255), dealPrice VARCHAR(255))';
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Table created");
        });
    });
}

function CreateStoreTable() {
    con.connect(function (err) {
        if (err) throw err;
        const sql = 'CREATE TABLE storeTable (storeID VARCHAR(255), storeName VARCHAR(255))';
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Table created");
        });
    });
}

function DropStoreTable() {
    con.connect(function (err) {
        if (err) throw err;
        const sql = 'DROP TABLE storeTable';
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Table deleted");
        });
    });
}

function DropGameOfferTable() {
    con.connect(function (err) {
        if (err) throw err;
        const sql = `DROP TABLE gameOfferTable`;
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Table deleted");
        });
    });
}

function ShowTables() {
    con.connect(function (err) {
        if (err) throw err;
        const sql = `SHOW TABLES`;
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result)
        });
    });
}

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
}

function MigrateGameOfferTable() {
    con.connect(async function (err) {
        if (err) throw err;

        const storeResponse = await fetch('https://www.cheapshark.com/api/1.0/games?id=396');
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
}

async function GetGameOfferData() {
    con.connect(function (err) {
        if (err) throw err;
        con.query("SELECT * FROM gameOfferTable", function (err, result, fields) {
            if (err) throw err;
            console.log(result);
        })
    });

}

/*
The method so far calls the API, and then posts the response to the log (right now it only post 'end')
 */
async function GetData() {
    const gameResponse = await fetch('https://www.cheapshark.com/api/1.0/games?id=612');
    const gameJson = await gameResponse.json();

    return gameJson['deals']
}

module.exports = {
    ConnectToDB,
    GetData,
    CreateDB,
    CreateGameOfferTable,
    DropStoreTable,
    DropGameOfferTable,
    CreateStoreTable,
    ShowTables,
    MigrateStoreTable,
    MigrateGameOfferTable
};