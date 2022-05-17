const express = require('express');
const router = express.Router();
const UsersController = require('../app/controllers/UsersController');

router.post('/add', UsersController.add);
router.get('/getVerifyCode/:phone', UsersController.getVerifyCode);
module.exports = router;