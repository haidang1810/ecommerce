const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;
require('winston-daily-rotate-file');
const formatLog = printf(({ level, message, timestamp }) => {
	return `${timestamp} ${level}: ${message}`;
});
let transportApi = new (transports.DailyRotateFile)({
	filename: '../../log/log-date-%DATE%.log',
	datePattern: 'YYYY-MM-DD'
});
let createLog = createLogger({
	format: combine(
		timestamp(),
		formatLog
	),
	transports: [
		transportApi
	]
});

module.exports = createLog;