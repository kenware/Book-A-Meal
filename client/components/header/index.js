import React, { PropTypes } from 'react';
import './index.scss';
// import { Link } from 'react-router-dom';
const nav = () => (
  <div className="nav" id="myTopnav">
    <a href="index.html" className="active" >Book-A-Meal</a>
    <a href="dashboard.html">Dashboard</a>
    <a href="admin.html">Admin</a>
    <a href="admin-set-menu.html">Set-Menu</a>
    <a href="admin-all.html">All-Menu</a>
    <a href="login.html">Login</a>
    <a href="register.html">SignUp</a>
    <a href="index.html" className="active">Home</a>
    <a className="icon"><span className="fa fa-bars fa-2x" /></a>
  </div>
);
export default nav;
