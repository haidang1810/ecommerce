const express = require('express');
const router = express.Router();

const customersController = require('../app/controllers/CustomersController');

router.get('/getByAccount/:user', customersController.getByAccount);
module.exports = router;