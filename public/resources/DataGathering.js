const mysql = require('mysql2');
const {login} = require("passport/lib/http/request");

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Chri42d5'
});

const tableName = 'gameOffers'


/*
The method so far calls the database, to ensure that there is a connection established
 */
function ConnectToDB() {
    con.connect(function(err) {
        if (err) throw err;
        console.log('Connected!');
    });
}
function CreateDB() {
    con.connect(function(err) {
        if (err) throw err;
        con.query("CREATE DATABASE mydb", function (err, result) {
            if (err) throw err;
            console.log("Database created");
        });
    });
}
function CreateGameOfferTable() {
    const con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Chri42d5',
        database: 'mydb'
    });

    con.connect(function(err) {
        if (err) throw err;
        const sql = 'CREATE TABLE gameOfferTable (name VARCHAR(255), address VARCHAR(255))';
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Table created");
        });
    });
}

function CreateStoreTable() {
    const con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Chri42d5',
        database: 'mydb'
    });

    con.connect(function(err) {
        if (err) throw err;
        const sql = 'CREATE TABLE storeTable (name VARCHAR(255), address VARCHAR(255))';
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Table created");
        });
    });
}

function DropStoreTable() {
    const con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Chri42d5',
        database: 'mydb'
    });

    con.connect(function(err) {
        if (err) throw err;
        const sql = 'DROP TABLE storeTable';
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Table deleted");
        });
    });
}
function DropGameOfferTable() {
    const con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Chri42d5',
        database: 'mydb'
    });

    con.connect(function(err) {
        if (err) throw err;
        const sql = `DROP TABLE gameOfferTable`;
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Table deleted");
        });
    });
}
function ShowTables() {
    const con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Chri42d5',
        database: 'mydb'
    });

    con.connect(function(err) {
        if (err) throw err;
        const sql = `SHOW TABLES`;
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result)
        });
    });
}

function MigrateStoreTable() {

}
function MigrateGameOfferTable() {

}

/*
The method so far calls the API, and then posts the response to the log (right now it only post 'end')
 */
async function GetData() {
    const response = await fetch('https://www.cheapshark.com/api/1.0/games?id=612');
    const jsonData = await response.json();

    const dealsParsed = jsonData['deals'];
    for (const item of dealsParsed) {
        console.log(item['price'])
    }
}

module.exports = {
    ConnectToDB,
    GetData,
    CreateDB,
    CreateGameOfferTable,
    DropStoreTable,
    DropGameOfferTable,
    CreateStoreTable,
    ShowTables
};