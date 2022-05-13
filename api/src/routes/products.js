const express = require('express');
const router = express.Router();

const ProductsController = require('../app/controllers/ProductsController');

router.get('/getAll', ProductsController.getAll);
router.get('/getByKeyword', ProductsController.getByKeyword);
router.get('/getDetail/:id', ProductsController.getDetail);
module.exports = router;