
import jwt from 'jsonwebtoken';
import validator from 'validator';
import model from '../models';

const secret = 'kevin';
// const Op = sequelize.O;
const { User } = model;

export default class middleware {
  async authUser(req, res, next) {
    const token = req.headers.authorization || req.headers['x-access-token'];
    if (!token) {
      return res.status(401).json('Unauthorized Access');
    }

    jwt.verify(token, secret, (err, result) => {
      if (err) {
        return res.status(401).json('Please login!');
      }
      req.decoded = result;
      next();
    });
  }
  async authAdmin(req, res, next) {
    const token = req.headers.authorization || req.headers['x-access-token'];
    if (!token) {
      return res.status(401).json('Unauthorized Access');
    }

    jwt.verify(token, secret, (err, result) => {
      if (err) {
        return res.status(401).json('Please login!');
      }
      if (result.role !== 'admin' && result.role !== 'superUser') {
        return res.status(401).json('Unauthorized Access');
      }
      req.decoded = result;
      next();
    });
  }
  async signup(req, res, next) {
    const {
      username, name, email, password
    } = req.body;
    if (!username) { return res.status(401).json('username is required'); }
    if (!email) { return res.status(401).json('email is required'); }
    if (!password) { return res.status(401).json('password is required'); }
    if (!name) { return res.status(401).json('name is required'); }
    if (!validator.isEmail(email)) { return res.status(401).json('invalid email'); }

    const veryUsername = await User.findOne({
      where: { username }
    });
    if (veryUsername) { return res.status(401).json('username already exist'); }

    const veryEmail = await User.findOne({
      where: { email }
    });
    if (veryEmail) { return res.status(401).json('email already exist'); }
    if (username.length < 4 || password.length < 4) {
      return res.status(401).json('each field must be a minimum of 4 characters');
    }
    next();
  }
  async signin(req, res, next) {
    const { username, password } = req.body;
    if (!username) { return res.status(401).json('username is required'); }
    if (!password) { return res.status(401).json('password is required'); }
    next();
  }

  async menu(req, res, next) {
    const { title } = req.body;
    let { mealId, orderBefore } = req.body;
    // Title field cannot be empty
    if (!title) { return res.status(401).json('title is required'); }
    // orderBefore field cannot be empty
    if (!orderBefore) {
      return res.status(401)
        .json('specify the time users should be able to make an order');
    }
    if (!mealId) {
      return res.status(401)
        .json('please select a meal to set menu');
    }
    mealId = Number(mealId);
    // pass the mealId and orderBefore to req
    orderBefore = Number(orderBefore);
    req.body.orderBefore = orderBefore;
    req.body.mealId = mealId;
    next();
  }
  async order(req, res, next) {
    const { menuId, quantity, mealId, address } = req.body;
    if (!menuId) { return res.status(401).json('menuId is required'); }
    if (!quantity) { return res.status(401).json('quantity is required'); }
    if (!mealId) { return res.status(401).json('mealId is required'); }
    if (!address) { return res.status(401).json('address is required'); }
    next();
  }
}
