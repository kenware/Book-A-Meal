import shortcode from 'date-shortcode';
import model from '../models/index';

const {
  Menu,
  Meal,
  User,
} = model;

  /**
 * @class menuController
 * @description create and get today's menu
 */
export default class menuController {
  /**
 * @method createMenu
 * @returns { array } returns today's menu
 * @description Create today's menu
 */
  async createMenu(req, res, next) {
    const { title, mealId, orderBefore } = req.body;
    const { id, username } = req.decoded;
    const userId = id;
    let { date } = req.body;
    let message = 'menu is updated';
    let isMenuSet = false;
    // check if mealId exist
    const meal = await Meal.findOne({ where: { userId, id: mealId } });
    if (!meal) { return res.status(401).json({ message: 'Meal with the entered id not found' }); }
    // get current hour of the day
    const presentTime = new Date().getHours() + (new Date().getMinutes() / 60);

    // check if current time is greater than order expire time
    if (orderBefore < Number(presentTime)) {
      return res.status(422)
        .json({ message: 'The closing time user can order cannot be lesser than the present time' });
    }

    if (!date) { date = shortcode.parse('{YYYY-MM-DD}', new Date()); }
    const user = User.build({ id });
    let menu = await Menu.findOne({ where: { date, userId } });
    // check if menu exist else create new one
    if (!menu) {
      menu = await Menu.create({ title, date, orderBefore });
      menu.setUser(user);
      message = `${date} Menu is set`;
    } else {
      menu = await menu.update({ orderBefore, title });
      isMenuSet = true;
    }
    menu.addMeal(mealId);
    if (!isMenuSet) {
      req.body.menu = menu;
      req.body.message = message;
      req.body.username = username;
      next();
    } else {
      return res.status(200).json({ message, menu });
    }
  }

  /**
 * @method getMenu
 * @param req
 * @param res response containing today's menu
 * @returns { array } returns today's menu
 * @description gets today's menu
 */
  async getMenu(req, res) {
    let { date } = req.params;
    let { limit, offset } = req.query;
    limit = parseInt(limit, 10) || 6;
    offset = parseInt(offset, 10) || 0;
    if (!date) { date = shortcode.parse('{YYYY-MM-DD}', new Date()); }
    const menu = await Menu.findAll({
      where: { date },
      include: [
        {
          model: model.User,
          attributes: ['id', 'name', 'username', 'image']
        }
      ],
      limit,
      offset
    });
    menu.map((oneMenu) => {
      oneMenu.dataValues.Meals = `${req.headers.host}/api/v1/menuMeals/${oneMenu.id}`;
      return oneMenu;
    });
    if (!menu || menu.length < 1) { return res.status(404).json({ message: `${date} menu is not set` }); }
    return res.status(200).json(menu);
  }

  async getMenuMeals(req, res) {
    const { menuId } = req.params;
    let { limit, offset } = req.query;
    limit = parseInt(limit, 10) || 5;
    offset = parseInt(offset, 10) || 0;
    const id = parseInt(menuId, 10);
    const date = shortcode.parse('{YYYY-MM-DD}', new Date());
    const menu = await Menu.findAll({
      where: { date, id },
      include: [
        {
          model: model.Meal,
          attributes: ['id', 'name', 'price', 'description', 'image', 'createdAt', 'updatedAt']
        }
      ],
      limit,
      offset,
      subQuery: false,
    });
    if (!menu || menu.length < 1) { return res.status(404).json({ message: `${date} menu is not set` }); }
    return res.status(200).json(menu[0].Meals);
  }
}
