const express = require('express');
const router = express.Router();

const addressesController = require('../app/controllers/AddressesController');

router.get('/getByCustomer/:id', addressesController.getByCustomer);
module.exports = router;