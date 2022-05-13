const express = require('express');
const router = express.Router();

const AddressesController = require('../app/controllers/AddressesController');

router.get('/getByCustomer/:id', AddressesController.getByCustomer);
module.exports = router;