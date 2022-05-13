const express = require('express');
const router = express.Router();

const CategoriesController = require('../app/controllers/CategoriesController');

router.get('/getAll', CategoriesController.getAll);
module.exports = router;