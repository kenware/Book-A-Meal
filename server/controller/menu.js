import shortcode from 'date-shortcode';
import model from '../models/index';

const { Menu, Meal, User } = model;
export default class menuController {
  async createMenu(req, res) {
    const { title, mealId, orderBefore } = req.body;
    const { id } = req.decoded;
    const userId = id;
    let { date } = req.body;
    let message = 'menu is updated';
    // check if mealId exist
    const meal = await Meal.findOne({ where: { userId, id: mealId } });
    if (!meal) { return res.status(401).json({ message: 'Meal with the entered id not found' }); }
    // get current hour of the day
    const presentTime = new Date().getHours() + (new Date().getMinutes() / 60);

    // check if current time is grater than order expire time
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
      menu.save();
      message = `${date} Menu is set`;
    } else {
      menu = await menu.update({ orderBefore, title });
    }

    menu.addMeal(mealId);
    return res.status(200).json({ message, menu });
  }
  async getMenu(req, res) {
    let { date } = req.params;
    if (!date) { date = shortcode.parse('{YYYY-MM-DD}', new Date()); }
    const menu = await Menu.findAll({
      where: { date },
      include: [
        {
          model: model.Meal,
          attributes: ['id', 'name', 'price', 'description', 'image', 'createdAt', 'updatedAt']
        },
        {
          model: model.User,
          attributes: ['id', 'name', 'username', 'image']
        },
      ]
    });
    if (!menu || menu.length < 1) { return res.status(404).json({ message: `${date} menu is not set` }); }
    return res.status(200).json(menu);
  }
}