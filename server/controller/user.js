import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import sequelize from 'sequelize';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import model from '../models/index';

dotenv.config();
// import secret from '../config/config';
const secret = process.env.SECRET;
const passEmail = process.env.PASS;
const userEmail = process.env.USER;
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
    return res.status(201).json({ message, setAdmin });
  }
  async getUser(req, res) {
    const { id } = req.decoded;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'users not found' });
    }
    return res.status(200).json(user);
  }
  async sendResetLink(req, res) {
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
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        // host: 'bookmeals.herokuapp.com',
        port: 465,
        // port: 5000,
        secure: true, // use SSL
        auth: {
          user: userEmail,
          pass: passEmail// 'ken_waredehydrogenase'
        }
      });
      const mailoutput = `<html>\n\
      <body>\n\
      <table>\n\
      <tr>\n\
      <td>Title: </td><h2> Book-A-Meal</h2><td></td>\n\
      <td>Title: </td>Reset Password <td></td>\n\
      </tr>\n\
      <tr>\n\
      <td>Email: </td><td>${verify.email}</td>\n\
      </tr>\n\
      <tr>\n\
      <td>MN: </td> Click the link bellow to reset your password<td></td>\n\
      </tr>\n\
      <tr>\n\
      <td>Messge: </td> Dere ${verify.name} reset your password 
      <a href='${req.headers.host}/passwordreset/${token}'> here </a>. If the above link do not 
      work. Pkease follow this link ${req.headers.host}/passwordreset/${token} <td></td>\n\
      </tr>\n\
      </table></body></html>`;
      // setup e-mail data
      const mailOptions = {
        from: '"Book-A-Meal "<no-reply@Book-A-Meal.com>', // sender address (who sends)
        to: verify.email, // list of receivers (who receives)
        subject: 'Reset Password', // Subject line
        // text: 'Hello world ', // plaintext body
        html: mailoutput // html body
      };

      // send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.json(error);
        }

        return res.json(`Message sent: ${info.response}`);
      });
    } catch (err) { return res.json(err); }
  }
  async resetPassword(req, res) {
    const { id } = req.decoded;
    const { password } = req.body;
    if (!password) { return res.status(401).json({ message: 'Enter new password' }); }
    if (/^\S+$/g.test(password) === false) {
      return res.status(401).json({ message: 'Password cannot contain a space' });
    }
    try {
      const user = await User.findById(id);
      if (!user) { return res.status(401).json({ message: 'User not found' }); }
      const update = await user.update({ password });
      if (update) {
        return res.status(201).json({ message: 'Password changed' });
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
}
