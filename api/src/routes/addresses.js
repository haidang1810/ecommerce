const express = require('express');
const router = express.Router();
const checkLogin = require('../app/middleware/checkLogin');
const AddressesController = require('../app/controllers/AddressesController');

router.get('/getByCustomer/:id', AddressesController.getByCustomer);
router.post('/updateByCustomer/', checkLogin, AddressesController.updateByCustomer);

module.exports = router;