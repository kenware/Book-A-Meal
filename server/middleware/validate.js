
import jwt from 'jsonwebtoken';
import validator from 'validator';
import dotenv from 'dotenv';
import model from '../models';

dotenv.config();
const secret = process.env.SECRET;
const { User } = model;

export default class middleware {
  /**
 * @method authUser
 * @param {string} data - A token
 * @returns { null } returns Unauthorized Access if token is undfefined
 * @returns { expired } returns Please login
 * @description used to access authenticated route
 * @description if token is valid, decode the payload and pass it controller
 */
  async authUser(req, res, next) {
    const token = req.headers.authorization || req.headers['x-access-token'];
    if (!token || token === 'null') {
      return res.status(401).json({ message: 'Unauthorized Access' });
    }

    jwt.verify(token, secret, (err, result) => {
      if (err) {
        return res.status(401).json({ message: 'Please login!' });
      }
      req.decoded = result;
      next();
    });
  }

  /**
 * @method authAdmin
 * @param {string} data - A token
 * @returns { null } returns Unauthorized Access if token is undfefined
 * @returns { expired } returns Please login
 * @description used to access authenticated route
 * @description if token is valid, decode the payload and pass it controller
 */
  async authAdmin(req, res, next) {
    const token = req.headers.authorization || req.headers['x-access-token'];
    if (!token || token === 'null') {
      return res.status(401).json({ message: 'Unauthorized Access' });
    }

    jwt.verify(token, secret, (err, result) => {
      if (err) {
        return res.status(401).json({ message: 'Please login!' });
      }
      if (result.role !== 'admin') {
        return res.status(401).json({ message: 'Unauthorized Access' });
      }
      req.decoded = result;
      next();
    });
  }

  /**
 * @method signup
 * @param {string} req - A user object
 * @description if the user details is valid, pass it controller
 */
  async signup(req, res, next) {
    let { name, role } = req.body;
    const { email, username, password } = req.body;
    if (!username || /^[a-z0-9_]+$/i.test(username) === false) {
      return res.status(401).json({ message: 'Valid username is required' });
    }
    if (!name || (/^[a-zA-Z ]+$/.test(name) === false) || typeof name !== 'string' || /^ *$/.test(name) === true) {
      return res.status(401).json({ message: 'valid name is required' });
    }
    if (!email) { return res.status(401).json({ message: 'Email is required' }); }
    if (!password) { return res.status(401).json({ message: 'Password is required' }); }
    if (/^\S+$/g.test(password) === false) { return res.status(401).json({ message: 'Password cannot contain a space' }); }
    if (!validator.isEmail(email)) { return res.status(401).json({ message: 'Invalid email' }); }
    if (password.length < 5) { return res.status(401).json({ message: 'Password must be greater than five character' }); }
    const veryUsername = await User.findOne({
      where: { username }
    });
    if (veryUsername) { return res.status(401).json({ message: 'Username already exist' }); }

    const veryEmail = await User.findOne({
      where: { email }
    });
    if (veryEmail) { return res.status(401).json({ message: 'Email already exist' }); }
    if (username.length < 4 || password.length < 4) {
      return res.status(401).json({ message: 'Each field must be a minimum of 4 characters' });
    }
    if (role && role !== 'admin') {
      return res.status(401).json({ message: 'User role should be admin' });
    }
    if (!role) { role = 'user'; }
    name = name.trim();
    req.body.role = role;
    req.body.name = name;
    req.body.username = username;
    req.body.password = password;
    next();
  }

  /**
 * @method signin
 * @param {string} req - A username and password
 * @description if the user details is valid, pass it controller
 */
  async signin(req, res, next) {
    const { username, password } = req.body;
    if (!username) { return res.status(401).json({ message: 'Username is required' }); }
    if (!password) { return res.status(401).json({ message: 'Password is required' }); }
    next();
  }

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
