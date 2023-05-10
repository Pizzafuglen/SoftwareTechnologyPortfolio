async function loadData() {
    const mysql = require('mysql2/promise');

    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'AdminAdmin123',
        database: 'steamgames'
    });

    const [rows, fields] = await connection.execute('SELECT * FROM steamgames2');

    const data = Object.values(rows[0]);

    xlabels_titles.push(data[0]); // Assuming the first column contains the x-axis labels
    dataSavings.push(data[1]); // Assuming the second column contains the data values

    await connection.end();
}