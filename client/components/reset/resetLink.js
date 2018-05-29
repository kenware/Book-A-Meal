import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Header from '../header/index';
import Footer from '../footer/index';
import * as actions from '../../redux/Action/action';


class ResetLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      emailOrUsername: ''
    };
    this.onChange = this.onChange.bind(this);
    this.register = this.register.bind(this);
  }
  componentWillMount() {

  }

  onChange(e) {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  }
  register(e) {
    e.preventDefault();

    const {
      email,
      password,
      username,
      name
    } = this.state;
    if (this.state.passwordmismatch === '' && this.state.passwordmatch !== '' && validator.isEmail(this.state.email)) {
      this.props.actions.register(email, password, name, username);
      this.setState({
        register: (<div><i className="fa fa-spinner fa-spin fa-2x fa-fw" aria-hidden="true" />registering...</div>)
      });
    }
  }
  render() {
    return (
      <div>
        <Header />
        <div className="register-container">
          <div className="register-col" />
          <div className="register-wrapper">
            <h2 className="login-header">Enter your username or email</h2>
            <form action="dashboard.html">
              <div className="form-field">
                <label htmlFor="name">Username/Email</label>
                <input onChange={this.onChange} type="text" id="username" name="emailOrUsername" placeholder="keny or keny@gmail.com" />
              </div>
              <div className="form-field">
                <button type="submit" className="button lg" onClick={this.resetLink}>Send</button>
              </div>
              <div className="form-field">
                <label htmlFor="inputPassword3"><Link to="/login">Login</Link></label>
                <label htmlFor="inputPassword3"><Link to="/register">Register?</Link></label>
              </div>
            </form>

          </div>
          <div className="register-col" />
        </div>
        <Footer />
      </div>

    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    mostOrder: state.mostOrder
  };
}
function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) };
}
export default connect(mapStateToProps, mapDispatchToProps)(ResetLink);
