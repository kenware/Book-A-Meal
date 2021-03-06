import shortcode from 'date-shortcode';
import model from '../models/index';
import mealFilter from '../helpers/filter';

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
      meals, address, menu
    } = req.body;

    const presentTime = new Date().getHours() + (new Date().getMinutes() / 60);
    const myOrder = [];
    for (const eachMenu of menu) {
      const { orderBefore } = eachMenu;
      const catererId = eachMenu.userId;

      if (orderBefore < Number(presentTime)) {
        return res.status(422)
          .json({ message: 'You cannot order meal from this menu at this time' });
      }
      const allMenuMealId = eachMenu.Meals.map(meal => meal.id);
      // extract all meal that that has above menuId
      const allMeal = meals.filter(meal =>
        meal.menuId === eachMenu.id);
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
    }
    return res.status(201).json(myOrder);
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
    const { meals, address, order } = req.body;
    const { orderId } = req.params;

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
    if (limit < 0 || offset < 0) {
      return res.status(401).json({ message: 'Your query param cannot be negative' });
    }
    const catererId = id;
    const orders = await Order.findAll({
      where: { catererId },
      include: [
        {
          model: Meal,
          as: 'meals',
          attributes: ['id', 'name', 'price', 'description', 'image', 'createdAt', 'updatedAt'],
          through: { attributes: ['quantity', 'totalPrice'] },
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'username', 'image']
        }
      ],
      order: [
        ['createdAt', 'DESC']
      ],
      limit,
      offset
    });
    const count = await Order.count({ where: { catererId } });

    if (!orders || orders.length < 1) { return res.status(404).json({ message: 'Users have not ordered a meal' }); }
    orders.forEach((order) => {
      const totalPrice = new mealFilter().getPrice(order.meals);
      order.dataValues.totalPrice = totalPrice;
    });
    return res.status(200).json({ orders, count });
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
    if (limit < 0 || offset < 0) {
      return res.status(401).json({ message: 'Your query param cannot be negative' });
    }
    const userId = req.decoded.id;
    const orders = await Order.findAll({
      where: { userId },
      include: [
        {
          model: Meal,
          as: 'meals',
          attributes: ['id', 'name', 'price', 'description', 'image', 'createdAt', 'updatedAt']
        },
      ],
      order: [
        ['createdAt', 'DESC']
      ],
      limit,
      offset
    });
    const count = await Order.count({ where: { userId } });
    if (!orders || orders.length < 1) { return res.status(404).json({ message: 'You have not ordered a meal' }); }

    orders.forEach((order) => {
      const totalPrice = new mealFilter().getPrice(order.meals);
      order.dataValues.totalPrice = totalPrice;
    });
    return res.status(200).json({ count, orders });
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
