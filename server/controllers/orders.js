import dumyData from '../dumydata/store';
const menus = dumyData.menus;
const orders = dumyData.orders;

export default class orderController {
  constructor(id, userId, status, quantity,totalPrice,meal) {
    this.id = id;
    this.userId = userId;
    this.status = status
    this.quantity = quantity; 
    this.totalPrice = totalPrice;
    this.meal = meal;    
  }
  createOrder(req, res) {
    const orderRequest = req.body;
    let {
      menuId, mealId, userId, status, quantity, deliveryDate
    } = orderRequest;
    let { id } = orderRequest;
    if (!menuId || !id || !mealId) {
      return res.status(404).json('order fields are required');
    }
    let myMenu;
    let meal;
    for (const menu of menus) {
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
    id = parseInt(id);
    const totalPrice = quantity * meal.price;
    //instance of an orderController
    const myOrder = new orderController(id, userId, status,quantity, totalPrice, meal);
    orders.push(myOrder);
    const message = 'order created';

    return res.status(201).json({
      message, myOrder
    });
  }

  updateOrder(req, res) {
    const orderId = parseInt(req.params.orderId, 10);
    const update = req.body;
    for (const eachOrder of orders) {
      if (eachOrder.id === orderId) {
        eachOrder.status = update.status || eachOrder.status;
        eachOrder.quantity = update.quantity || eachOrder.quantity;
        eachOrder.totalPrice = update.quantity * eachOrder.meal.price ||
        eachOrder.quantity * eachOrder.meal.price;
        const message = 'successfuly updated';
        const { id, userId, status,quantity, totalPrice, meal } = eachOrder;
        const myOrder = new orderController(id, userId, status,quantity, totalPrice, meal);
        return res.status(201).json({
          message,
          myOrder
        });
      }
    }
    return res.status(404).json('order not found');
  }

  getOrders(req, res) {
    if (orders.length > 0) {
      return res.status(201).json(orders);
    }
    return res.status(404).json('you have not made any order');
  }
}
