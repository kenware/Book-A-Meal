
import express from 'express';

import middleware from '../middleware/validate';
import orderController from '../controller/order';

const validate = new middleware();
const Order = new orderController();
const router = express.Router();
// Order route
// POST an order for the day
router.post('/orders', validate.authUser, validate.order, Order.createOrder);
router.put('/orders/:orderId', validate.updateOrder, validate.authUser, Order.updateOrder);
router.get('/orders', validate.authAdmin, Order.getOrders);
export default router;
