// Enable ESM syntax in a CommonJS module
//require = require('esm')(module);


//const express = require('express'); //Import the express dependency

const express = require('express'); //import the express dependency

const app = express();              //Instantiate an express app, the main work horse of this server
const port = 5001;                  //Save the port number where your server will be listening

app.use('/', require('./routes/PrimaryRouter.js'))
app.set('view engine', 'ejs');

app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port ${port}`);
});









//database connection
//var mysql2 = require('mysql');


/*
var con = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "AdminAdmin123",
    databases: "steamgames"
});


 */

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












/*
fetch('https://www.cheapshark.com/api/1.0/deals?storeID=1&sortBy=savings&upperPrice=15')
    .then(res => res.json())
    .then(data => {
        const insertData = (deal) => {
            const sql = 'INSERT INTO deals (title, salePrice, normalPrice, savings) VALUES (?, ?, ?, ?)';
            const values = [deal.title, deal.salePrice, deal.normalPrice, deal.savings];
            connection.query(sql, values, (err, result) => {
                if (err) {
                    console.error('Error inserting data into MySQL:', err);
                    return;
                }
                console.log(`Inserted ${result.affectedRows} row(s)`);
            });
        };

        data.forEach(deal => insertData(deal));
    })
    .catch(err => {
        console.error('Error fetching data from API:', err);
    });


 */

