export default class mealFilter {
  constructor(mealArray) {
    this.mealArray = mealArray;
  }

  getmealList() {
    return this.mealArray.map(meal => meal.id);
  }

  checkMeals(allMenuMealId, allIncomingMealId) {
    for (const mealId of allIncomingMealId) {
      if (allMenuMealId.indexOf(mealId) === -1) {
        return false;
      }
    }
    return true;
  }
  getPrice(meals, id) {
    let totalPrice = 0;
    let menuMeals;

    if (id) {
      menuMeals = meals.filter(meal => meal.menuId === id);
    } else {
      menuMeals = meals;
    }

    for (const meal of menuMeals) {
      totalPrice += meal.totalPrice;
    }
    return totalPrice;
  }
}
