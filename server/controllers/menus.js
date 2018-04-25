
import menus from '../models/menu';
import allMeals from '../models/meal';
import shortcode from 'date-shortcode';

export default class menuController{
    
    createMenu(req,res){
        let todayMenu = req.body;
        let mealsId;
        let meals = [];
        if(typeof todayMenu.mealsId == 'string'){
            mealsId = todayMenu.mealsId.split(',');        
        }else{
            mealsId = todayMenu.mealsId;          
        }
        for(let meal of allMeals){
            for(let eachId of mealsId){
                if(meal.id == parseInt(eachId)){
                    meals.push(meal)
                }
            }
        }
        let date;
        if(todayMenu.menuDate == undefined){
            date = shortcode.parse('{YYYY-MM-DD}',new Date())
            todayMenu['menuDate']=date;
        }
        menus.push({
            title: todayMenu.title,
            menuDate:date,
            meals,
        });
        return res.status(200).json(
            {   id:todayMenu.id,
                title: todayMenu.title,
                date:date,
                meals,
           }
        );
    }
    getMenu(req,res){
        let date = shortcode.parse('{YYYY-MM-DD}',new Date());
        let menuMeals = [];
        for (let eachMenu of menus){
            if(eachMenu.menuDate == date){
               menuMeals = eachMenu.meals.concat(menuMeals)
            }
        }
        if(menuMeals.length>0){
            return res.status(201).json({
                title:'todays menu',
                date : date,
                meals:menuMeals
            })
        }else{
            return res.status(400).json('today menu is not set') 
        }
    }
}