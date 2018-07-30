import Sequelize from 'sequelize';
import model from '../models/index';

const { Meal, User, Order } = model;

/**
 * @class mealController
 * @description create a meal, update a meal, delete a meal
 *  get all meals
 */
export default class mealController {
  /**
 * @method getMeals
 * @returns { null } returns There is no meal in the list
 * @returns { array } returns meals
 * @param { String } limit limit specifies the number of meals to be returned
 *  @param { String } offset offset
 * @description used to get all the meals in the specified in limit and offset
 */
  async getMeals(req, res) {
    let { limit, offset } = req.query;
    limit = parseInt(limit, 10) || 6;
    offset = parseInt(offset, 10) || 0;
    const { id } = req.decoded;
    const userId = id;
    try {
      const meals = await Meal.findAndCountAll({
        where: { userId },
        limit,
        offset
      });
      if (meals.count < 1) {
        return res.status(401).json({ message: 'There is no meal in the list' });
      }
      return res.status(200).json(meals);
    } catch (err) {
      return res.json(err);
    }
  }

  /**
 * @method getOneMeal
 * @returns { null } returns There is no meal in the list
 * @param { integer } mealId mealId of the meal
 * @returns { object } returns a meal
 * @description used to get one meal using the meal Id
 */
  async getOneMeal(req, res) {
    const { id } = req.decoded;
    const userId = id;
    const { mealId } = req.params;
    const meal = await Meal.findAll({ where: { userId, id: mealId } });
    if (!meal) {
      return res.status(401).json({ message: 'There is no meal in the list' });
    }
    return res.status(200).json(meal);
  }

  /**
 * @method addMeal
 * @returns { object } returns added meal
 * @param { String } name name of the meal
 * @param { String } price price of the meal
 * @param { String } description description of the meal
 * @param { String } image optional,image of the meal
 * @description Add name, price, description and image of the meal to db
 */
  async addMeal(req, res) {
    const { description, name } = req.body;
    const { price } = req.body;
    const { id } = req.decoded;
    const userId = id;
    // chech if meal is already exist
    const isExist = await Meal.findOne({ where: { name, userId } });
    if (isExist) { return res.status(422).json({ message: 'Meal already exist' }); }

    let image;
    if (req.files && req.files.length !== 0) {
      image = req.files[0].url;
    } else {
      image = 'http://res.cloudinary.com/more-recipes/image/upload/v1515492424/img-upload/file-1515492419229-images4.jpg.jpg';
    }
    const user = User.build({ id });
    const meal = await Meal.create({
      name, price, description, image
    });
    if (!meal) { return res.status(405).json({ message: 'Error occured while creating meal' }); }
    meal.setUser(user);
    return res.status(201).json(meal);
  }

  /**
 * @method updateMeal
 * @returns { object } returns updated meal
 * @param { String } name name of the meal
 * @param { String } price price of the meal
 * @param { String } description description of the meal
 * @param { String } image optional,image of the meal
 * @description Updates name, price, description or image of the meal
 */
  async updateMeal(req, res) {
    const { mealId } = req.params;
    const { name, description } = req.body;
    const { price } = req.body;
    // get the meal to update
    const meal = await Meal.findById(mealId);
    if (!meal) { return res.status(422).json({ message: 'Meal does not exist' }); }
    if (req.decoded.id !== meal.userId) {
      return res.status(401).json({ message: 'You cannot update meal you did not add' });
    }
    // get file upload
    let image;
    if (req.files && req.files.length !== 0) {
      image = req.files[0].url;
    }
    const update = await meal.update({
      price, name, description, image
    });
    return res.status(201).json(update);
  }

  /**
 * @method deleteMeal
 * @returns { null } returns There is no meal in the list
 * @param { integer } mealId mealId of the meal to be deleted
 * @returns { object } returns a meal
 * @description used to delete a meal using the meal Id
 */
  async deleteMeal(req, res) {
    const { mealId } = req.params;
    if ((Number.isNaN(Number(mealId))) === true || (/^ *$/.test(mealId) === true)) {
      return res.status(401).json({ message: 'provide a valid meal id' });
    }
    const meal = await Meal.findById(mealId);
    if (!meal) { return res.status(422).json({ message: 'Meal does not exist' }); }
    if (req.decoded.id !== meal.userId) {
      return res.status(401).json({ message: 'You cannot delete meal you did not add' });
    }
    await meal.destroy();
    return res.status(200).json({ message: 'Meal successfully deleted' });
  }

  /**
 * @method getMostOrderMeals
 * @returns { null } returns empty array
 * @returns { array } returns most ordered meals
 * @description used to get most ordered meal
 */
  async getMostOrderMeals(req, res) {
    const { limit } = req.params;
    try {
      const meal = await Order.findAll({
        attributes: [
          [Sequelize.fn('COUNT', Sequelize.col('Order.id')), 'OrderCount']],
        include: [{ model: Meal }],
        group: ['Meal.id'],
        order: [
          [Sequelize.fn('COUNT', Sequelize.col('Order.id')), 'DESC']
        ],
        limit
      });
      return res.json(meal);
    } catch (err) {
      return res.json(err);
    }
  }
}
