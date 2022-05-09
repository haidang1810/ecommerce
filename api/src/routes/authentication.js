const express = require('express');
const router = express.Router();

const authController = require('../app/controllers/AuthController');

router.post('/login', authController.login);
router.get('/refreshToken', authController.refreshToken);
router.get('/checkLogin', authController.checkLogin);
router.get('/logout', authController.logout);

module.exports = router;