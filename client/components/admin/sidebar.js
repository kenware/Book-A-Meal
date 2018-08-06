import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Sidebar = ({
  handleClick,
  handleClose,
  toggle,
  logOut,
  setmeal,
  nav1,
  nav2,
  dash,
  cPassword,
  profile,
  notific,
  logout,
  order,
}) => (
  <div>
    <nav className={`sidebar sidebar1-width ${nav1}`}>
      <div>
        <em className="fa fa-bars l-r-pad-text m-text bar1 toggle1 y-color" onClick={() => toggle()} role="button" />
        <h3 className="y-color l-r-pad-text"><Link to="/admin" className="y-color">ADMIN</Link></h3>
        <ul>
          <li className="top-padding li-style">
            <Link to="/dashboard" className="y-color">Dashoard</Link>

          </li>
          <li className="top-padding li-style">
            <Link to="/admin/allmeals" className="y-color my-order">All Meals</Link>
          </li>
          <li className="top-padding li-style">
            <Link to="/admin/addmeals" className="y-color my-order">Add Meals</Link>
          </li>
          <li className="top-padding li-style">
            <Link to="/admin/setmenu" className="y-color my-order">Set Menu</Link>
          </li>
          <li className="top-padding li-style">
            <Link to="/dashboard/profile" className="bar1 y-color ">Profile</Link>
          </li>
          <li className="top-padding li-style">
            <Link to="/dashboard/profile" className="set y-color">Change Password</Link>
          </li>
          <li className="top-padding li-style">
            <span onClick={() => logOut()} role="button" className="y-color logOut">LogOut</span>
          </li>
        </ul>
      </div>
    </nav>
    <nav className={`sidebar sidebar2-width ${nav2}`}>
      <div>
        <em className="fa fa-bars l-r-pad-text m-text bar2 y-color" onClick={() => toggle()} role="button" />
        <h1 className="l-r-pad-text"><a href="index.html"><em className="y-color fa fa-home" /></a></h1>
        <ul className="">
          <li className="top-padding li-style">
            <Link
              to="/dashboard"
              className="y-color dashboard dashboard-link"
              onMouseLeave={() => handleClose('dash')}
              onMouseEnter={() => handleClick('dash')}
            ><em className="fa fa-dashboard" />
            </Link>
            <span className={`p-dash m-text ${dash}`}>Dashoard</span>
          </li>
          <li className="top-padding li-style">
            <Link
              to="/admin/allmeals"
              className="y-color m-text allMeal-link"
              onMouseLeave={() => handleClose('order')}
              onMouseEnter={() => handleClick('order')}
            ><em className="fa fa-list-alt popover all-meal" />
            </Link>
            <span className={`p-all m-text ${order}`}>All Meals</span>
          </li>
          <li className="top-padding li-style">
            <Link
              to="/admin/addmeals"
              className="y-color m-text addmeal-link"
              onMouseLeave={() => handleClose('notific')}
              onMouseEnter={() => handleClick('notific')}
            ><em className="fa fa-cart-plus " />
            </Link>
            <span className={`p-notif m-text ${notific}`}>Add Meals</span>
          </li>
          <li className="top-padding li-style">
            <Link
              to="/admin/setmenu"
              className="y-color m-text setmeal-link"
              onMouseLeave={() => handleClose('setmeal')}
              onMouseEnter={() => handleClick('setmeal')}
            ><em className="fa fa-plus " />
            </Link>
            <span className={`p-notif m-text ${setmeal}`}>Set Menu</span>
          </li>
          <li className="top-padding li-style">
            <Link
              to="dashboard/profile"
              className="y-color m-text profile-link"
              onMouseLeave={() => handleClose('profile')}
              onMouseEnter={() => handleClick('profile')}
            ><em className="fa fa-user add-meal" />
            </Link>
            <label className={`p-add m-text ${profile}`}>Profile</label>
          </li>
          <li className="top-padding li-style">
            <Link
              to="dashboard/profile"
              className="y-color m-text cpassword-link"
              onMouseLeave={() => handleClose('cPassword')}
              onMouseEnter={() => handleClick('cPassword')}
            ><em className="fa fa-edit set-meal" />
            </Link>
            <label className={`p-set m-text ${cPassword}`}>Change Password</label>
          </li>
          <li className="top-padding li-style">
            <span
              onClick={() => logOut()}
              role="button"
              className="y-color m-text logout-link"
              onMouseLeave={() => handleClose('logout')}
              onMouseEnter={() => handleClick('logout')}
            ><em className="fa fa-power-off " />
            </span>
            <label className={`p-out m-text ${logout}`}>LougOut</label>
          </li>
        </ul>
      </div>
    </nav>
  </div>
);

Sidebar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired,
  setmeal: PropTypes.string.isRequired,
  nav1: PropTypes.string.isRequired,
  nav2: PropTypes.string.isRequired,
  dash: PropTypes.string.isRequired,
  cPassword: PropTypes.string.isRequired,
  profile: PropTypes.string.isRequired,
  notific: PropTypes.string.isRequired,
  logout: PropTypes.string.isRequired,
  order: PropTypes.string.isRequired
};

export default Sidebar;
