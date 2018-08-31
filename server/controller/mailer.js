
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import model from '../models/index';
import template from '../helpers/mailTemplate';

dotenv.config();
const gmailPass = process.env.GMAIL_PASS;
const gmailUser = process.env.GMAIL_USER;
const mailTemplate = new template();
const { User } = model;
const Notification = model.notification;

export default class mailController {
  /**
 * @method sendMail
 * @returns { object } returns today menu, message and email info
 * @returns { null } returns a message is not set
 * @param { String } req menu from menu controller
 * @param { String } res menu, message and email info
 * @description After menu is set from menu controller,
 *  it passes menu to maik controller to send email to user that today menu is set
 */
  async sendMail(req, res) {
    const { menu, username } = req.body;
    let { message } = req.body;
    const emailList = [];

    const allUser = await User.findAll();
    allUser.forEach((element) => {
      emailList.push(element.email);
    });

    message = `Today menu is set by caterer ${username}`;
    const sendNotific = await Notification.create({ message });
    if (!sendNotific) {
      return res.status(401).json({ message: 'error sending notification' });
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // use SSL
      auth: {
        user: gmailUser,
        pass: gmailPass
      }
    });

    const mailoutput = mailTemplate.menuMailoutput(req.headers.host, username);
    const mailOptions = {
      from: '"Book-A-Meal "<no-reply@Book-A-Meal.com>',
      to: emailList,
      subject: 'Notification',
      html: mailoutput
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(201).json({ message, menu, emailMessage: 'Error sending email' });
      }
      return res.status(201).json({ message, menu, emailMessage: 'Email sent to users' });
    });
  }

  /**
 * @method changePassword
 * @returns { object } returns email message body
 * @returns { null } returns could not send reset password link to a user
 * @param { String } req user from user controller
 * @param { String } res resetlink sent to user for resetting password
 * @description Sends a reset password link to user's email,
 *  in the case of forgotten password
 */
  async changePassword(req, res) {
    const { user, token } = req.body;
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: gmailUser,
        pass: gmailPass
      }
    });
    const mailoutput = mailTemplate.resetMailOutput(req.headers.host, user.email, user.name, token);
    const mailOptions = {
      from: '"Book-A-Meal "<no-reply@Book-A-Meal.com>',
      to: user.email,
      subject: 'Reset Password',
      html: mailoutput
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.json({ message: 'Error sending link' });
      }
      return res.status(201).json({ message: 'Link sent to email' });
    });
  }
}
