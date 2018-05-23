import React from 'react';
import { Link } from 'react-router-dom';
import './index.scss';
// import { Link } from 'react-router-dom';
const footer = () => (
  <div>
    <footer className="footer" style={{ marginTop: '2rem' }}>
      <div className="footer-col">
        <h3 className="">
           Book-A-Meal
        </h3>
        <ul>
          <li> <Link to="/login" className="text-white">LogIn</Link></li>
          <li> <br /><Link to="/register" className="text-white">SignUp</Link></li>
          <li><br /><Link to="/dashboard" className="text-white">Dashboard</Link></li>
          <li><br /><Link to="#" className="text-white">Get In Touch</Link></li>
        </ul>
      </div>
      <div className="footer-col">
        <h3 className="">
                       Recent News
        </h3>
        <p>
          Book-a-Meal app is designed to make live better
          and easier. You can get your favorite meal with just
          a click any where around the world.
          <br />
          <br /> Dont hesistate to make
          your order now.We are available 24/7
        </p>
      </div>
      <div className="footer-col">
        <h3 className="">
          Subscribe
        </h3>
        <p>
           Get Monthly Updates on our Meal and Recipes and
           also free resources.
        </p>
        <div className="form-row">
          <input type="email" placeholder="Email" style={{ backgroundColor: 'white' }} />
        </div>
        <div className="form-row">
          <button className="button" type="submit">Subscribe</button>
        </div>
      </div>
      <div className="footer-col social">
        <h3 className="">
           Connect With Us
        </h3>
        <p>
            Get in touch with us on various social media
        </p>
        <span className="fa fa-twitter" />
        <span className="fa fa-facebook" />
        <span className="fa fa-likedIn" />
        <span className="fa fa-twitter" />
      </div>
    </footer>
    <div className="footer-row">
      <p className="">
        © Copyright 2018 Book-A-Meal - All Rights Reserved
      </p>
    </div>

  </div>
);
export default footer;
