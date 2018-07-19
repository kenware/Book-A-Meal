import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const secret = process.env.SECRET;

export default class tokenizer {
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
}
