const express = require('express'); //Import the express dependency
const app = express();              //Instantiate an express app, the main work horse of this server
const port = 5001;                  //Save the port number where your server will be listening

app.use('/', require('./routes/PrimaryRouter.js'))
app.set('view engine', 'ejs');

app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port ${port}`);
});

const {ConnectToDB} = require('./public/resources/DataGathering')
const {GetData} = require('./public/resources/DataGathering')

ConnectToDB();
GetData();


/*
//database connection
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "AdminAdmin123",
    databases: "steamgames"
});

//checking if connection is completed
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});


const fetch = require('node-fetch');

async function saveDataFromFetchCall(){

    // make a fetch call for data
    const response = await fetch ('https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15')
    const data = await response.json();

    //establish a connection to mySQL database

    const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "AdminAdmin123",
        databases: "steamgames"
    });

    //define the SQL query o insert data:

    const query = 'INSERT INTO steamgames2 (title, savings, salePrice, normalPrice) VALUES (?, ?, ?, ?)';

    for (const game of data) {
        const values = [game.title, game.savings, game.salePrice, game.normalPrice];
        await connection.execute(query,values);
    }

    connection.end();
}

saveDataFromFetchCall();


//This works:


fetch('https://www.cheapshark.com/api/1.0/deals?storeID=1&sortBy=savings&upperPrice=15')


    .then(res => res.json())
    .then(data => console.log(data))


 */