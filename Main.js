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
var mysql2 = require('mysql');

var con = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "AdminAdmin123",
    databases: "steamgames"
});

//checking if connection is completed
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");

    fetch('https://www.cheapshark.com/api/1.0/deals?storeID=1&sortBy=savings&upperPrice=15')


        .then(res => res.json())
        //.then(data => console.log(data))
        .then(data => {
            const insertData = (deal) => {
                const sql = 'INSERT INTO deals (title, salePrice, normalPrice, savings) VALUES (?, ?, ?, ?)';
                const values = [deal.title, deal.salePrice, deal.normalPrice, deal.savings];
                con.query(sql, values, (err, result) => {
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

