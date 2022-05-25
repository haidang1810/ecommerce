const mysqlAwait = require('mysql2/promise');
const poolAwait = mysqlAwait.createPool({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'db_cua_hang',
	connectionLimit: 10,
	dateStrings: true
});
module.exports =  poolAwait;