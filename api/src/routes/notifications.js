const express = require('express');
const router = express.Router();
const checkLogin = require('../app/middleware/checkLogin');
const notificationsController = require('../app/controllers/NotificationsController');

router.get('/getByUser/', checkLogin, notificationsController.getByUser);
module.exports = router;