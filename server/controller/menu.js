import shortcode from 'date-shortcode';
import model from '../models/index';
import mealFilter from '../helpers/filter';

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
    const { title, mealList, orderBefore } = req.body;
    const { id, username } = req.decoded;
    const userId = id;
    let { date } = req.body;
    let message = 'menu is updated';
    let isMenuSet = false;
    // check if mealId exist
    const meals = await Meal.findAll({ where: { userId, id: { $in: mealList } } });
    if (mealList.length > meals.length) { return res.status(401).json({ message: 'Meal with the entered id not found' }); }
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
    if (!menu) {
      menu = await Menu.create({ title, date, orderBefore });
      menu.setUser(user);
      message = `${date} Menu is set`;
    } else {
      menu = await menu.update({ orderBefore, title });
      isMenuSet = true;
    }
    await menu.addMeals(mealList);
    let menuMeals = await menu.getMeals();
    menuMeals = new mealFilter(menuMeals).getmealList();
    menu.dataValues.meals = menuMeals;
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
    limit = parseInt(limit, 10) || 4;
    offset = parseInt(offset, 10) || 0;
    if (limit < 0 || offset < 0) {
      return res.status(401).json({ message: 'Your query param cannot be negative' });
    }
    if (!date) { date = shortcode.parse('{YYYY-MM-DD}', new Date()); }
    const menu = await Menu.findAndCountAll({
      where: { date },
      include: [
        {
          model: model.User,
          as: 'user',
          attributes: ['id', 'name', 'username', 'image']
        }
      ],
      limit,
      offset
    });
    menu.rows.map((oneMenu) => {
      oneMenu.dataValues.meals = `${req.headers.host}/api/v1/menuMeals/${oneMenu.id}`;
      return oneMenu;
    });
    if (!menu || menu.rows.length < 1) { return res.status(404).json({ message: `${date} menu is not set` }); }
    return res.status(201).json(menu);
  }

  /**
 * @method getMyMenu
 * @param req
 * @param res response containing today's menu
 * @returns { array } returns today's menu
 * @description gets today's menu
 */
  async getMyMenu(req, res) {
    let { date } = req.params;
    const userId = req.decoded.id;
    if (!date) { date = shortcode.parse('{YYYY-MM-DD}', new Date()); }
    const menu = await Menu.findOne({
      where: { date, userId },
      include: [
        {
          model: model.User,
          as: 'user',
          attributes: ['id', 'name', 'username', 'image']
        }
      ]
    });
    menu.dataValues.meals = `${req.headers.host}/api/v1/menuMeals/${menu.id}`;
    if (!menu) { return res.status(404).json({ message: `${date} menu is not set` }); }
    return res.status(201).json(menu);
  }


  async getMenuMeals(req, res) {
    const { menuId } = req.params;
    let { limit, offset } = req.query;
    limit = parseInt(limit, 10) || 4;
    offset = parseInt(offset, 10) || 0;
    if (limit < 0 || offset < 0) {
      return res.status(401).json({ message: 'Your query param cannot be negative' });
    }
    const id = parseInt(menuId, 10);
    const date = shortcode.parse('{YYYY-MM-DD}', new Date());
    const menu = await Menu.findAndCountAll({
      where: { date, id },
      include: [
        {
          model: model.Meal,
          attributes: ['id', 'name', 'price', 'description', 'image', 'createdAt', 'updatedAt'],
          through: { attributes: [] },
        }
      ],
      limit,
      offset,
      subQuery: false,
    });
    if (!menu || menu.rows.length < 1) { return res.status(404).json({ message: 'menu with the given id does not exist' }); }
    return res.status(200).json({
      count: menu.count, meals: menu.rows[0].Meals
    });
  }
}
