const mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'db_cua_hang'
});
connection.connect(function(err) {
    if (err) throw err;
    console.log("Database connected!");
});

module.exports = connection;