import fetch from 'node-fetch';
import mysql from 'mysql';
function saveDataFromFetchCall() {


    // create a MySQL connection
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'AdminAdmin123',
        database: 'steamgames'
    });

    // load the node-fetch module asynchronously
    import('node-fetch')
        .then((module) => {
            const fetch = module.default;

            // fetch data from the API
            fetch('https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15')
                .then((response) => response.json())
                .then((data) => {

                    // insert the data into the MySQL database
                    const sql = 'INSERT INTO steamgames2 (title, savings, salePrice, normalPrice) VALUES ?';
                    const values = data.map((game) => [game.title, game.savings, game.salePrice, game.normalPrice]);

                    connection.query(sql, [values], (error, results) => {
                        if (error) {
                            console.error(error);
                        } else {
                            console.log('Data inserted successfully');
                        }

                        // close the MySQL connection
                        connection.end();
                    });
                })
                .catch((error) => console.error(error));
        })
        .catch((error) => console.error(error));
}

saveDataFromFetchCall();