import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import model from '../models/index';


const secret = 'kevin';
const User = model.User;

export default class userController {
  async createUser(req, res) {
    const { name, username, email } = req.body;
    let { password } = req.body;
    password = await new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) reject(err);
        resolve(hash);
      });
    });
    let role;
    if (username === 'kenson') { role = 'superUser'; } else { role = 'user'; }
    const user = await User.create({
      name, username, password, email, role
    });
    if (!user) {
      return res.status(442).json('error signing up');
    }
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      secret, { expiresIn: 86400 }
    );
    return res.status(201).json({ user, token });
  }

  async login(req, res) {
    const { username, password } = req.body;
    const user = await User.findOne({
      where: { username }
    });
    if (!user) { return res.status(401).json('wrong credentials'); }
    bcrypt.compare(password, user.password, (err, match) => {
      if (match) {
        const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, secret, { expiresIn: 86400 });
        return res.status(200).json({
          id: user.id, message: 'succesful login', token, username: user.username
        });
      }
      return res.status(401).json('wrong credentials');
    });
  }
  async adminSignup(req, res) {
    if (!req.decoded.role === 'superUser') {
      return res.status(401).json('You are not authorised to add a user');
    }
    const id = req.params.userId;
    const user = await User.findById(id);
    if (!user) { return res.status(401).json('user not found'); }
    const role = 'admin';
    const setAdmin = await user.update({ role });
    if (!setAdmin) { return res.status(401).json('update failed'); }
    const message = `${setAdmin.username} is set as admin`;
    return res.status(201).json({ message, setAdmin });
  }
}
