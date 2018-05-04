
import shortcode from 'date-shortcode';
import model from '../models/index';

const Menu = model.Menu;
const Meal = model.Meal;
export default class menuController {
 
 async createMenu(req,res){
     const { mealsId,title } = req.body;
     let { menuDate } = req.body;
     if(!menuDate){ menuDate =  shortcode.parse('{YYYY-MM-DD}', new Date());}
     const menu = await Menu.create({title,menuDate});
     return res.status(200).json(menu);
     const meals = await Meal.findAll();
     if(!meals){return res.status(404).json('there is no meal in the meal table')};
     
    
    }


}