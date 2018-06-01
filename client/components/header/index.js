import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './index.scss';
import * as actions from '../../redux/Action/action.js';
import history from '../../history';
import auth from '../../authenticate/auth';

// const role = auth.getRole();
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
  onClick(e) {
    if (this.state.responsive === 'responsive') {
      this.setState({ responsive: '' });
    } else {
      this.setState({ responsive: 'responsive' });
    }
  }
  logout() {
    auth.logOut();
    this.setState({ role: '' });
    history.push('/login');
  }

  render() {
    return (
      <div>
        <div className={`nav ${this.state.responsive}`} id="myTopnav">
          <Link to="/meals" className="a active" style={{ fontSize: '23px', marginTop: '10px' }} >Book-A-Meal</Link>
          {this.state.role ?
            <a href="javascript:void(0);" onClick={this.logout} className="a">LogOut</a>
          : <span />}
          {localStorage.getItem('username') ?
             <Link to="/profile" className="a"><em className="fa fa-user"/> &nbsp;{localStorage.getItem('username')}</Link>
          : <span />}
          {this.state.role === 'admin' ?
            <Link to="/admin" className="a">Admin</Link>
          : <span />}
          {this.state.role === 'user' ?
            <Link to="/dashboard" className="a">dashboard</Link>
          : <span />}
          {this.state.role ?
            <span />
          : <Link to="/login" className="a">Login</Link>
            }
          {this.state.role ?
            <span />
          : <Link to="/register" className="a">SignUp</Link>
            }
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
export default connect(mapStateToProps, mapDispatchToProps)(Nav);
