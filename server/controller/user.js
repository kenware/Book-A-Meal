import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import sequelize from 'sequelize';
import model from '../models/index';

dotenv.config();
const secret = process.env.SECRET;
const { Op } = sequelize;
const { User, notification } = model;

export default class userController {
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
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role,
        image: user.image
      },
      secret, { expiresIn: 86400 }
    );
    return res.status(201).json({
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      role: user.role,
      token
    });
  }

  async login(req, res) {
    const { username, password } = req.body;
    const user = await User.findOne({
      where: { username }
    });
    if (!user) { return res.status(401).json({ message: 'Wrong credentials' }); }
    bcrypt.compare(password, user.password, (err, match) => {
      if (match) {
        const token = jwt.sign(
          {
            id: user.id,
            username: user.username,
            role: user.role,
            image: user.image
          },
          secret, { expiresIn: 86400 }
        );
        return res.status(200).json({
          id: user.id,
          message: 'succesful login',
          token,
          username: user.username,
          role: user.role
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
    const token = jwt.sign(
      {
        id: setAdmin.id,
        username: setAdmin.username,
        role: setAdmin.role,
        image: setAdmin.image
      },
      secret, { expiresIn: 86400 }
    );
    return res.status(201).json({ message, setAdmin, token });
  }

  async getUser(req, res) {
    const { id } = req.decoded;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'users not found' });
    }
    return res.status(200).json(user);
  }
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
      const token = jwt.sign(
        { id: verify.id, username: verify.username, role: verify.role },
        secret, { expiresIn: 86400 }
      );
      req.body.user = verify;
      req.body.token = token;
      next();
    } catch (err) { return res.json(err); }
  }
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
  async refreshToken(req, res) {
    const token = jwt.sign(
      {
        username: req.decoded.username,
        role: req.decoded.role,
        id: req.decoded.id,
        image: req.decoded.image
      },
      secret, { expiresIn: 86400 }
    );
    return res.status(200).json({
      username: req.decoded.username,
      role: req.decoded.role,
      id: req.decoded.id,
      image: req.decoded.image,
      token
    });
  }
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
    return res.status(201).json(update);
  }
}
