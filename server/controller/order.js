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
      meals, address
    } = req.body;

    const date = shortcode.parse('{YYYY-MM-DD}', new Date());
    const presentTime = new Date().getHours() + (new Date().getMinutes() / 60);

    const allMenuId = [...new Set(meals.map(meal => Number(meal.menuId)))];
    const menu = await Menu.findAll({
      where: {
        id: { $in: allMenuId },
        date
      },
      include: { model: Meal }
    });

    if (allMenuId.length > menu.length) { return res.status(404).json({ message: 'Menu not found' }); }

    const myOrder = [];
    for (const eachMenu of menu) {
      const { orderBefore } = eachMenu;
      const catererId = eachMenu.userId;

      if (orderBefore < Number(presentTime)) {
        return res.status(422)
          .json({ message: 'You cannot order menu at this time' });
      }
      const allMenuMealId = eachMenu.Meals.map(meal => meal.id);

      const allMeal = meals.filter(eachMenuMeal =>
        eachMenuMeal.menuId === eachMenu.id);
      const allMealId = allMeal.map(meal => meal.mealId);

      const mealsExistInMenu = new mealFilter().checkMeals(allMenuMealId, allMealId);
      const totalPrice = new mealFilter().getPrice(meals, eachMenu.id);

      if (!mealsExistInMenu) { return res.status(404).json({ message: 'Meal not found' }); }
      const { id } = req.decoded;
      const order = await Order.create({
        status: 'pending',
        address,
        totalPrice,
        catererId
      });
      const user = User.build({ id });
      order.setUser(user);
      for (const meal of allMeal) {
        if (!meal.quantity || !meal.totalPrice) {
          return res.status(404).json({ message: 'Quantity is required' });
        }
        order.setMeals(meal.mealId, {
          through: { quantity: meal.quantity, totalPrice: meal.totalPrice }
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
    const { meals, address } = req.body;
    const { orderId } = req.params;

    if ((Number.isNaN(Number(orderId))) === true || (/^ *$/.test(orderId) === true)) {
      return res.status(401).json({ message: 'Provide a valid order id' });
    }
    const id = orderId;
    const order = await Order.findOne({
      where: { id },
      include: { model: Meal, as: 'meals', }
    });

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

    const allOrderMealId = order.meals.map(meal => meal.id);

    const allMealId = meals.map(meal => meal.mealId);
    const mealsExistInOrder = new mealFilter().checkMeals(allOrderMealId, allMealId);
    const totalPrice = new mealFilter().getPrice(meals);

    if (!mealsExistInOrder) { return res.status(404).json({ message: 'Meal not found' }); }

    const update = await order.update({
      address, totalPrice,
    });

    for (const meal of meals) {
      if (!meal.quantity || !meal.totalPrice) {
        return res.status(404).json({ message: 'Quantity is required' });
      }

      await update.addMeal(meal.mealId, {
        through: { quantity: meal.quantity, totalPrice: meal.totalPrice }
      });
    }
    const myOrder = await Order.findOne({
      where: { id }
    });
    return res.status(201).json({ myOrder, meals: allOrderMealId });
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
    return res.status(200).json({ count, orders });
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
