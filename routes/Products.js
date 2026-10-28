const express = require('express');
const { createProduct, fetchallproduct, fetchProductById, updateProduct } = require('../controller/Product');
const router = express.Router();
// / products is already add in base path   
router.post('/', createProduct)
router.get('/', fetchallproduct);
router.get('/:id', fetchProductById);
router.patch('/:id', updateProduct);

exports.router = router;