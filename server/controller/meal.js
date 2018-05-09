

import model from '../models/index';

const { Meal, User } = model;

export default class mealController {
  async getMeals(req, res) {
    const { id } = req.decoded;
    const userId = id;
    const meals = await Meal.findAll({ where: { userId } });
    return res.status(200).json(meals);
  }
  async addMeal(req, res) {
    const { price, name, description } = req.body;
    const { id } = req.decoded;
    const userId = id;
    // return res.json(userId)
    if (!price) { return res.status(401).json('price field is required'); }
    if (!name) { return res.status(401).json('name field is required'); }
    if (!description) { return res.status(401).json('description field is required'); }
    const isExist = await Meal.findOne({ where: { name, userId } });
    if (isExist) { return res.status(422).json('Meal already exist'); }

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
    if (!meal) { return res.status(405).json('Error occured while creating meal'); }
    meal.setUser(user);
    return res.status(201).json(meal);
  }

  async updateMeal(req, res) {
    const { mealId } = req.params;
    let { price, name, description } = req.body;
    const meal = await Meal.findById(mealId);
    if (!meal) { return res.status(422).json('meal does not exist'); }
    if (req.decoded.id !== meal.userId && req.decoded.role !== 'superUser') {
      return res.status(401).json('you cannot update meal you did not add');
    }
    const {
      oldPrice,
      oldName,
      oldDescription,
      oldImage,
    } = meal;
    if (!price) { price = oldPrice; }
    if (!name) { name = oldName; }
    if (!description) { description = oldDescription; }

    // get file upload
    let image;
    if (req.files && req.files.length !== 0) {
      image = req.files[0].url;
    } else {
      // save original fileimage if no image is uploaded
      image = oldImage;
    }

    const update = await meal.update({
      price, name, description, image
    });
    return res.status(201).json(update);
  }

  async deleteMeal(req, res) {
    const { mealId } = req.params;
    const meal = await Meal.findById(mealId);
    if (!meal) { return res.status(422).json('meal does not exist'); }
    if (req.decoded.id !== meal.userId && req.decoded.role !== 'superUser') {
      return res.status(401).json('you cannot delete meal you did not add');
    }
    await meal.destroy();
    return res.status(200).json('meal successfully deleted');
  }
}
