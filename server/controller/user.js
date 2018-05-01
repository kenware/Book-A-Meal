import model from '../models/index';



const User = model.User;
export default class userController{
    
    createUser(req,res){
       const { name,username,password,email} = req.body;
       User.create({
        name,username,password,email
       })
       .then(user =>{
           return res.status(201).json(user)
       })
       .catch(error => res.status(400).send(error));
    }
}