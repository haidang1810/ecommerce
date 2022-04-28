const mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost:8080',
    user     : 'root',
    password : '',
    database : 'db_cua_hang'
});
connection.connect(function(err) {
    if (err) throw err;
    console.log("Database connected!");
});

module.exports = connection;