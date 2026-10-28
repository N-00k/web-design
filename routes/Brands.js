const express = require('express');
const { fetchBrands, createBrand } = require('../controller/Brand');

const router = express.Router();
// / Brands is already add in base path   
router.get('/', fetchBrands)
router.post('/',createBrand)

exports.router = router;