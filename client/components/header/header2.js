import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.scss';
import history from '../../history';
import auth from '../../authenticate/auth';
/**
  * This header is used in only admin page for small screen size
*/
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      responsive: ''
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
    history.push('/meals');
  }

  render() {
    return (
      <div>
        <div className={`nav ${this.state.responsive}`} id="myTopnav">
          <Link to="/meals" className="a active active-text-header" style={{ fontSize: '23px', marginTop: '10px' }} >Book-A-Meal</Link>
          <span onClick={this.logout} className="a" role="button">LogOut</span>
          <Link to="/profile" className="a"><em className="fa fa-user" /> &nbsp;{window.localStorage.getItem('username')}</Link>
          <Link to="/admin" className="a">Admin</Link>
          <Link to="/dashboard" className="a">dashboard</Link>
          <Link to="/admin/allmeals" className="a">All meals</Link>
          <Link to="/admin/setmenu" className="a">Set Menu</Link>
          <Link to="/admin/addmeals" className="a">Add meals</Link>
          <Link to="/meals" className="active a">Home</Link>
          <span className="a icon" onClick={this.onClick} role="button"><span className="fa fa-bars" /></span>
        </div>
      </div>

    );
  }
}

export default Header;
