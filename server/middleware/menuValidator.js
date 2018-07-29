

export default class menuMiddleware {
  /**
 * @method menu
 * @param {string} req - orderBefore, title
 * @description if the parameter is valid, pass it controller
 */
  async menu(req, res, next) {
    const { title, mealId } = req.body;
    let { orderBefore } = req.body;
    // Title field cannot be empty
    if (!title) { return res.status(401).json({ message: 'title is required' }); }
    if ((/^ *$/.test(title) === true) || typeof title !== 'string') {
      return res.status(400).send({ message: 'Please provide a valid title' });
    }
    // orderBefore field cannot be empty
    if (!orderBefore) {
      return res.status(401).json({ message: 'Specify the time users should be able to make an order' });
    }
    if ((Number.isNaN(Number(orderBefore))) === true || (/^ *$/.test(orderBefore) === true)) {
      return res.status(401).json({ message: 'Please provide a valid time in hours' });
    }
    if (!mealId) {
      return res.status(401)
        .json({ message: 'please select a meal to set menu' });
    }
    if (orderBefore > 24) {
      return res.status(401).json({ message: 'Expire time cannot be more than 24 hours' });
    }
    if (Number.isNaN(Number(mealId)) || (/^ *$/.test(mealId) === true)) {
      return res.status(401).json({ message: 'Enter a valid meal id' });
    }
    // pass the mealId and orderBefore to req
    orderBefore = Number(orderBefore);
    req.body.orderBefore = orderBefore;
    req.body.mealId = mealId;
    next();
  }
}
