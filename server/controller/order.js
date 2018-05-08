import shortcode from 'date-shortcode';
import model from '../models/index';

const Menu = model.Menu;
const Meal = model.Meal;
const User = model.User;
const Order = model.Order;

export default class orderController{
    async createOrder(req,res){
        const { menuId,quantity, mealId, address } = req.body;
        //get menu using menuId
        const menu = await Menu.findOne({
             where:{ id:parseInt(menuId) },
             include:{ model:Meal }
        });
        if(!menu){ return res.status(404).json('menu not found')}
        // check wether an order time is passed
        const orderBefore = menu.orderBefore;
        const date =  shortcode.parse('{YYYY-MM-DD}', new Date());
        const presentTime = new Date().getHours() + (new Date().getMinutes()/60); 
        if(orderBefore < Number(presentTime) || menu.date !== date){
          return res.status(422)
          .json('You cannot order menu at this time');
        }
        let meal;
        //check if meal exist in the menu using mealId
        menu.Meals.forEach(element => {
            if(element.id === parseInt(mealId)){ meal = element; }
        });
        if(!meal){ return res.status(404).json('meal not found') }

        const id = req.decoded.id;
        const totalPrice = meal.price * quantity;
        const user = User.build({ id });
        const title = meal.name;
        const status = 'pending';
        let order = await Order.create({ status,title, address, quantity,totalPrice});
        if(!order){ return res.status(404).json('error ordering meal') }
        order.setUser(user);
        order.setMeal(meal);
        order.save();
        return res.status(201).json(order);
    }
    async updateOrder(req,res){
       const { cancel,mealId,quantity,address } = req.body;
       

    }

     
}