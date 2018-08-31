import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Header from '../header/index';
import Footer from '../footer/index';
import './index.scss';
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
  componentWillReceiveProps(props) {
    if (props.errorMessage.loginError) {
      toast.error('Wrong login credentials', {
        className: 'toasterror'
      });
      this.setState({ login: 'Login' });
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
        <ToastContainer autoClose={8000} />
        <div className="register-container" id="login-bg">
          <div className="register-wrapper" style={{ margin: '100px 25% 100px 25%' }}>
            <h3 className="text-center danger">{this.props.errorMessage.authError }</h3>
            <form action="dashboard.html" className="login">
              <div className="form-field">
                <span className="text-center danger">{this.state.userField }</span>
                <input onChange={this.onChange} type="text" id="username" name="username" placeholder="Username" autoComplete="true" required />
              </div>
              <div className="form-field">
                <span className="text-center danger">{this.state.passField }</span>
                <input onChange={this.onChange} type="password" name="password" id="password" placeholder="Password" autoComplete="true" required />
              </div> <br />
              <div style={{ display: 'flex' }}>
                <button name="submit" type="submit" className="button lg-btn" onClick={this.login}>{this.state.login} </button>
              </div> <br />
              <div className="form-field">
                <Link to="/register">SignUp</Link>&nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/resetLink">forgot password? </Link>
              </div>
            </form>

          </div>
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
