import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Header from '../header/index';
import Footer from '../footer/index';
import * as actions from '../../redux/Action/action';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: 'Login',
      username: '',
      password: '',
      userField: '',
      passField: ''
    };
    this.onChange = this.onChange.bind(this);
    this.login = this.login.bind(this);
  }
  /**
   * ifecycle hook called when component is receives props
   * @param  {} props if new props from redux with error arrives
   * change the state login button from loading icon to
   * to text
   */
  static getDerivedStateFromProps(props) {
    if (props.errorMessage.loginError) {
      return { login: 'Login' };
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
   * @param  {} e login method
   */
  login(e) {
    e.preventDefault();
    const {
      password,
      username
    } = this.state;
    if (!username) { this.setState({ userField: 'Username is required' }); return; }
    if (!password) { this.setState({ passField: 'Password is required' }); return; }
    this.props.actions.login(username, password);
    this.setState({
      login: (<div><i className="fa fa-spinner fa-spin fa-2x fa-fw" aria-hidden="true" /></div>),
      userField: '',
      passField: ''
    });
    this.props.actions.clearMessages();
  }
  render() {
    return (
      <div>
        <Header />
        <div className="register-container">
          <div className="register-col" />
          <div className="register-wrapper">
            <h2 className="login-header">Enter your details to Login</h2><br />
            <h3 className="text-center danger">{this.props.errorMessage.loginError }</h3>
            <h3 className="text-center danger">{this.props.errorMessage.authError }</h3>
            <form action="dashboard.html" className="login">
              <div className="form-field">
                <label htmlFor="name">
                  Username <br />
                  <span className="text-center danger">{this.state.userField }</span>
                </label>
                <input onChange={this.onChange} type="text" id="username" name="username" placeholder="Keny" required />

              </div>
              <div className="form-field">
                <label htmlFor="password">
                  Password <br />
                  <span className="text-center danger">{this.state.passField }</span>
                </label>
                <input onChange={this.onChange} type="password" name="password" id="password" required />
              </div>
              <div className="form-field">
                <button name="submit" type="submit" className="button lg" onClick={this.login}>{this.state.login}</button>
              </div>
              <div className="form-field">
                <label htmlFor="inputPassword3">
                  <Link to="/register">SignUp</Link>&nbsp;&nbsp;&nbsp;&nbsp;
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
Login.propTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(Login);
