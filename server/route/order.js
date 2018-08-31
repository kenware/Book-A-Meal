
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
  .post('/orders', jwtAuth.authUser, validate.order, validate.orderAsync, Order.createOrder)
  .put('/orders/:orderId', validate.updateOrder, jwtAuth.authUser, validate.updateOrderAsync, Order.updateOrder)
  .put('/orderStatus/:orderId', jwtAuth.authUser, Order.confirmStatus)
  .get('/orders', jwtAuth.authAdmin, Order.getOrders)
  .get('/user/orders', jwtAuth.authUser, Order.getUserOrders)
  .get('*', (req, res) => res.status(404).json({ message: '404 Not Found' }))
  .post('*', (req, res) => res.status(404).json({ message: '404 Not Found' }))
  .delete('*', (req, res) => res.status(404).json({ message: '404 Not Found' }))
  .put('*', (req, res) => res.status(404).json({ message: '404 Not Found' }));
export default router;
