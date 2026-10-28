const express = require('express');
const { fetchUserById, updateUser } = require('../controller/User');
const router = express.Router();
// / users is already add in base path   

router.get('/own', fetchUserById);
router.patch('/:id', updateUser);

exports.router = router; 