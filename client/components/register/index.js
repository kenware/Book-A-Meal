import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import validator from 'validator';

import Header from '../header/index';
import Footer from '../footer/index';
import './index.scss';
import * as actions from '../../redux/Action/action';


class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reset: 'reset',
      register: '',
      email: '',
      name: '',
      username: '',
      password: '',
      vpassword: '',
      validEmail: '',
      passwordmatch: '',
      passwordmismatch: '',
      signUp: 'SignUp',
      message: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onEmail = this.onEmail.bind(this);
    this.change = this.change.bind(this);
    this.register = this.register.bind(this);
  }
  componentWillReceiveProps(newProps) {
    if(newProps.errorMessage.registerError) {
      this.setState({ signUp: 'SignUp' })
    }
  }
  componentWillUnmount() {
    this.props.actions.clearMessages();
  }
  onChange(e) {
    const { state } = this;
    state[e.target.name] = e.target.value;
    this.setState(state);
  }
  onEmail(e) {
    if (!validator.isEmail(`${e.target.value}`)) {
      const validEmail = 'Invalid Email Address';
      this.setState({ validEmail });
    } else {
      const email = e.target.value;
      const validEmail = '';
      this.setState({ email });

      this.setState({ validEmail });
    }
  }
  change(e) {
    const { state } = this;
    state[e.target.name] = e.target.value;
    this.setState(state);
    if (e.target.value === this.state.password) {
      const passwordmatch = 'Password Match';
      const passwordmismatch = '';
      this.setState({ passwordmatch, passwordmismatch });
    } else {
      const passwordmismatch = 'Password do not Match';
      const passwordmatch = '';
      this.setState({ passwordmismatch, passwordmatch });
    }
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
      this.props.actions.register(name, username, email, password);
      this.setState({
        signUp: (<div><i className="fa fa-spinner fa-spin fa-2x fa-fw" aria-hidden="true" />registering...</div>)
      });
    } else {
      this.setState({ message: 'All Field Is Required' });
    }
    
  }
  render() {
    return (
      <div>
        <Header />
        <div className="register-container">
          <div className="register-col" />
          <div className="register-wrapper">
            <h2 className="login-header">Enter your details to SignUp</h2><br />
            <h3 className="text-center danger">{this.props.errorMessage.registerError }</h3>
            <h3 className="text-center danger">{this.state.message }</h3>
            <form action="dashboard.html">
              <div className="form-field">
                <label htmlFor="name">Fullname</label>
                <input onChange={this.onChange} type="text" id="name" name="name" placeholder="Eze Kevin" required />
              </div>
              <div className="form-field">
                <label htmlFor="name">Username</label>
                <input onChange={this.onChange} type="text" id="username" name="username" placeholder="Keny" required />
              </div>
              <div className="form-field">
                <label htmlFor="name">Email<br />
                  <font color="red">{this.state.validEmail} </font>
                </label>
                <input onChange={this.onEmail} type="email" name="email" placeholder="Keny" required />

              </div>
              <div className="form-field">
                <label htmlFor="password">Password</label>
                <input onChange={this.onChange} type="password" name="password" required />
              </div>
              <div className="form-field">
                <label htmlFor="password">Confirm Password<br />
                  <font color="green">{this.state.passwordmatch }</font>
                  <font color="red">{this.state.passwordmismatch }</font>
                </label>
                <input onChange={this.change} type="password" name="vpassword" required />
              </div>
              <div className="form-field">
                <button type="submit" className="button lg" onClick={this.register}>{this.state.signUp}</button>
              </div>
              <div className="form-field">
                <label htmlFor="inputPassword3">
                  <Link to="/login">Login</Link>&nbsp;&nbsp;&nbsp;&nbsp;
                  <Link to="/resetLink">forgot password? </Link>
                </label>
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
    errorMessage: state.errorMessage
  };
}
function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) };
}
export default connect(mapStateToProps, mapDispatchToProps)(Register);
