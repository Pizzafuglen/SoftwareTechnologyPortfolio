/*
This is the main .js file, and from where the server is started
 */
const express = require('express'); //Import the express dependency
const app = express();              //Instantiate an express app, the main work horse of this server
const port = 5001;                  //Save the port number where your server will be listening

app.use('/', require('./routes/PrimaryRouter.js'))
app.set('view engine', 'ejs');

app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port ${port}`);
});

/*
Hereunder we call the ConnectToDB method to ensure we have a connection established with mysql
 */
const {ConnectToDB} = require('./public/resources/DataGathering')
ConnectToDB();