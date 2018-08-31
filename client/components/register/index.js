import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
  componentWillReceiveProps(props) {
    if (props.errorMessage.registerError) {
      toast.error(props.errorMessage.registerError, {
        className: 'toasterror'
      });
      this.setState({ signUp: 'SignUp' });
    }
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
        <ToastContainer autoClose={8000} />
        <div className="register-container" id="register-bg">
          <div className="register-col" />
          <div className="register-wrapper">
            <h2 className="login-header">SignUp</h2><br />
            <h3 className="text-center danger">{this.state.message }</h3>
            <form className="register">
              <div className="form-field">
                <input onChange={this.onChange} type="text" id="name" name="name" placeholder="Fullname" required />
              </div>
              <div className="form-field">
                <input onChange={this.onChange} type="text" id="username" name="username" placeholder="Username" required />
              </div>
              {this.state.validEmail ?
                <span className="register-margin danger">{this.state.validEmail} </span>
              : <span />}
              <div className="form-field">
                <input onChange={this.onEmail} type="email" name="email" placeholder="Email" id="email" required />
              </div>
              <div className="form-field">
                <input onChange={this.onChange} type="password" name="password" id="password" placeholder="Password" required />
              </div>
              {this.state.passwordmatc || this.state.passwordmismatch ?
                <div className="form-field">
                  <font className="register-margin" color="green">{this.state.passwordmatch }</font>
                  <font className="register-margin" color="red">{this.state.passwordmismatch }</font>
                </div>
               : <span />}
              <div className="form-field">
                <input onChange={this.change} type="password" name="vpassword" id="vpassword" placeholder="Confirm Password" required />
              </div>
              <div>
                <button type="submit" style={{ float: 'right' }} name="submit" className="button signup-btn" onClick={this.register}>{this.state.signUp}</button>
              </div><br />
              <div className="form-field">
                <Link to="/login">Login</Link>&nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/resetLink">forgot password? </Link>
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
