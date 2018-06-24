import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Header from '../header/index';
import Footer from '../footer/index';
import * as actions from '../../redux/Action/action';

class ResetPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      submit: 'Submit'
    };
    this.onChange = this.onChange.bind(this);
    this.reset = this.reset.bind(this);
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
  reset(e) {
    e.preventDefault();
    this.props.actions.clearMessages();
    const {
      emailOrUsername,
    } = this.state;

    if (emailOrUsername) {
      this.props.actions.reset(emailOrUsername);
      this.setState({
        submit: (<div><i className="fa fa-spinner fa-spin fa-2x fa-fw" aria-hidden="true" /></div>)
      });
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
            <h3 className="login-header danger text-center">{this.props.errorMessage.resetError}</h3>
            <h3 className="login-header p-color text-center">{this.props.successMessage.resetSuccess}</h3>
            <form action="dashboard.html">
              <div className="form-field">
                <label htmlFor="name">New Password <br />
                  <span className="danger">{this.state.inputError} </span>
                </label>
                <input onChange={this.onChange} type="password" id="password" name="password" placeholder="124gdt446776j7u" />
              </div>
              <div className="form-field">
                <button type="submit" className="button lg" onClick={this.reset}>{this.state.submit}</button>
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
  errorMessage: PropTypes.object.isRequired,
  successMessage: PropTypes.object.isRequired,
  actions: {
    clearMessages: PropTypes.func.isRequired,
    resetLink: PropTypes.func.isRequired
  }.isRequired,
};

function mapStateToProps(state) {
  return {
    errorMessage: state.errorMessage,
    successMessage: state.successMessage,
  };
}
function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) };
}
export default connect(mapStateToProps, mapDispatchToProps)(ResetPage);