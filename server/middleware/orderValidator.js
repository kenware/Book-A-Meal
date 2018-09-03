
export default class orderMiddleware {
  async order(req, res, next) {
    const {
      menuId,
      quantity,
      mealId,
      address
    } = req.body;
    if (!menuId) { return res.status(401).json({ message: 'menuId is required' }); }
    if (!quantity) { return res.status(401).json({ message: 'quantity is required' }); }
    if (!mealId) { return res.status(401).json({ message: 'mealId is required' }); }
    if (!address || typeof address !== 'string') {
      return res.status(401).json({ message: 'address is required' });
    }
    if ((Number.isNaN(Number(menuId))) === true || (/^ *$/.test(menuId) === true)) {
      return res.status(401).json({ message: 'Please provide a valid menu id' });
    }
    if ((Number.isNaN(Number(quantity))) === true || (/^ *$/.test(quantity) === true)) {
      return res.status(401).json({ message: 'Please provide a valid quantity' });
    }
    if ((Number.isNaN(Number(mealId))) === true || (/^ *$/.test(mealId) === true)) {
      return res.status(401).json({ message: 'Please provide a valid meal id' });
    }
<<<<<<< HEAD
=======

    for (const meal of meals) {
      if ((isNaN(meal.menuId)) === true || (/^ *$/.test(meal.menuId) === true)) {
        return res.status(401).json({ message: 'Please provide a valid menu id' });
      }
      if ((isNaN(meal.quantity)) === true || (/^ *$/.test(meal.quantity) === true)) {
        return res.status(401).json({ message: 'Please provide a valid quantity' });
      }
      if ((isNaN(meal.mealId)) === true || (/^ *$/.test(meal.mealId) === true)) {
        return res.status(401).json({ message: 'Please provide a valid meal id' });
      }
    }
>>>>>>> bg(fix): Fixed my test and modified my controller
    next();
  }

  async updateOrder(req, res, next) {
<<<<<<< HEAD
    const {
      quantity,
      address
    } = req.body;
    if (address && typeof address !== 'string') {
      return res.status(401).json({ message: 'Please provide a valid address' });
    }
    if (quantity) {
      if ((Number.isNaN(Number(quantity))) === true || (/^ *$/.test(quantity) === true)) {
        return res.status(401).json({ message: 'Please provide a valid quantity' });
      }
=======
    const { meals, address } = req.body;
    const { orderId } = req.params;

    if (address && typeof address !== 'string') {
      return res.status(401).json({ message: 'Please provide a valid address' });
    }
    if (meals.length < 1) {
      return res.status(401).json({ message: 'Meals not found' });
    }

    for (const meal of meals) {
      if ((isNaN(meal.quantity)) === true || (/^ *$/.test(meal.quantity) === true)) {
        return res.status(401).json({ message: 'Please provide a valid quantity' });
      }
      if ((isNaN(orderId)) === true || (/^ *$/.test(orderId) === true)) {
        return res.status(401).json({ message: 'Provide a valid order id' });
      }
      if ((isNaN(meal.mealId)) === true || (/^ *$/.test(meal.mealId) === true)) {
        return res.status(401).json({ message: 'Please provide a valid meal id' });
      }
>>>>>>> bg(fix): Fixed my test and modified my controller
    }
    next();
  }
}
