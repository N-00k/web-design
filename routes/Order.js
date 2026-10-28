const express = require('express');
const { createOrder, fetchOrdersByUser, updateOrder, deleteOrder, fetchallOrders } = require('../controller/Order');

const router = express.Router();
// / Brands is already add in base path   
router.post('/', createOrder)
router.get('/own/', fetchOrdersByUser);
router.delete('/:id', deleteOrder);
router.patch('/:id', updateOrder);
router.get('/', fetchallOrders);

exports.router = router;