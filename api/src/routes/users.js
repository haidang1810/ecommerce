const express = require('express');
const router = express.Router();

const usersController = require('../app/controllers/UsersController');

router.post('/add', usersController.add);
router.get('/getAll', usersController.getAll);
module.exports = router;