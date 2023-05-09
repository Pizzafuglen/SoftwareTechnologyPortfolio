/*
The method so far calls the database, to ensure that there is a connection established
 */
function ConnectToDB() {
    const mysql = require('mysql2');

    const con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '***'
    });

    con.connect(function(err) {
        if (err) throw err;
        console.log('Connected!');
    });
}
/*
The method so far calls the API, and then posts the response to the log (right now it only post 'end')
 */
async function GetData() {
    const response = await fetch('https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15');
    const jsonData = await response.json();

    console.log(jsonData[1]['title']);
}

module.exports = {
    ConnectToDB,
    GetData
};