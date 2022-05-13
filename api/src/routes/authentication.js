const express = require('express');
const router = express.Router();

const AuthController = require('../app/controllers/AuthController');

router.post('/login', AuthController.login);
router.get('/refreshToken', AuthController.refreshToken);
router.get('/checkLogin', AuthController.checkLogin);
router.get('/logout', AuthController.logout);

module.exports = router;