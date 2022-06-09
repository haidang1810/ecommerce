const mysql = require('mysql2');
const pool = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'db_cua_hang',
    connectionLimit: 10,
	dateStrings: true
});


module.exports = pool;