import dumyData from '../dumydata/store';
const meals = dumyData.meals;

export default class Meal {

    getMeals(){
       return meals;
    }

    getOneMeal(mealId){
      this.mealId = mealId;
      return  meals.find(one => one.id === mealId);
    }

    addMeal(id, name, price, description){
      const meal = { id,name,price,price,description }
      meals.push(meal);
      return meal;
    }
    updateMeal(newMeal,existingMeal){
      const { name,price,description } = newMeal;
      existingMeal.name = name || existingMeal.name;
      existingMeal.price = price || existingMeal.price;
      existingMeal.description = description || existingMeal.description;
      return existingMeal;
    }
    deleteMeal(meal){
      const index = meals.indexOf(meal);
      meals.splice(index,1);
    }
  }