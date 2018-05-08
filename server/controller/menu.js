import shortcode from 'date-shortcode';
import model from '../models/index';

const Menu = model.Menu;
const Meal = model.Meal;
const User = model.User;
export default class menuController {
 
 async createMenu(req,res){
    const { title,mealsId,orderBefore } = req.body;
    const id = req.decoded.id;
    let { date } = req.body;
    let message = 'menu is set';
    //get current hour of the day
    const presentTime = new Date().getHours() + (new Date().getMinutes()/60);
  
    if(orderBefore < Number(presentTime)){
      return res.status(422)
      .json('The closing time user can order cannot be lesser than the present time');
    }
     if(!date){ date =  shortcode.parse('{YYYY-MM-DD}', new Date());}
     
     let user = User.build({ id });
     let menu = await Menu.findOne({ where:{ date } })
     if(!menu){ 
         menu = await Menu.create({title,date,orderBefore}); 
         menu.setUser(user);
         menu.save();
         message = date +' menu is updated';
    } 

    menu.addMeals(mealsId)
    return res.status(200).json({ message,menu });
  }
  async getMenu(req,res){
    let date = req.params.date;
    if(!date){ date = shortcode.parse('{YYYY-MM-DD}', new Date()); }
    let menu = await Menu.findOne({
        where:{ date },
        include:{model:Meal}
      });
    if(!menu){ return res.status(404).json(date +' menu is not set')}
    return res.status(200).json(menu);
  }
}