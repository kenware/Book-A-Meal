export default class mealFilter {
  constructor(mealArray) {
    this.mealArray = mealArray;
  }
  /**
 * @method getmealList
 * @description get meal id from an array of object
 */
  getmealList() {
    return this.mealArray.map(meal => meal.id);
  }

  /**
 * @method checkMeals
 * @description Check that an array is a subset of an array
 */
  checkMeals(allIdList, IncomingIdList) {
    for (const mealId of IncomingIdList) {
      if (allIdList.indexOf(mealId) === -1) {
        return false;
      }
    }
    return true;
  }

  /**
 * @method getPrice
 * @description get total price of an order
 */
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
