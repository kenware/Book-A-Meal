import dumyData from '../dumydata/store';
const meals = dumyData.meals;

export default class mealController {
  constructor(id, name, price, description) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
  }

  getMeals(req, res) {
    if (meals.length > 0) {
      return res.status(200).json(meals);
    }
    return res.status(404).json('meals not found');
  }

  getOneMeal(req, res) {
    const mealId = parseInt(req.params.mealId, 10);
    let meal = meals.find(one => one.id === mealId);
    if (!meal) {
      return res.status(404).json('meal not found');
    }
    const {id, price, name,description } = meal;
    //new instance of mealController
    meal = new mealController(id,name,price,description)
    return res.status(201).json(meal);
  }

  createMeals(req, res) {
    let { price,name,description } = req.body;
    let { id } = req.body;
    if (!price || !name || !id) {
      return res.status(404).json('all the meal field are required');
    }
    for (const eachMeal of meals) {
      if (eachMeal.id === parseInt(id)) {
        return res.status(422).json('meal aready exist');
      }
    }
    id = parseInt(id);
    const meal = new mealController(id,name,price,description)
    meals.push(meal);
    const message = 'meal successfuly created';
    return res.status(200).json({
      message,
      meal
    });
  }

  updateMeal(req, res) {
    const mealId = parseInt(req.params.mealId, 10);
    const { name,price,description } = req.body;
    for (let meal of meals) {
      if (meal.id === mealId) {
        meal.name = name || meal.name;
        meal.price = price || meal.price;
        meal.description = description || meal.description;
        const message = 'successfuly updated';
        //new instance of the class
        meal = new mealController(meal.id,meal.name,meal.price,meal.description);
        res.status(201).json({
          message,
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
        const index = meals.indexOf(eachMeal);
        meals.splice(index, 1);
        return res.status(201).json('meal successfully deleted');
      }
    }
    return res.status(404).json('meal not found');
  }
}
