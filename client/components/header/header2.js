import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './index.scss';
import * as actions from '../../redux/Action/action';
import history from '../../history';
import auth from '../../authenticate/auth';

// const role = auth.getRole();
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      responsive: ''
    };
    this.onClick = this.onClick.bind(this);
    this.logout = this.logout.bind(this);
  }
  onClick(e) {
    if (this.state.responsive === 'responsive') {
      this.setState({ responsive: '' });
    } else {
      this.setState({ responsive: 'responsive' });
    }
  }
  logout() {
    auth.logOut();
    history.push('/meals');
  }

  render() {
    return (
      <div>
        <div className={`nav ${this.state.responsive}`} id="myTopnav">
          <Link to="/meals" className="a active" style={{ fontSize: '23px', marginTop: '10px' }} >Book-A-Meal</Link>
          <a href="javascript:void(0);" onClick={this.logout} className="a">LogOut</a>
          <Link to="/profile" className="a"><em className="fa fa-user"/> &nbsp;{localStorage.getItem('username')}</Link>
          <Link to="/admin" className="a">Admin</Link>
          <Link to="/dashboard" className="a">dashboard</Link>
          <Link to="/admin/allmeals" className="a">All meals</Link>
          <Link to="/admin/setmenu" className="a">Set Menu</Link>
          <Link to="/admin/addmeals" className="a">Add meals</Link>
          <Link to="/meals" className="active a">Home</Link>
          <span className="a icon" onClick={this.onClick}><span className="fa fa-bars" /></span>
        </div>
      </div>

    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    message: state.message,
    appMessage: state.appMessage
  };
}
function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) };
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);
