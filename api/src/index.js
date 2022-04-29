const express = require('express');
const app = express();
const server = require("http").Server(app);
const dotenv = require('dotenv').config();
const port = process.env.PORT || 3000

const route = require('./routes');
app.use(express.urlencoded());
app.use(express.json());


route(app);

server.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
