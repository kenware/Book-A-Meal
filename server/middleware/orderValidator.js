import shortcode from 'date-shortcode';
import model from '../models/index';
import mealFilter from '../helpers/filter';

const {
  Menu,
  Meal,
  Order
} = model;

export default class orderMiddleware {
  /**
 * @method order
 * @param {string} req - meals, address
 * @description if the parameter is valid, pass it to orderAsync
 */
  order(req, res, next) {
    const {
      meals,
      address
    } = req.body;
    if (!address || typeof address !== 'string') {
      return res.status(401).json({ message: 'address is required' });
    }
    if (meals.length < 1) {
      return res.status(401).json({ message: 'Meals not found' });
    }

    for (const meal of meals) {
      if ((isNaN(meal.menuId)) === true || (/^ *$/.test(meal.menuId) === true) || meal.menuId < 1) {
        return res.status(401).json({ message: 'Please provide a valid menu id' });
      }
      if ((isNaN(meal.quantity)) === true || (/^ *$/.test(meal.quantity) === true) || meal.quantity < 1) {
        return res.status(401).json({ message: 'Please provide a valid quantity' });
      }
      if ((isNaN(meal.mealId)) === true || (/^ *$/.test(meal.mealId) === true) || meal.mealId < 1) {
        return res.status(401).json({ message: 'Please provide a valid meal id' });
      }
    }
    next();
  }

  /**
 * @method orderAsync
 * @param {string} req - meals
 * @description if the parameter is valid, pass it controller.
  validates parameters by making async calls
 */
  async orderAsync(req, res, next) {
    const {
      meals
    } = req.body;

    const date = shortcode.parse('{YYYY-MM-DD}', new Date());
    const allMenuId = [...new Set(meals.map(meal => Number(meal.menuId)))];
    const menu = await Menu.findAll({
      where: {
        id: { $in: allMenuId },
        date
      },
      include: { model: Meal }
    });
    if (!menu) return res.status(401).json({ message: 'Menu not found' });
    for (const eachMenu of menu) {
      if (allMenuId.indexOf(eachMenu.id) === -1) {
        return res.status(401).json({ message: `${eachMenu.id} is not found in menu` });
      }
    }
    req.body.menu = menu;
    next();
  }

  /**
 * @method updateOrder
 * @param {string} req - meals, address
 * @description if the parameter is valid, pass it to updateOrderAsync
 */
  updateOrder(req, res, next) {
    const { meals, address } = req.body;
    const { orderId } = req.params;

    if (address && typeof address !== 'string') {
      return res.status(401).json({ message: 'Please provide a valid address' });
    }
    if (meals.length < 1) {
      return res.status(401).json({ message: 'Meals not found' });
    }
    if ((isNaN(orderId)) === true || (/^ *$/.test(orderId) === true) || orderId < 1) {
      return res.status(401).json({ message: 'Provide a valid order id' });
    }

    for (const meal of meals) {
      if ((isNaN(meal.quantity)) === true || (/^ *$/.test(meal.quantity) === true) || meal.quantity < 1) {
        return res.status(401).json({ message: 'Please provide a valid quantity' });
      }
      if ((isNaN(meal.mealId)) === true || (/^ *$/.test(meal.mealId) === true) || meal.mealId < 1) {
        return res.status(401).json({ message: 'Please provide a valid meal id' });
      }
    }
    next();
  }

  /**
 * @method orderAsync
 * @param {string} req - orderId
 * @description if the parameter is valid, pass it controller.
  validates parameters by making async calls
 */
  async updateOrderAsync(req, res, next) {
    const { orderId } = req.params;

    const order = await Order.findOne({
      where: { id: orderId },
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
    req.body.order = order;
    next();
  }
}
