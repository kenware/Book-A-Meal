import model from '../models/meal';
const meals = new model();

export default class mealController {

  getMeals(req, res) {
    const meal = meals.getMeals()
    if (meal.length > 0) {     
      return res.status(200).json(meal);
    }
    return res.status(404).json('meals not found');
  }

  getOneMeal(req, res) {
    const mealId = parseInt(req.params.mealId, 10);
    let meal = meals.getOneMeal(mealId);
    if (!meal) {
      return res.status(404).json('meal not found');
    }
    return res.status(201).json(meal);
  }

  createMeals(req, res) {
    let { price,name,description } = req.body;
    if (!price || !name || !description) {
      return res.status(404).json('all the meal field are required');
    }
    const allMeal = meals.getMeals()
    //autogenerate meal id
    const id = allMeal.reverse()[0].id + 1;
    for (const eachMeal of allMeal) {
      if (eachMeal.name === name) {
        return res.status(422).json('meal aready exist');
      }
    }
    //id = parseInt(id);
    const meal = meals.addMeal(id,name,price,description);
    const message = 'meal successfuly created';
    return res.status(200).json({
      message,
      meal
    });
  }

  updateMeal(req, res) {
    const mealId = parseInt(req.params.mealId, 10);
    const allMeal = meals.getMeals()
    for (let meal of allMeal) {
      if (meal.id === mealId) {
         meal = meals.updateMeal(req.body,meal)
      
        const message = 'successfuly updated';
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
    const allMeal = meals.getMeals()
    for (const eachMeal of allMeal) {
      if (eachMeal.id === mealId) {      
        meals.deleteMeal(eachMeal)
        return res.status(201).json('meal successfully deleted');
      }
    }
    return res.status(404).json('meal not found');
  }
}
