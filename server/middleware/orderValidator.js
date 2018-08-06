
export default class orderMiddleware {
  async order(req, res, next) {
    const {
      meals,
      address
    } = req.body;
    if (!address || typeof address !== 'string') {
      return res.status(401).json({ message: 'address is required' });
    }
    if (meals.length < 1) {
      return res.status(401).json({ message: 'Meals not found' });
    }
    meals.forEach((meal) => {
      if ((Number.isNaN(Number(meal.menuId))) === true || (/^ *$/.test(meal.menuId) === true)) {
        return res.status(401).json({ message: 'Please provide a valid menu id' });
      }
      if ((Number.isNaN(Number(meal.quantity))) === true || (/^ *$/.test(meal.quantity) === true)) {
        return res.status(401).json({ message: 'Please provide a valid quantity' });
      }
      if ((Number.isNaN(Number(meal.totalPrice))) === true || (/^ *$/.test(meal.totalPrice) === true)) {
        return res.status(401).json({ message: 'Total Price must be a number' });
      }
      if ((Number.isNaN(Number(meal.mealId))) === true || (/^ *$/.test(meal.mealId) === true)) {
        return res.status(401).json({ message: 'Please provide a valid meal id' });
      }
    });
    next();
  }

  async updateOrder(req, res, next) {
    const {
      meals,
      address
    } = req.body;
    if (address && typeof address !== 'string') {
      return res.status(401).json({ message: 'Please provide a valid address' });
    }
    if (meals.length < 1) {
      return res.status(401).json({ message: 'Meals not found' });
    }
    meals.forEach((meal) => {
      if ((Number.isNaN(Number(meal.quantity))) === true || (/^ *$/.test(meal.quantity) === true)) {
        return res.status(401).json({ message: 'Please provide a valid quantity' });
      }
      if ((Number.isNaN(Number(meal.totalPrice))) === true || (/^ *$/.test(meal.totalPrice) === true)) {
        return res.status(401).json({ message: 'Total Price must be a number' });
      }
      if ((Number.isNaN(Number(meal.mealId))) === true || (/^ *$/.test(meal.mealId) === true)) {
        return res.status(401).json({ message: 'Please provide a valid meal id' });
      }
    });
    next();
  }
}
