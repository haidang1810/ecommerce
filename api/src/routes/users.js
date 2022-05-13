const express = require('express');
const router = express.Router();

const usersController = require('../app/controllers/UsersController');

router.post('/add', usersController.add);
router.get('/getAll', usersController.getAll);
router.get('/getVerifyCode/:phone', usersController.getVerifyCode);
module.exports = router;