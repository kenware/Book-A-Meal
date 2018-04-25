
import meals from '../models/meal';
import shortcode from 'date-shortcode';

export default class mealController{
    constructor(meals, menu, order){
        this.meals = meals;
        this.menu = menu;
        this.order = order;
    }
    getMeals(req, res){
        if(meals.length>0){
        return res.status(200).json(meals);
        }else{
           return res.status(404).json('meals not found');  
        }
    }
    createMeals(req, res){
        const meal = req.body;
        if(meal.price==undefined||meal.name==undefined||meal.id==undefined||meal.id==undefined){
            return res.status(404).json('all the meal field are required');
        }
        for(let eachMeal of meals){
            if (eachMeal.id==meal.id){
                return res.status(422).json('meal aready exist');
            }
        }
        meals.push(meal);
        const message = 'meal successfuly created'
        return res.status(200).json(
            {message,
            meal
           }
        );
    }
    updateMeal(req,res){
        const mealId = parseInt(req.params.mealId,10);
        const meal = req.body;
        for(let eachMeal of meals){
            if(eachMeal.id == mealId){
                eachMeal.name = meal.name;
                eachMeal.price = meal.price;
                eachMeal.description = meal.description;
                res.status(201).json({
                    message:'successfuly updated',
                    meal    
                })
            }
            }          
            return res.status(404).json(
                'meals not found'
            )
    }
    deleteMeal(req,res){
        const mealId = parseInt(req.params.mealId,10);
        for(let eachMeal of meals){
            if(eachMeal.id == mealId){
              meals.splice(mealId-1,1)
              return res.status(201).json(
                  'meal successfully deleted'
              )
            }
        }
        return res.status(404).json('meal not found')
    }

}