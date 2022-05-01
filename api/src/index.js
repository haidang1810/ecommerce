const express = require('express');
const app = express();
const server = require("http").Server(app);
const dotenv = require('dotenv').config();
const port = process.env.PORT || 3000
const cookieParser = require('cookie-parser');
const route = require('./routes');
const cors = require('cors');
app.use(express.urlencoded());
app.use(express.json());
app.use(cookieParser());
var corsOptions = {
	origin: true,
	credentials:  true
}
app.use(cors(corsOptions));


route(app);

server.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
