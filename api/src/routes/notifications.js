const express = require('express');
const router = express.Router();

const notificationsController = require('../app/controllers/NotificationsController');

router.get('/getByUser/:user', notificationsController.getByUser);
module.exports = router;