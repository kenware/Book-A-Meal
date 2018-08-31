import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();
const secret = process.env.SECRET;

export default class generator {
  constructor(payload) {
    this.payload = payload;
  }

  getToken() {
    return jwt.sign(
      {
        id: this.payload.id,
        username: this.payload.username,
        role: this.payload.role,
        image: this.payload.image
      },
      secret, { expiresIn: 86400 }
    );
  }
  getHashpassword(password) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) reject(err);
        resolve(hash);
      });
    });
  }
}
