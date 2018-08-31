import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './index.scss';
import history from '../../history';
import auth from '../../authenticate/auth';

const newLocal = '28px';
/**
  * This header is used in all pages for large screen size
*/
class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      responsive: '',
      role: auth.getRole()
    };
    this.onClick = this.onClick.bind(this);
    this.logout = this.logout.bind(this);
  }
  /**
   * addd css class for drop down and responsive navbar
  */
  onClick() {
    if (this.state.responsive === 'responsive') {
      this.setState({ responsive: '' });
    } else {
      this.setState({ responsive: 'responsive' });
    }
  }
  /**
   * logout users
   * redirect to login psage
  */
  logout() {
    auth.logOut();
    this.setState({ role: '' });
    history.push('/login');
  }

  render() {
    return (
      <div>
        <div className={`nav ${this.state.responsive}`} id="myTopnav">
          <Link to="/meals" className="a active active-text-header" style={{ fontSize: '30px', marginTop: '10px' }} >Book-A-Meal</Link>
          {this.props.component === 'dash' && window.localStorage.getItem('role') ?
            <span className="a">{this.props.cart.length}
              <i onClick={this.props.onModal} className="fa fa-shopping-cart" aria-hidden="true" style={{ marginRight: '2rem', fontSize: newLocal }} />
            </span>
          : <span />}
          {window.localStorage.getItem('role') ?
            <span onClick={this.logout} className="a logOut" role="button">LogOut</span>
          : <span />}
          {window.localStorage.getItem('username') ?
            <Link to="/profile" className="a">
              <img src={window.localStorage.getItem('image') !== 'null' ? window.localStorage.getItem('image') : 'image/profile.png'} className="rounded-circle" alt="user" style={{ height: '20px', width: '20px' }} />
            </Link>
          : <span />}
          {this.props.component === 'admin' && window.localStorage.getItem('role') === 'admin' ?
            <div className="dropdown a">
              <i className="dropbtn fa fa-caret-down" />
              <div className="dropdown-content">
                <ul>
                  <li className="top-padding li-style">
                    <Link to="/admin" className="white-color">Admin</Link>
                  </li>
                  <li className="li-style">
                    <Link to="/dashboard" className="white-color">Dashoard</Link>
                  </li>
                  <li className="">
                    <Link to="/admin/allmeals" className="white-color my-order" id="allMeal-link">All Meals</Link>
                  </li>
                  <li className="">
                    <Link to="/admin/addmeals" className="white-color my-order" id="addmeal">Add Meals</Link>
                  </li>
                  <li className=" ">
                    <Link to="/admin/setmenu" className="white-color my-order" id="setMenu">Set Menu</Link>
                  </li>
                  <li className=" li-style">
                    <Link to="/dashboard/profile" className="bar1 white-color ">Profile</Link>
                  </li>
                </ul>
              </div>
            </div>
          : <span />}
          {window.localStorage.getItem('role') ?
            <span />
          : <Link to="/login" className="a login-header">Login</Link>
            }
          {this.state.role ?
            <span />
          : <Link to="/register" className="a register-header">SignUp</Link>
            }
          <span className="a icon" onClick={this.onClick} role="button"><span className="fa fa-bars" /></span>
        </div>
      </div>

    );
  }
}
Nav.defaultProps = {
  cart: [],
  component: '',
  onModal: () => {}
};

Nav.propTypes = {
  cart: PropTypes.array,
  onModal: PropTypes.func,
  component: PropTypes.string
};
export default Nav;
