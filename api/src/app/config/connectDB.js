const mysql = require('mysql');
const pool = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'db_cua_hang',
    connectionLimit: 10
});


module.exports = pool;