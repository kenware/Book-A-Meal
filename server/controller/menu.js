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
    const {
      title,
      mealList,
      orderBefore,
      sendEmail
    } = req.body;

    const { id, username } = req.decoded;
    const userId = id;
    let message = 'menu is updated';
    let isMenuSet = false;

    const date = shortcode.parse('{YYYY-MM-DD}', new Date());
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
    if (!isMenuSet && sendEmail) {
      req.body.menu = menu;
      req.body.message = message;
      req.body.username = username;
      next();
    } else {
      return res.status(201).json({ message, menu });
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
    if (limit < 1 || offset < 0) {
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
    const userId = req.decoded.id;
    const date = shortcode.parse('{YYYY-MM-DD}', new Date());
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
    if (limit < 1 || offset < 0) {
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
