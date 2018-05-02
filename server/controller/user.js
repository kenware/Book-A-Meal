import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import model from '../models/index';


const secret = 'kevin';
const User = model.User;
export default class userController {
  
  
  
  
  
    async createUser(req, res) {
    const { name, username, email } = req.body;
    let { password }  = req.body;
    password = await new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) reject(err)
          resolve(hash)
        });
    })
    const role = 'user';
    const user = await User.create({
        name, username, password, email, role
      });
      if (!user) {
        return res.status(442).json('error signing up');
      }
      const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, 
          secret, { expiresIn: 86400 });
      return res.status(201).json({ user, token });

  }
}
