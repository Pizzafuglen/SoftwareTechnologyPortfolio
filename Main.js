const express = require('express'); //Import the express dependency
const app = express();              //Instantiate an express app, the main work horse of this server
const port = 5001;                  //Save the port number where your server will be listening

app.use('/', require('./routes/PrimaryRouter.js'))
app.set('view engine', 'ejs');

app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port ${port}`);
});

/*
//database connection
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "AdminAdmin123"
});

//checking if connection is completed
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});
 */