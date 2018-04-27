

import express from 'express';
import mealController from '../controllers/meals';
import menuController from '../controllers/menus';
import orderController from '../controllers/orders';

const router = express.Router();

// feature get, post, update and delete meal
router.get('/meals', new mealController().getMeals);
router.post('/meals', new mealController().createMeals);
router.put('/meals/:mealId', new mealController().updateMeal);
router.delete('/meals/:mealId', new mealController().deleteMeal);
router.get('/meals/:mealId', new mealController().getOneMeal);

// feature set menu for the day
router.post('/menu', new menuController().createMenu);
// feature get menu for the day
router.get('/menu', new menuController().getMenu);
// get menu for any day
router.get('/menu/:date', new menuController().getAnyMenu);

// feature create order
router.post('/orders', new orderController().createOrder);
router.put('/orders/:orderId', new orderController().updateOrder);
router.get('/orders', new orderController().getOrders);
export default router;
