const express = require('express');
const { fetchCategories, createCategory } = require('../controller/Category');

const router = express.Router();
// / Brands is already add in base path   
router.get('/', fetchCategories)
router.post('/',createCategory)

exports.router = router;
