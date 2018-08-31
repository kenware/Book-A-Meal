

export default class mealMiddleware {
  /**
 * @method addMeal
 * @param {string} req - description, name, price
 * @description if the parameter is valid, pass it controller
 */
  addMeal(req, res, next) {
    let { description, name } = req.body;
    const { price } = req.body;

    // Input validation
    if (!price) { return res.status(401).json({ message: 'Price field is required' }); }
    if (!name) { return res.status(401).json({ message: 'Name field is required' }); }
    if (!description) { return res.status(401).json({ message: 'description field is required' }); }

    if ((isNaN(price)) === true || (/^ *$/.test(price) === true)) {
      return res.status(401).json({ message: 'Please provide a valid meal price' });
    }
    if ((/^ *$/.test(name) === true) || (/^[a-zA-Z ]+$/.test(name) === false) || typeof name !== 'string') {
      return res.status(400).json({ message: 'Please provide a valid meal name' });
    }
    if (typeof description !== 'string') {
      return res.status(400).json({ message: 'Please provide a valid meal description' });
    }
    // trim empty spaces at the beginning and the end of the string
    name = name.trim();
    description = description.trim();
    // remove extra spaces in a string
    req.body.name = name.replace(/  +/g, ' ');
    req.body.description = description.replace(/  +/g, ' ');
    next();
  }

  /**
 * @method updateMeal
 * @param {string} req - description, name, price
 * @description if the parameter is valid, pass it controller
 */
  updateMeal(req, res, next) {
    const { mealId } = req.params;
    let { name, description } = req.body;
    const { price } = req.body;

    if ((isNaN(price)) === true || (/^ *$/.test(price) === true)) {
      return res.status(401).json({ message: 'Please provide a valid meal price' });
    }
    if ((/^ *$/.test(name) === true) || (/^[a-zA-Z ]+$/.test(name) === false) || typeof name !== 'string') {
      return res.status(400).json({ message: 'Please provide a valid meal name' });
    }
    if ((/^ *$/.test(description) === true) || (/^[a-zA-Z ]+$/.test(description) === false) || typeof description !== 'string') {
      return res.status(400).json({ message: 'Please provide a valid description' });
    }
    if ((isNaN(mealId)) === true || (/^ *$/.test(mealId) === true)) {
      return res.status(401).json({ message: 'Provide a valid meal id' });
    }
    // remove extra spaces in a string
    name = name.trim();
    description = description.trim();
    // remove extra spaces in a string
    req.body.name = name.replace(/  +/g, ' ');
    req.body.description = description.replace(/  +/g, ' ');
    next();
  }
}

