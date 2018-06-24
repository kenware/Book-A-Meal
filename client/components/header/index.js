import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.scss';
import history from '../../history';
import auth from '../../authenticate/auth';

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
          {window.localStorage.getItem('role') ?
            <span onClick={this.logout} className="a" role="button">LogOut</span>
          : <span />}
          {window.localStorage.getItem('username') ?
            <Link to="/profile" className="a"><em className="fa fa-user" /> &nbsp;{window.localStorage.getItem('username')}</Link>
          : <span />}
          {window.localStorage.getItem('role') === 'admin' ?
            <Link to="/admin" className="a">Admin</Link>
          : <span />}
          {window.localStorage.getItem('role') === 'user' ?
            <Link to="/dashboard" className="a">dashboard</Link>
          : <span />}
          {window.localStorage.getItem('role') ?
            <span />
          : <Link to="/login" className="a">Login</Link>
            }
          {this.state.role ?
            <span />
          : <Link to="/register" className="a">SignUp</Link>
            }
          <Link to="/meals" className="active a">Home</Link>
          <span className="a icon" onClick={this.onClick} role="button"><span className="fa fa-bars" /></span>
        </div>
      </div>

    );
  }
}


export default Nav;
