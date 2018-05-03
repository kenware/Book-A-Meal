

import model from '../models/index';

const Meal = model.Meal;

export default class mealController {
  async getMeals(req, res) {
    if (!req.decoded.role === 'admin' || !req.decoded.role === 'superUser') {
      return res.status(401).json('Unauthorised access');
    }
    const meals = await Meal.findAll();
    return res.status(200).json(meals);
  }
  async addMeal(req, res) {
    const { price, name, description } = req.body;
    if (!price) { return res.status(401).json('price field is required'); }
    if (!name) { return res.status(401).json('name field is required'); }
    if (!description) { return res.status(401).json('description field is required'); }

    if (!req.decoded.role === 'admin' || !req.decoded.role === 'superUser') {
      return res.status(401).json('Unauthorised access');
    }
    const userId = req.decoded.id;
    let image;
    if (req.files.length !== 0) {
      image = req.files[0].url;
    } else {
      image = 'http://res.cloudinary.com/more-recipes/image/upload/v1515492424/img-upload/file-1515492419229-images4.jpg.jpg';
    }
    const meal = await Meal.create({
      name, price, description, image,userId
    });
    if (!meal) { return res.status(405).json('Error occured while creating meal'); }
    return res.status(201).json(meal);
  }
}
