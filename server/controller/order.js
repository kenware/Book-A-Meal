import shortcode from 'date-shortcode';
import model from '../models/index';

const {
  Menu,
  Meal,
  User,
  Order,
} = model;

export default class orderController {
  async createOrder(req, res) {
    const {
      menuId, quantity, mealId, address
    } = req.body;
    // get menu using menuId
    const menu = await Menu.findOne({
      where: { id: parseInt(menuId) },
      include: { model: Meal }
    });
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
  async updateOrder(req, res) {
    const newQuantity = req.body.quantity;
    const newAddress = req.body.address;
    const { orderId } = req.params;
    if ((Number.isNaN(Number(orderId))) === true || (/^ *$/.test(orderId) === true)) {
      return res.status(401).json({ message: 'Provide a valid order id' });
    }
    const id = orderId;
    const order = await Order.findOne({
      where: { id },
      include: { model: Meal }
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
    let {
      quantity,
      address,
      totalPrice,
    } = order;
    quantity = newQuantity || quantity;
    address = newAddress || address;
    totalPrice = (order.Meal.price * newQuantity) || totalPrice;
    // update
    const update = await order.update({ quantity, address, totalPrice });
    if (!update) { return res.status(404).json({ message: 'Update failed' }); }
    return res.status(201).json(update);
  }
  async getOrders(req, res) {
    const { id } = req.decoded;
    const catererId = id;
    const orders = await Order.findAll({
      where: { catererId },
      include: [
        {
          model: Meal,
          attributes: ['id', 'name', 'price', 'description', 'image', 'createdAt', 'updatedAt']
        },
        {
          model: User,
          attributes: ['id', 'name', 'username', 'image']
        },
      ]
    });
    if (!orders || orders.length < 1) { return res.status(404).json({ message: 'users have not ordered a meal' }); }
    return res.status(200).json(orders);
  }
  async getUserOrders(req, res) {
    const { id } = req.decoded;
    const userId = id;
    const orders = await Order.findAll({
      where: { userId },
      include: [
        {
          model: Meal,
          attributes: ['id', 'name', 'price', 'description', 'image', 'createdAt', 'updatedAt']
        },
        {
          model: User,
          attributes: ['id', 'name', 'username', 'image', 'role']
        },
      ]
    });
    if (!orders || orders.length < 1) { return res.status(404).json({ message: 'Users have not ordered a meal' }); }
    return res.status(200).json(orders);
  }
}
