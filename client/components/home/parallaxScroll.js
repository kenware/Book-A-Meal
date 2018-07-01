import React from 'react';
import { Link } from 'react-router-dom';
/**
 * feature functional component with parallax scroll
 */
const parallaxScroll = () => (
  <div className="parallex">
    <div className="parallex-menu">
      <div className="parallex-img">
        <span className="fa fa-dashboard fa-4x white-color" style={{ marginLeft: '40%' }} />
      </div>
      <div className="parallex-card">
        <div className="container"><br />
          <h2 className="white-color">Dashboard</h2>
          <p className="white-color">Enter your dashboard to perform awesome
                      functionality which include ordering for a meal, adding meal options
                      from meal menu
          </p>
        </div>
        <div className="parallex-footer">
          <button>
            <Link to="/dashbord"> more</Link>
          </button>
        </div>
      </div>
    </div>
    <div className="parallex-menu">
      <div className="parallex-img">
        <span className="fa fa-rocket fa-4x white-color" style={{ marginLeft: '40%' }} />
      </div>
      <div className="parallex-card">
        <div className="container"><br />
          <h2 className="white-color">Login/SignUp</h2>
          <p className="p-style">Login to order menu of your choice with just a single click</p>
        </div>
        <div className="parallex-footer">
          <button>
            <Link to="/login"> more</Link>
          </button>
        </div>
      </div>
    </div>
    <div className="parallex-menu">
      <div className="parallex-img">
        <span className="fa fa-user fa-4x white-color" style={{ marginLeft: '40%' }} />
      </div>
      <div className="parallex-card">
        <div className="container"><br />
          <h2 className="white-color">SignUp</h2>
          <p className="p-style">
            SignUp to get started. Login to order menu of your choice with just a
            single click
          </p>
        </div>
        <div className="parallex-footer">
          <button>
            <Link to="/register"> more</Link>
          </button>
        </div>
      </div>
    </div>
  </div>
);
export default parallaxScroll;
