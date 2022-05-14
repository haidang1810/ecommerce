const express = require('express');
const router = express.Router();

const customersController = require('../app/controllers/CustomersController');

router.get('/getByAccount/:user', customersController.getByAccount);
router.get('/getVerifyCode/:phone', customersController.getVerifyCode);
router.post('/changPhone/', customersController.changPhone);
router.post('/changGmail/', customersController.changGmail);
router.post('/changAvatar/', customersController.changAvatar);

module.exports = router;
