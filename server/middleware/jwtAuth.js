
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const secret = process.env.SECRET;

export default class middleware {
  /**
 * @method authUser
 * @param {string} data - A token
 * @returns { null } returns Unauthorized Access if token is undfefined
 * @returns { expired } returns Please login
 * @description used to access authenticated route
 * @description if token is valid, decode the payload and pass it controller
 */
  async authUser(req, res, next) {
    const token = req.headers.authorization || req.headers['x-access-token'];
    if (!token || token === 'null') {
      return res.status(401).json({ message: 'Unauthorized Access' });
    }

    jwt.verify(token, secret, (err, result) => {
      if (err) {
        return res.status(401).json({ message: 'Please login!' });
      }
      req.decoded = result;
      next();
    });
  }

  /**
 * @method authAdmin
 * @param {string} data - A token
 * @returns { null } returns Unauthorized Access if token is undfefined
 * @returns { expired } returns Please login
 * @description used to access authenticated route
 * @description if token is valid, decode the payload and pass it controller
 */
  async authAdmin(req, res, next) {
    const token = req.headers.authorization || req.headers['x-access-token'];
    if (!token || token === 'null') {
      return res.status(401).json({ message: 'Unauthorized Access' });
    }

    jwt.verify(token, secret, (err, result) => {
      if (err) {
        return res.status(401).json({ message: 'Please login!' });
      }
      if (result.role !== 'admin') {
        return res.status(401).json({ message: 'Unauthorized Access' });
      }
      req.decoded = result;
      next();
    });
  }
}
