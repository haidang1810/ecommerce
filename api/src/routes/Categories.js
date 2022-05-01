const express = require('express');
const router = express.Router();

const categoriesController = require('../app/controllers/CategoriesController');

router.get('/getAll', categoriesController.getAll);
module.exports = router;