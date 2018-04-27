import meals from '../models/meal';


export default class mealController {
  getMeals(req, res) {
    if (meals.length > 0) {
      return res.status(200).json(meals);
    }
    return res.status(404).json('meals not found');
  }
  createMeals(req, res) {
    const meal = req.body;
    const { price, name } = meal;
    let { id } = meal;
    if (!price || !name || !id) {
      return res.status(404).json('all the meal field are required');
    }
    for (const eachMeal of meals) {
      if (eachMeal.id === parseInt(id)) {
        return res.status(422).json('meal aready exist');
      }
    }
    id = parseInt(id);
    meal.id = id;
    meals.push(meal);
    const message = 'meal successfuly created';
    return res.status(200).json({
      message,
      meal
    });
  }
  updateMeal(req, res) {
    const mealId = parseInt(req.params.mealId, 10);
    const {
      name, price, description
    } = req.body;
    for (const meal of meals) {
      if (meal.id === mealId) {
        meal.name = name || meal.name;
        meal.price = price || meal.price;
        meal.description = description || meal.description;
        res.status(201).json({
          message: 'successfuly updated',
          meal
        });
      }
    }
    return res.status(404).json('meals not found');
  }
  deleteMeal(req, res) {
    const mealId = parseInt(req.params.mealId, 10);
    for (const eachMeal of meals) {
      if (eachMeal.id === mealId) {
        meals.splice(mealId - 1, 1);
        return res.status(201).json('meal successfully deleted');
      }
    }
    return res.status(404).json('meal not found');
  }
}
