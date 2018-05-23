import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './index.scss';
import * as actions from '../../redux/Action/action.js';


class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      responsive: ''
    };
    this.onClick = this.onClick.bind(this);
  }
  onClick(e) {
    if (this.state.responsive === 'responsive') {
      this.setState({ responsive: '' });
    } else {
      this.setState({ responsive: 'responsive' });
    }
  }

  render() {
    return (
      <div>
        <div className={`nav ${this.state.responsive}`} id="myTopnav">
          <Link to="/meals" className="a active" style={{ fontSize: '23px', marginTop: '10px' }} >Book-A-Meal</Link>
          <Link to="login.html" className="a">Login</Link>
          <Link to="/register" className="a">SignUp</Link>
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
