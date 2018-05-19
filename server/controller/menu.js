import shortcode from 'date-shortcode';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import model from '../models/index';


dotenv.config();
const passEmail = process.env.PASS;
const userEmail = process.env.USER;
const {
  Menu,
  Meal,
  User,
  notification
} = model;

export default class menuController {
  async createMenu(req, res) {
    const { title, mealId, orderBefore } = req.body;
    const { id, username } = req.decoded;
    const userId = id;
    let { date } = req.body;
    let message = 'menu is updated';
    let isMenuSet = false;
    const emailList = [];
    // check if mealId exist
    const meal = await Meal.findOne({ where: { userId, id: mealId } });
    if (!meal) { return res.status(401).json({ message: 'Meal with the entered id not found' }); }
    // get current hour of the day
    const presentTime = new Date().getHours() + (new Date().getMinutes() / 60);

    // check if current time is grater than order expire time
    if (orderBefore < Number(presentTime)) {
      return res.status(422)
        .json({ message: 'The closing time user can order cannot be lesser than the present time' });
    }

    if (!date) { date = shortcode.parse('{YYYY-MM-DD}', new Date()); }
    const user = User.build({ id });
    let menu = await Menu.findOne({ where: { date, userId } });
    // check if menu exist else create new one
    if (!menu) {
      menu = await Menu.create({ title, date, orderBefore });
      menu.setUser(user);
      message = `${date} Menu is set`;
    } else {
      menu = await menu.update({ orderBefore, title });
      isMenuSet = true;
    }
    menu.addMeal(mealId);
    if (!isMenuSet) {
      // get all user to get the email of all users
      const allUser = await User.findAll();
      allUser.forEach((element) => {
        emailList.push(element.email);
      });
      // create notification when menu is set
      message = `${date} Menu is set by caterer ${username}`;
      const sendNotific = await notification.create({ message });
      if (!sendNotific) {
        return res.status(401).json({ message: 'error sending notification' });
      }
      // send email notification when menu is set using nodemailer
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
      place your order<a href='${req.headers.host}/dashboard'> here </a>. 
      If the above link do not 
      work. Pkease follow this link ${req.headers.host}/dashboard <td></td>\n\
      </tr>\n\
      </table></body></html>`;
      // setup e-mail data
      const mailOptions = {
        from: '"Book-A-Meal "<no-reply@Book-A-Meal.com>', // sender address (who sends)
        to: emailList, // list of receivers (who receives)
        subject: 'Notification', // Subject line
        // text: 'Hello world ', // plaintext body
        html: mailoutput // html body
      };

      // send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.json(error);
        }
      });
    }
    return res.status(200).json({ message, menu });
  }
  async getMenu(req, res) {
    let { date } = req.params;
    if (!date) { date = shortcode.parse('{YYYY-MM-DD}', new Date()); }
    const menu = await Menu.findAll({
      where: { date },
      include: [
        {
          model: model.Meal,
          attributes: ['id', 'name', 'price', 'description', 'image', 'createdAt', 'updatedAt']
        },
        {
          model: model.User,
          attributes: ['id', 'name', 'username', 'image']
        },
      ]
    });
    if (!menu || menu.length < 1) { return res.status(404).json({ message: `${date} menu is not set` }); }
    return res.status(200).json(menu);
  }
}
