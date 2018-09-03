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

  getPrice(meals) {
    let totalPrice = 0;
    for (const meal of meals) {
      const price = meal.price * meal.orderMealItems.quantity;
      meal.dataValues.totalPrice = price;
      totalPrice += price;
    }
    return totalPrice;
  }
}
