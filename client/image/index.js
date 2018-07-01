import React, { Component } from 'react';
import './index.css'
import { BrowserRouter, Route, Switch, Redirect, Link } from 'react-router-dom';
import token from '../auth.js';
import  up from 'react-icons/lib/fa/level-down';
import nave from '../app/nav';
class login extends Component {

  state = { 
    email:'', 
    password:'',
    loginmessage:'',
    navigate: false,
    inform:'inform'
  }

 onChange = (e) =>{
    const state = this.state;
    state[e.target.name] = e.target.value;
   this.setState(state);

  }



login = (e) => {
   e.preventDefault();
   const email = this.state.email;
   const password = this.state.password;
   fetch('/api/users/signin', 
      {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({email:email,password:password})
      })
      .then(res => res.json())
      .then(user => {
       if(typeof user == 'string'){
        const loginmessage = user;
        const inform = ''; 
        this.setState({ loginmessage });
        this.setState({ inform })
        }else{
          this.setState({ navigate: true });
          localStorage.setItem('token',user.token);
          localStorage.setItem('username',user.username);

        }
        });

}
render() {
    const { navigate } = this.state

    // here is the important part
    if (navigate) {
      return <Redirect to="/" push={true} />
    }
    return (
      <div>
      <nave.nav />
      <div class="container py-5" id="register">
    <div class="row">
        <div class="col-md-12">
            <h2 class="text-center mb-5"><font color="white">Login To Your Account</font></h2>
            <div class="row">
                <div class="col-md-6 mx-auto">
                    <div class="card border-secondary">
                        <div class="card-header">
                            <h3 class="mb-0 my-2">Sign In</h3>
                            <div class="alert alert-warning alert-dismissible" role="alert" id={ this.state.inform }>
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                   <strong>{this.state.loginmessage}!</strong>
                                       </div>
                        </div>
                        <div class="card-body">
                            <form class="form" role="form" autocomplete="off" onSubmit={ this.login }>
                                <div class="form-group">
                                    <label for="inputEmail3">Email</label>
                                    <input type="email" onChange={ this.onChange } name="email" class="form-control" id="inputEmail3" placeholder="email@gmail.com" required=""/>
                                </div>
                                <div class="form-group">
                                    <label for="inputPassword3">Password</label>
                                    <input type="password" onChange={ this.onChange }  name="password" class="form-control" id="inputPassword3" placeholder="password" title="At least 6 characters with letters and numbers" required=""/>
                                </div>
                                <div class="form-group">
                                    <button type="submit" class="btn btn-success btn-lg float-right">Register</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        
    </div>
    
</div>
</div>

    );
  }
}
export default login;