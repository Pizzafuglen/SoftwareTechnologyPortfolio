const mysql = require("mysql");
const fetch = require("node-fetch");


function getSteamDeals(){

    const fetch = require('node-fetch');
    const mysql = require('mysql');

// create a connection to the MySQL database
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'AdminAdmin123',
        database: 'steamgames'

    });
    const clearSQL = 'TRUNCATE steamgames2'

    connection.query(clearSQL)
// fetch data from the API
    fetch('https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15')
        .then(response => response.json())
        .then(data => {
            // insert the data into the MySQL database
            data.forEach(item => {
                const sql = `INSERT INTO steamgames2 (title, salePrice, normalPrice, savings) VALUES (?, ?, ?, ?)`;
                const values = [item.title, item.salePrice, item.normalPrice, item.savings];
                connection.query(sql, values, (error, results, fields) => {
                    if (error) throw error;
                    console.log(`Inserted ${results.affectedRows} row(s)`);
                });
            });
        })
        .catch(error => console.error(error))
        .finally(() => {
            // close the MySQL connection when done
            connection.end();
        });
}

