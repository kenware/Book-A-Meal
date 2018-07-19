
import express from 'express';

import middleware from '../middleware/orderValidator';
import auth from '../middleware/jwtAuth';
import orderController from '../controller/order';

const validate = new middleware();
const jwtAuth = new auth();
const Order = new orderController();
const router = express.Router();
// Order route
// POST an order for the day
router
  .post('/orders', jwtAuth.authUser, validate.order, Order.createOrder)
  .put('/orders/:orderId', validate.updateOrder, jwtAuth.authUser, Order.updateOrder)
  .put('/orderStatus/:orderId', jwtAuth.authUser, Order.confirmStatus)
  .get('/orders', jwtAuth.authAdmin, Order.getOrders)
  .get('/user/orders', jwtAuth.authUser, Order.getUserOrders);
export default router;
