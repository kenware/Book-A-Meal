import shortcode from 'date-shortcode';
import model from '../models/index';

const {
  Menu,
  Meal,
  User,
  Order,
} = model;

/**
 * @class orderController
 * @description create an order, get user order, get all orders, update order
 *  confirm that a meal is recieved
 */
export default class orderController {
  /**
 * @method createOrder
 * @returns { null } returns Error ordering meal
 * @param { String } mealId mealId of the meal to be ordered
 * @param { String }  quantity of the meal to be ordered
 * @param { String }  address of the person ordering the meal
 * @returns { object } returns order details
 * @description It takes meal id, quantity
    and address of the person that is ordering the meal and create an order
 */
  async createOrder(req, res) {
    const {
      menuId, quantity, mealId, address
    } = req.body;
    // get menu using menuId
    const menu = await Menu.findOne({
      where: { id: parseInt(menuId) },
      include: { model: Meal }
    });
<<<<<<< HEAD
    if (!menu) { return res.status(404).json({ message: 'Menu not found' }); }
    // caterers id
    const { userId } = menu;
    const catererId = userId;
    // get order expire time
    const { orderBefore } = menu;
    // get current date
    const date = shortcode.parse('{YYYY-MM-DD}', new Date());
    // get present time
    const presentTime = new Date().getHours() + (new Date().getMinutes() / 60);
    // check if order time is expired
    if (orderBefore < Number(presentTime) || menu.date !== date) {
      return res.status(422)
        .json({ message: 'You cannot order menu at this time' });
=======

    if (allMenuId.length > menu.length) { return res.status(404).json({ message: 'Menu not found' }); }

    const myOrder = [];
    for (const eachMenu of menu) {
      const { orderBefore } = eachMenu;
      const catererId = eachMenu.userId;

      if (orderBefore < Number(presentTime)) {
        return res.status(422)
          .json({ message: `You cannot order menu with this id ${eachMenu} at this time` });
      }
      const allMenuMealId = eachMenu.Meals.map(meal => meal.id);

      const allMeal = meals.filter(eachMenuMeal =>
        eachMenuMeal.menuId === eachMenu.id);
      const allMealId = allMeal.map(meal => meal.mealId);

      const mealsExistInMenu = new mealFilter().checkMeals(allMenuMealId, allMealId);

      if (!mealsExistInMenu) { return res.status(404).json({ message: 'Meal not found' }); }
      const { id } = req.decoded;
      const order = await Order.create({
        status: 'pending',
        address,
        catererId
      });
      const user = User.build({ id });
      order.setUser(user);
      for (const meal of allMeal) {
        order.setMeals(meal.mealId, {
          through: { quantity: meal.quantity }
        });
      }
      order.dataValues.meals = allMealId;
      myOrder.push(order);
>>>>>>> bg(fix): Fixed my test and modified my controller
    }
    let meal;
    // check if meal exist in the menu using mealId
    menu.Meals.forEach((element) => {
      if (element.id === parseInt(mealId)) { meal = element; }
    });
    if (!meal) { return res.status(404).json({ message: 'Meal not found' }); }
    const { id } = req.decoded;
    const totalPrice = meal.price * quantity;
    const user = User.build({ id });
    const title = meal.name;
    const status = 'pending';
    // create an order
    const order = await Order.create({
      status,
      title,
      address,
      quantity,
      totalPrice,
      catererId
    });
    // check if order is created
    if (!order) { return res.status(404).json({ message: 'Error ordering meal' }); }
    order.setUser(user);
    order.setMeal(meal);
    order.save();
    return res.status(201).json(order);
  }

  /**
 * @method updateOrder
 * @returns { null } returns Order not found
 * @param { String } orderId of the order to be updated
 * @param { String }  quantity of the meal to be ordered
 * @param { String }  address of the person ordering the meal
 * @returns { object } returns updated order
 * @description It takes order id, quantity
    or address of the person that is ordering the meal and updates an order
 */
  async updateOrder(req, res) {
    const newQuantity = req.body.quantity;
    const newAddress = req.body.address;
    const newStatus = req.body.status;
    const { orderId } = req.params;
<<<<<<< HEAD
    if ((Number.isNaN(Number(orderId))) === true || (/^ *$/.test(orderId) === true)) {
      return res.status(401).json({ message: 'Provide a valid order id' });
    }
    const id = orderId;
    const order = await Order.findOne({
      where: { id },
      include: { model: Meal }
=======

    const order = await Order.findOne({
      where: { id: orderId },
      include: { model: Meal, as: 'meals', }
>>>>>>> bg(fix): Fixed my test and modified my controller
    });
    // check if order exist
    if (!order) { return res.status(404).json({ message: 'Order not found' }); }
    const orderHour = new Date(order.createdAt).getHours() * 60;
    const orderMinute = (new Date(order.createdAt).getMinutes());
    const orderTime = orderMinute + orderHour;
    const presentTime = (new Date().getHours() * 60) + (new Date().getMinutes());
    if ((Number(presentTime) - Number(orderTime)) > 60) {
      return res.status(404).json({ message: 'You cannot update order at this time' });
    }

    // check if the user that ordered the meal is making the update
    if (req.decoded.id !== order.userId) {
      return res.status(401).json({ message: 'You cannot update order you did not add' });
    }
<<<<<<< HEAD
    let {
      quantity,
      address,
      totalPrice,
      status
    } = order;
    quantity = newQuantity || quantity;
    address = newAddress || address;
    status = newStatus || status;
    totalPrice = (order.Meal.price * newQuantity) || totalPrice;
    // update
    const update = await order.update({
      quantity, address, totalPrice, status
    });
    if (!update) { return res.status(404).json({ message: 'Update failed' }); }
=======

    const allOrderMealId = order.meals.map(meal => meal.id);

    const allMealId = meals.map(meal => meal.mealId);
    const mealsExistInOrder = new mealFilter().checkMeals(allOrderMealId, allMealId);

    if (!mealsExistInOrder) { return res.status(404).json({ message: 'Meal not found' }); }

    const update = await order.update({ address });

    for (const meal of meals) {
      await update.addMeal(meal.mealId, {
        through: { quantity: meal.quantity }
      });
    }
>>>>>>> bg(fix): Fixed my test and modified my controller
    return res.status(201).json(update);
  }

  /**
 * @method getOrders
 * @returns { null } returns users have not ordered a meal
 * @returns { array } returns all orders
 * @description used to get the orders users have made in the specified in limit and offset
 *      functionality limited to caterers only
 */
  async getOrders(req, res) {
    const { id } = req.decoded;
    let { limit, offset } = req.query;
    limit = parseInt(limit, 10) || 6;
    offset = parseInt(offset, 10) || 0;
    const catererId = id;
    const orders = await Order.findAndCountAll({
      where: { catererId },
      include: [
        {
          model: Meal,
          attributes: ['id', 'name', 'price', 'description', 'image', 'createdAt', 'updatedAt']
        },
        {
          model: User,
          attributes: ['id', 'name', 'username', 'image']
        }
      ],
      order: [
        ['createdAt', 'DESC']
      ],
      limit,
      offset
    });
<<<<<<< HEAD
    if (!orders || orders.length < 1) { return res.status(404).json({ message: 'users have not ordered a meal' }); }
    return res.status(200).json(orders);
=======
    const count = await Order.count({ where: { catererId } });

    if (!orders || orders.length < 1) { return res.status(404).json({ message: 'Users have not ordered a meal' }); }
    orders.forEach((order) => {
      const totalPrice = new mealFilter().getPrice(order.meals);
      order.dataValues.totalPrice = totalPrice;
    });
    return res.status(200).json({ orders, count });
>>>>>>> bg(fix): Fixed my test and modified my controller
  }

  /**
 * @method getOrders
 * @returns { null } returns users have not ordered a meal
 * @returns { array } returns all orders
 * @description used to get the orders made by a particular user
 */
  async getUserOrders(req, res) {
    let { limit, offset } = req.query;
    limit = parseInt(limit, 10) || 6;
    offset = parseInt(offset, 10) || 0;
    const userId = req.decoded.id;
    const orders = await Order.findAndCountAll({
      where: { userId },
      include: [
        {
          model: Meal,
          attributes: ['id', 'name', 'price', 'description', 'image', 'createdAt', 'updatedAt']
        },
      ],
      order: [
        ['createdAt', 'DESC']
      ],
      limit,
      offset
    });
<<<<<<< HEAD
    if (!orders || orders.length < 1) { return res.status(404).json({ message: 'Users have not ordered a meal' }); }
    return res.status(200).json(orders);
=======
    const count = await Order.count({ where: { userId } });
    if (!orders || orders.length < 1) { return res.status(404).json({ message: 'You have not ordered a meal' }); }   

    orders.forEach((order) => {
      const totalPrice = new mealFilter().getPrice(order.meals);
      order.dataValues.totalPrice = totalPrice;
    });
    return res.status(200).json({ count, orders });
>>>>>>> bg(fix): Fixed my test and modified my controller
  }

  /**
 * @method confirmStatus
 * @description acknowledges that meal is received
 */
  async confirmStatus(req, res) {
    const userId = req.decoded.id;
    const id = req.params.orderId;
    const order = await Order.findOne({
      where: { id }
    });
    if (!order) { return res.status(404).json({ message: 'Order not found' }); }
    if (userId !== order.userId) {
      return res.status(401).json({ message: 'You cannot update order you did not add' });
    }
    const update = await order.update({
      status: 'confirmed'
    });
    if (!update) { return res.status(404).json({ message: 'Update failed' }); }
    return res.status(201).json(update);
  }
}
