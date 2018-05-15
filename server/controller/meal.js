

import model from '../models/index';

const { Meal, User } = model;

export default class mealController {
  async getMeals(req, res) {
    const { id } = req.decoded;
    const userId = id;
    const meals = await Meal.findAll({ where: { userId } });
    if (!meals || meals.length < 1) {
      return res.status(401).json({ message: 'There is no meal in the list' });
    }
    return res.status(200).json(meals);
  }
  async addMeal(req, res) {
    let { description, name } = req.body;
    const { price } = req.body;
    const { id } = req.decoded;
    const userId = id;
    // Input validation
    if (!price) { return res.status(401).json({ message: 'Price field is required' }); }
    if (!name) { return res.status(401).json({ message: 'Name field is required' }); }
    if (!description) { return res.status(401).json({ message: 'description field is required' }); }

    if ((Number.isNaN(Number(price))) === true || (/^ *$/.test(price) === true)) {
      return res.status(401).json({ message: 'Please provide a valid meal price' });
    }
    if ((/^ *$/.test(name) === true) || (/^[a-zA-Z ]+$/.test(name) === false) || typeof name !== 'string') {
      return res.status(400).json({ message: 'Please provide a valid meal name' });
    }
    if ((/^ *$/.test(description) === true) || (/^[a-zA-Z ]+$/.test(description) === false) || typeof name !== 'string') {
      return res.status(400).json({ message: 'Please provide a valid meal name' });
    }
    // trim empty spaces at the beginning and the end of the string
    name = name.trim();
    description = description.trim();
    // remove extra spaces in a string
    name = name.replace(/  +/g, ' ');
    description = description.replace(/  +/g, ' ');
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

  async updateMeal(req, res) {
    const { mealId } = req.params;
    let { price, name, description } = req.body;

    if ((Number.isNaN(Number(price))) === true || (/^ *$/.test(price) === true)) {
      return res.status(401).json({ message: 'Please provide a valid meal price' });
    }
    if ((/^ *$/.test(name) === true) || (/^[a-zA-Z ]+$/.test(name) === false) || typeof name !== 'string') {
      return res.status(400).json({ message: 'Please provide a valid meal name' });
    }
    if ((/^ *$/.test(description) === true) || (/^[a-zA-Z ]+$/.test(description) === false) || typeof name !== 'string') {
      return res.status(400).json({ message: 'Please provide a valid description name' });
    }
    if ((Number.isNaN(Number(mealId))) === true || (/^ *$/.test(mealId) === true)) {
      return res.status(401).json({ message: 'Provide a valid meal id' });
    }
    // remove extra spaces in a string
    name = name.trim();
    description = description.trim();
    // remove extra spaces in a string
    name = name.replace(/  +/g, ' ');
    description = description.replace(/  +/g, ' ');
    // get the meal to update
    const meal = await Meal.findById(mealId);
    if (!meal) { return res.status(422).json({ message: 'Meal does not exist' }); }
    if (req.decoded.id !== meal.userId && req.decoded.role !== 'superUser') {
      return res.status(401).json({ message: 'You cannot update meal you did not add' });
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
    if ((Number.isNaN(Number(mealId))) === true || (/^ *$/.test(mealId) === true)) {
      return res.status(401).json({ message: 'provide a valid meal id' });
    }
    const meal = await Meal.findById(mealId);
    if (!meal) { return res.status(422).json({ message: 'Meal does not exist' }); }
    if (req.decoded.id !== meal.userId && req.decoded.role !== 'superUser') {
      return res.status(401).json({ message: 'You cannot delete meal you did not add' });
    }
    await meal.destroy();
    return res.status(200).json({ message: 'Meal successfully deleted' });
  }
}
