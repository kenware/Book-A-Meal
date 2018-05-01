import orderModel from '../models/order';
import menuModel from '../models/menu';
import mealModel from '../models/meal';
const menus = new menuModel();
const meals = new mealModel();
const orders = new orderModel;


export default class orderController {

  createOrder(req, res) {
    let {
      menuId, mealId, userId, status, quantity
    } = req.body;
    //let { id } = orderRequest;
    if (!menuId || !quantity || !mealId || !userId) {
      return res.status(404).json('order fields are required');
    }
    let myMenu;
    let meal;
    const allMenus = menus.getAll();
    for (const menu of allMenus) {
      if (menu.id === parseInt(menuId)) {
        myMenu = menu;
      }
    }
    if (!myMenu) {
      return res.status(404).json('your menu does not exist');
    }
    for (const eachMeal of myMenu.meals) {
      if (eachMeal.id === parseInt(mealId)) {
        meal = eachMeal;
      }
    }
    if (!meal) {
      return res.status(404).json('the meal does not exist in the menu');
    }
    //autogenerate order id
    const id = orders.getAll().reverse()[0].id + 1;
    const myOrder = orders.createOrder(id,userId,quantity,status,meal)
    const message = 'order created';

    return res.status(201).json({
      message, myOrder
    });
  }

  updateOrder(req, res) {
    const orderId = parseInt(req.params.orderId, 10);
    const allOrder = orders.getAll()
    for (const eachOrder of allOrder) {
      if (eachOrder.id === orderId) {
        const myOrder = orders.updateOrder(req.body,eachOrder)
        const message = 'successfuly updated';
        return res.status(201).json({
          message,
          myOrder
        });
      }
    }
    return res.status(404).json('order not found');
  }

  getOrders(req, res) {
    const allOrder = orders.getAll();
    if (allOrder.length > 0) {
      return res.status(201).json(allOrder);
    }
    return res.status(404).json('you have not made any order');
  }
}
