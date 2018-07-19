
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
    next();
  }

  async updateOrder(req, res, next) {
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
    }
    next();
  }
}
