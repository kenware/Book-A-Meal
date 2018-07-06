import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import validator from 'validator';
import PropTypes from 'prop-types';
import Header from '../header/index';
import Footer from '../footer/index';
import './index.scss';
import * as actions from '../../redux/Action/action';

export class Register extends Component {
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
  /**
   * @param  {} props if new props from redux with error arrives
   * change the state lof register button from loading icon to text
   */
  static getDerivedStateFromProps(props) {
    if (props.errorMessage.registerError) {
      return { signUp: 'SignUp' };
    }
    return null;
  }
  /**
   * remove error props in redux store if component unmount
   */
  componentWillUnmount() {
    this.props.actions.clearMessages();
  }
  /**
   * @param  {} e set state on input onchange event
   */
  onChange(e) {
    const { state } = this;
    state[e.target.name] = e.target.value;
    this.setState(state);
  }
  /**
   * @param  {} e set state on email onchange event
   * checks if email is valid
   */
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
  /**
   * @param  {} e set state on password onchange event
   * checks if password and confirm password is same
   */
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

  /**
   * @param  {} e register method
   */
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
    this.props.actions.clearMessages();
  }
  render() {
    return (
      <div>
        <Header />
        <div className="register-container" id="register-bg">
          <div className="register-col" />
          <div className="register-wrapper" style={{ height: '500px' }}>
            <h2 className="login-header">Enter your details to SignUp</h2><br />
            <h3 className="text-center danger">{this.props.errorMessage.registerError }</h3>
            <h3 className="text-center danger">{this.state.message }</h3>
            <form className="register">
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
                <input onChange={this.onEmail} type="email" name="email" placeholder="Keny" id="email" required />

              </div>
              <div className="form-field">
                <label htmlFor="password">Password</label>
                <input onChange={this.onChange} type="password" name="password" id="password" required />
              </div>
              <div className="form-field">
                <label htmlFor="password">Confirm Password<br />
                  <font color="green">{this.state.passwordmatch }</font>
                  <font color="red">{this.state.passwordmismatch }</font>
                </label>
                <input onChange={this.change} type="password" name="vpassword" id="vpassword"required />
              </div>
              <div className="form-field">
                <button type="submit" className="button lg submit" onClick={this.register}>{this.state.signUp}</button>
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
Register.propTypes = {
  errorMessage: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

export function mapStateToProps(state) {
  return {
    errorMessage: state.errorMessage
  };
}
export function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) };
}
export default connect(mapStateToProps, mapDispatchToProps)(Register);
