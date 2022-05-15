const express = require('express');
const app = express();
const server = require("http").Server(app);
const dotenv = require('dotenv').config();
const port = process.env.PORT || 3000
const cookieParser = require('cookie-parser');
const route = require('./routes');
const cors = require('cors');
const db = require('./app/config/mongooseDB');
const fileUpload = require('express-fileupload');

db.connect();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
var corsOptions = {
	origin: true,
	credentials:  true
}
app.use(cors(corsOptions));
app.use(fileUpload({
	limits: { fileSize: 4 * 1024 * 1024 },
	useTempFiles: true
}))

route(app);

server.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
