const express = require('express');
const router = express.Router();

const usersController = require('../app/controllers/UsersController');

router.post('/add', usersController.add);

module.exports = router;