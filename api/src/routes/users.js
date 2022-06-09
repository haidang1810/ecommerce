const express = require('express');
const router = express.Router();
const checkLogin = require('../app/middleware/checkLogin');
const UsersController = require('../app/controllers/UsersController');

router.post('/add', UsersController.add);
router.get('/getVerifyCode/:phone', UsersController.getVerifyCode);
router.post('/changePassword/', checkLogin, UsersController.changePassword);
router.post('/forgotPassword/', UsersController.forgotPassword);
module.exports = router;