import orders from '../models/order';
import menus from '../models/menu';

export default class orderController {
  createOrder(req, res) {
    const orderRequest = req.body;
    const {
      menuId, id, mealId, userId, status, quantity
    } = orderRequest;
    if (!menuId || !id || !mealId) {
      return res.status(404).json('order fields are required');
    }
    let myMenu;
    let orderMeal;
    for (const menu of menus) {
      if (menu.id === menuId) {
        myMenu = menu;
      }
    }
    if (myMenu === undefined) {
      return res.status(404).json('your menu does not exist');
    }
    for (const meal of myMenu.meals) {
      if (mealId === meal.id) {
        orderMeal = meal;
      }
    }
    if (orderMeal === undefined) {
      return res.status(404).json('the meal does not exist in the menu');
    }

    const myOrder = {
      id,
      deliveryDate: orderRequest.deliveryDate,
      userId,
      status,
      quantity,
      meals: orderMeal,
      totalPrice: orderRequest.quantity * orderMeal.price
    };
    orders.push(myOrder);
    const message = 'order created';
    return res.status(201).json({
      message, myOrder
    });
  }
}
