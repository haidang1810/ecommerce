const express = require('express')
const app = express()
const dotenv = require('dotenv').config();
const port = process.env.PORT || 3000

const route = require('./routes');


route(app);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
