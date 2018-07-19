
import bcrypt from 'bcryptjs';
import sequelize from 'sequelize';
import model from '../models/index';
import tokenizer from '../helpers/tokenGenerator';

const { Op } = sequelize;
const { User, notification } = model;

/**
 * @class userController
 * @description create a user, signin a user update a user to admin
 *  send resetLink, send notification a menu is set
 */
export default class userController {
  /**
 * @method createUser
 * @param { object } req An object containing user details like name, username, email
 * @param {object} res A response containing the user
 * @returns { object } returns the user
 * @description It takes req containing user object and create the user and then returns the user
 */
  async createUser(req, res) {
    const {
      name, username, email, role
    } = req.body;
    let { password } = req.body;
    password = await new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) reject(err);
        resolve(hash);
      });
    });
    const user = await User.create({
      name, username, password, email, role
    });
    if (!user) {
      return res.status(442).json({ message: 'Error signing up' });
    }
    const token = new tokenizer(user).getToken();
    user.token = token;
    return res.status(201).json({
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      role: user.role,
      token,
      image: user.image
    });
  }

  /**
 * @method login
 * @param { object } req An object containing password and username
 * @param {object} res A response containing the user
 * @returns { object } returns the user
 * @description It takes req containing user object and create the user and then returns the user
 */
  async login(req, res) {
    const { username, password } = req.body;
    const user = await User.findOne({
      where: { username }
    });
    if (!user) { return res.status(401).json({ message: 'Wrong credentials' }); }
    bcrypt.compare(password, user.password, (err, match) => {
      if (match) {
        const token = new tokenizer(user).getToken();
        return res.status(200).json({
          id: user.id,
          message: 'succesful login',
          token,
          username: user.username,
          role: user.role,
          image: user.image
        });
      }
      return res.status(401).json({ message: 'Wrong credentials' });
    });
  }

  /**
   * @param  {token} req upgrade user to an admin
   * @param  {user} res user is now an admin
   */
  async adminSignup(req, res) {
    const { id } = req.decoded;
    const user = await User.findById(id);
    if (!user) { return res.status(401).json({ message: 'User not found' }); }
    if (user.role === 'admin') {
      return res.status(499).json({ message: 'You are already an admin' });
    }
    const role = 'admin';
    const setAdmin = await user.update({ role });
    if (!setAdmin) { return res.status(401).json({ message: 'Update failed' }); }
    const message = `${setAdmin.username} is set as admin`;
    const token = new tokenizer(setAdmin).getToken();
    return res.status(201).json({ message, setAdmin, token });
  }

  /**
   * @param  {token} req  send a request that get a user from the token
   * @param  {user} res response containing the user
   */
  async getUser(req, res) {
    const { id } = req.decoded;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'users not found' });
    }
    return res.status(200).json(user);
  }

  /**
   * @param  {object} req email or username
   * @param  {link} res send resetpassword link
   * @description It takes a valid email address or
   *   username and sends a resetPassword link to user email
   */
  async sendResetLink(req, res, next) {
    const { emailOrUsername } = req.body;
    try {
      const verify = await User.findOne({
        where: {
          [Op.or]: [
            { username: emailOrUsername },
            { email: emailOrUsername }
          ]
        }
      });
      if (!verify) { return res.json({ message: 'Record not found' }); }
      const token = new tokenizer(verify).getToken();
      req.body.user = verify;
      req.body.token = token;
      next();
    } catch (err) { return res.json(err); }
  }

  /**
   * @param  {object} req password and decoded id
   * @param  {newPassword} res send new password
   * @description It takes a new password from user and set it as user's password
   */
  async resetPassword(req, res) {
    const { id } = req.decoded;
    let { password } = req.body;
    if (!password) { return res.status(401).json({ message: 'Enter new password' }); }
    if (/^\S+$/g.test(password) === false) {
      return res.status(401).json({ message: 'Password cannot contain a space' });
    }
    try {
      const user = await User.findById(id);
      if (!user) { return res.status(401).json({ message: 'User not found' }); }
      // Hasah password using bcrypt
      password = await new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) reject(err);
          resolve(hash);
        });
      });
      // change password
      const update = await user.update({ password });
      if (update) {
        return res.status(201).json({ success: 'Password changed', user: update });
      }
      return res.status(401).json({ message: 'Password reset failed' });
    } catch (err) { return res.json(err); }
  }

  /**
   * @param  {object} req decoded id from token
   * @param  {newPassword} res send notification
   * @description It sendes notification to users that today's menu is set
   */
  async userNotification(req, res) {
    const { userId } = req.decoded;
    const notifications = await notification.findAll({
      where: {
        [Op.or]: [
          { userId },
          { userId: null }
        ]
      },
      order: [
        ['createdAt', 'DESC']
      ]
    });
    return res.status(201).json(notifications);
  }

  /**
   * @param  {object} req payloads from token
   * @param  {newPassword} res new token
   * @description It takes payload from existing token and assign a new token to it
   *              the token then have a fresh expire time
   */
  async refreshToken(req, res) {
    const token = new tokenizer(req.decoded).getToken();
    return res.status(200).json({
      username: req.decoded.username,
      role: req.decoded.role,
      id: req.decoded.id,
      image: req.decoded.image,
      token
    });
  }

  /**
   * @param  {object} req object containing user info. to update
   * @param  {user} res updated user
   */
  async userUpdate(req, res) {
    const { id } = req.decoded;
    const user = await User.findById(id);
    if (!user) { return res.status(401).json({ message: 'User not found' }); }
    const { name } = req.body;
    let { image } = req.body;
    if (!name || (/^[a-zA-Z ]+$/.test(name) === false) || typeof name !== 'string' || /^ *$/.test(name) === true) {
      return res.status(401).json({ message: 'valid name is required' });
    }
    if (req.files && req.files.length !== 0) {
      image = req.files[0].url;
    }
    const update = await user.update({ name, image });
    const token = new tokenizer(update).getToken();
    const userUpdate = {
      username: update.username,
      role: update.role,
      id: update.id,
      image: update.image,
      token
    };
    return res.status(201).json(userUpdate);
  }
}
