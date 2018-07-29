import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Header from '../header/index';
import Footer from '../footer/index';
import * as actions from '../../redux/Action/action';

export class ResetPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      submit: 'Submit'
    };
    this.onChange = this.onChange.bind(this);
    this.newPassword = this.newPassword.bind(this);
  }
  /**
   * lifecycle hook called when component receives props
   *
   * @memberof Dashboard index
   * return state after it is changed
   */
  componentWillReceiveProps(newProps) {
    if (newProps) {
      this.setState({ submit: 'Submit' });
    }
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
   * calls redux action
   * sends resetlink to user email
  */
  newPassword(e) {
    e.preventDefault();
    const { password } = this.state;
    const { token } = this.props.match.params;
    if (password) {
      this.props.actions.changePassword(password, token);
      this.setState({
        submit: (<div><i className="fa fa-spinner fa-spin fa-2x fa-fw" aria-hidden="true" /></div>)
      });
      this.setState({ inputError: '' });
      return;
    }
    this.setState({ inputError: 'this field is required' });
  }

  render() {
    return (
      <div>
        <Header />
        <div className="register-container">
          <div className="register-col" />
          <div className="register-wrapper">
            <h2 className="login-header">Enter Your New Password</h2>
            <h3 className="login-header danger text-center">{this.props.errorMessage.passwordResetError}</h3>
            <h3 className="login-header p-color text-center">{this.props.successMessage.passwordSuccess}</h3>
            <form action="dashboard.html">
              <div className="form-field">
                <label htmlFor="name">New Password <br />
                  <span className="danger">{this.state.inputError} </span>
                </label>
                <input onChange={this.onChange} type="password" id="password" name="password" placeholder="124gdt446776j7u" />
              </div>
              <div className="form-field">
                <button type="submit" className="button lg" onClick={this.newPassword}>{this.state.submit}</button>
              </div>
              <div className="form-field">
                <label htmlFor="inputPassword3">
                  <Link to="/login">Login</Link>&nbsp;&nbsp;&nbsp;&nbsp;
                  <Link to="/register">Register?</Link>
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
ResetPage.propTypes = {
  match: PropTypes.object.isRequired,
  errorMessage: PropTypes.object.isRequired,
  successMessage: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

export const mapStateToProps = state => ({
  errorMessage: state.errorMessage,
  successMessage: state.successMessage,
});

export const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(actions, dispatch) });
export default connect(mapStateToProps, mapDispatchToProps)(ResetPage);
