
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import model from '../models/index';


dotenv.config();
const gmailPass = process.env.GMAIL_PASS;
const gmailUser = process.env.GMAIL_USER;
const {
  User,
  notification
} = model;

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
    // get all user to get the email of all users
    const allUser = await User.findAll();
    allUser.forEach((element) => {
      emailList.push(element.email);
    });
    // create notification when menu is set
    message = `Today menu is set by caterer ${username}`;
    const sendNotific = await notification.create({ message });
    if (!sendNotific) {
      return res.status(401).json({ message: 'error sending notification' });
    }
    // send email notification when menu is set using nodemailer
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // use SSL
      auth: {
        user: gmailUser,
        pass: gmailPass
      }
    });
    // html email body
    const mailoutput = `<html>\n\
    <body>\n\
    <table>\n\
    <tr>\n\
    <td>Title: </td><h2> Book-A-Meal</h2><td></td>\n\
    <td>Title: </td><h3> no-reply@Book-A-Meal.com </h3> <td></td>\n\
    </tr>\n\
    <tr>\n\
    <td>Email: </td>Today's Menu is set <td></td>\n\
    </tr>\n\
    <tr>\n\
    <td>MN: </td>Order Now<td></td>\n\
    </tr>\n\
    <tr>\n\
    <td>Messge: </td>This menu is specially prepared by well known caterer ${username} ,
    place your order<a href="${req.headers.host}/dashboard"> here </a>. 
    If the above link do not 
    work. Pkease follow this link ${req.headers.host}/dashboard <td></td>\n\
    </tr>\n\
    </table></body></html>`;
    // setup e-mail data
    const mailOptions = {
      from: '"Book-A-Meal "<no-reply@Book-A-Meal.com>', // sender address (who sends)
      to: emailList, // list of receivers (who receives)
      subject: 'Notification', // Subject line
      html: mailoutput // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.json(error);
      }
      return res.status(201).json({ message, menu });
    });
  }

  async changePassword(req, res) {
    /**
 * @method changePassword
 * @returns { object } returns email message body
 * @returns { null } returns could not send reset password link to a user
 * @param { String } req user from user controller
 * @param { String } res resetlink sent to user for resetting password
 * @description Sends a reset password link to user's email,
 *  in the case of forgotten password
 */
    const { user, token } = req.body;
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      // host: 'bookmeals.herokuapp.com',
      port: 465,
      // port: 5000,
      secure: true, // use SSL
      auth: {
        user: gmailUser,
        pass: gmailPass
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
    <td>Email: </td><td>${user.email}</td>\n\
    </tr>\n\
    <tr>\n\
    <td>MN: </td> Click the link bellow to reset your password<td></td>\n\
    </tr>\n\
    <tr>\n\
    <td>Messge: </td> Dere ${user.name} reset your password 
    <a href='${req.headers.host}/passwordreset/${token}'> here </a>. If the above link do not 
    work. Pkease follow this link ${req.headers.host}/passwordreset/${token} <td></td>\n\
    </tr>\n\
    </table></body></html>`;
    // setup e-mail data
    const mailOptions = {
      from: '"Book-A-Meal "<no-reply@Book-A-Meal.com>', // sender address (who sends)
      to: user.email, // list of receivers (who receives)
      subject: 'Reset Password', // Subject line
      // text: 'Hello world ', // plaintext body
      html: mailoutput // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.json(error);
      }
      return res.status(201).json({ success: info.response });
    });
  }
}
