import shortcode from 'date-shortcode';
import dumyData from '../dumydata/store';
const menus = dumyData.menus;
const allMeals = dumyData.meals;


export default class menuController {
  constructor(id,title,meals,menuDate) {
    this.id = id;
    this.title = title;
    this.meals = meals;
    this.menuDate = menuDate;
    
         
  }

  createMenu(req, res) {
    let { title,id } = req.body;
    let { mealsId,menuDate } = req.body;
    const meals = [];
    // enable posting of mealsId of comma seperated string
    if (typeof mealsId === 'string') {
      mealsId = mealsId.split(',');
    }
    // select meals from meal table using meal id
    for (const meal of allMeals) {
      for (const eachId of req.body.mealsId) {
        if (meal.id === parseInt(eachId)) {
          meals.push(meal);
        }
      }
    }
    if (!menuDate) {
      menuDate = shortcode.parse('{YYYY-MM-DD}', new Date());
    }
    const menu = new menuController(id,title,meals,menuDate);
      menus.push(menu);
      return res.status(200).json(menu);
  }

  // get menu for today
  getMenu(req, res) {
    const date = shortcode.parse('{YYYY-MM-DD}', new Date());
    for (const eachMenu of menus) {
      if (eachMenu.menuDate === date) {
        const menu = new menuController(eachMenu.id,eachMenu.title,date,eachMenu.meals);
        return res.status(201).json(menu);
      }
    }
    return res.status(400).json('today menu is not set');
  }

  // get menu for any day
  getAnyMenu(req, res) {
    const date = req.params.date;
    for (const eachMenu of menus) {
      if (eachMenu.menuDate === date) {
       const menu = new menuController(eachMenu.id,eachMenu.title,date,eachMenu.meals);
        return res.status(201).json(menu);
      }
    }
    const message = `menu of ${date} is not set`;
    return res.status(400).json(message);
  }
}
