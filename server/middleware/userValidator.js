
import jwt from 'jsonwebtoken';
import validator from 'validator';
import dotenv from 'dotenv';
import model from '../models';

dotenv.config();
const secret = process.env.SECRET;
const { User } = model;

export default class userMiddleware {
  /**
 * @method signup
 * @param {string} req - A user object
 * @description if the user details is valid, pass it user signupAsyncMiddleware
 */
  signup(req, res, next) {
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
 * @method signupAsyncMiddleware
 * @param {string} req - A username and password
 * @description if the user details is valid, pass it controller
 */
  async signupAsyncMiddleware(req, res, next) {
    const { email, username } = req.body;
    const veryUsername = await User.findOne({
      where: { username }
    });
    if (veryUsername) { return res.status(401).json({ message: 'Username already exist' }); }

    const veryEmail = await User.findOne({
      where: { email }
    });
    if (veryEmail) { return res.status(401).json({ message: 'Email already exist' }); }
    next();
  }

  /**
 * @method userUpdateAsyncMiddleware
 * @param {string} req - A name
 * @description if the user details is valid, pass it controller
 */
  async userUpdateAsyncMiddleware(req, res, next) {
    const { name } = req.body;
    const { id } = req.decoded;

    const user = await User.findById(id);
    if (!user) { return res.status(401).json({ message: 'User not found' }); }
    if (!name || (/^[a-zA-Z ]+$/.test(name) === false) || typeof name !== 'string' || /^ *$/.test(name) === true) {
      return res.status(401).json({ message: 'valid name is required' });
    }
    req.body.user = user;
    next();
  }

  /**
 * @method signin
 * @param {string} req - A username and password
 * @description if the user details is valid, pass it controller
 */
  signin(req, res, next) {
    const { username, password } = req.body;
    if (!username) { return res.status(401).json({ message: 'Username is required' }); }
    if (!password) { return res.status(401).json({ message: 'Password is required' }); }
    next();
  }
}
