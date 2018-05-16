import React, { Component, PropTypes } from 'react';
import { BrowserRouter, Route, Switch, Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Header from '../header/index';
import './index.scss';
import * as actions from '../../redux/Action/action';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(newProps) {

  }

  onChange(e) {
    const newLocal = this;
    const { state } = newLocal.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  render() {
    return (
      <div>
        <div className="carousel-header">
          <div className="header-overlay" />
          <div className="caption">
            <h3 className="lead">Book A Meal Today</h3>
            <p className="lead">Health is wealth!</p>
          </div>
        </div>
        <Header />
      </div>

    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    message: 'state.message',
  };
}
function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) };
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
