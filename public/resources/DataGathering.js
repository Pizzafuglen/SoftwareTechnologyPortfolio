function ConnectToDB() {
    const mysql = require('mysql2');

    const con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "Chri42d5"
    });

    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
    });
}
async function GetData() {
    const response = await fetch("https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15");
    const jsonData = await response.json();
    console.log(jsonData);
}


module.exports = {
    ConnectToDB,
    GetData
};