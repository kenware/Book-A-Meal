
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import sequelize from 'sequelize';
import validator from 'validator';
import model from '../models';

const secret = 'kevin';
// const Op = sequelize.O;
const User = model.User;

export default class middleware {
  async auth(req, res, next) {
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
}
