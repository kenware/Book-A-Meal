import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Header from '../header/index';
import Header3 from '../header/header3';
import MyMenu from './menu';
import Order from './order';
import Footer from '../footer/index';
import Profil from './profile';
import './index.scss';
import * as menuActions from '../../redux/Action/menuAction';
import * as orderActions from '../../redux/Action/orderAction';
import * as actions from '../../redux/Action/action';
import Timeline from './timeline';
import auth from '../../authenticate/auth';
import history from '../../history';

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nav1: '',
      nav2: 'nav2',
      modal: 'modal',
      timeline: 'timeliner',
      main: 'main-sidebar1',
      dash: 'dash',
      cPassword: 'cPassword',
      profile: 'profile',
      notific: 'notific',
      logOut: 'logOut',
      order: 'order',
      limit: 4,
      upgradeModal: 'modal',
      upgradeButton: 'Upgrade',
      Redirect: false
    };
    this.upgrade = this.upgrade.bind(this);
    this.confirmUpgrade = this.confirmUpgrade.bind(this);
    this.cancelUpgrade = this.cancelUpgrade.bind(this);
    this.logOut = this.logOut.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  /**
   * lifecycle hook called when component is mounted to DOM
   *
   * @memberof Dashboard index
   *
   * @returns {undefined} fetches notification
   * refreshes token if the user is still logged in or redirect to log in page if expired
   */
  componentDidMount() {
    this.props.actions.getNotifications();
    this.props.actions.refreshToken('user');
  }
  /**
   * lifecycle hook called when component receives props
   *
   * @memberof Dashboard index
   * return state after it is changed
   */
  static getDerivedStateFromProps(props) {
    if (props.successMessage.upgradeSuccess) {
      return { upgradeModal: 'modal' };
    }
    return null;
  }
  /**
   * cancel upgrade using modal
   */
  cancelUpgrade() {
    this.setState({ upgradeModal: 'modal' });
  }
  /**
   * go ahead to upgrade user to caterer
   */
  confirmUpgrade() {
    this.props.actions.upgrade();
    this.setState({
      upgradeButton: (<div><i className="fa fa-spinner fa-spin fa-2x fa-fw" aria-hidden="true" /></div>)
    });
  }
  /**
   * Dispaly modal upgrade
   */
  upgrade() {
    this.setState({ upgradeModal: '' });
  }
  // logout and redirect to home
  logOut() {
    auth.logOut();
    history.push('/meals');
  }
  // toggle side bar on click event
  toggle() {
    if (this.state.nav1 === '') {
      this.setState({
        nav2: '',
        nav1: 'nav1',
        main: 'main-sidebar2',
        timeline: ''
      });
    } else {
      this.setState({
        nav2: 'nav2',
        nav1: '',
        main: 'main-sidebar1',
        timeline: 'timeliner'
      });
    }
  }
  // remove popover on mouseleave
  handleClose(value) {
    const { state } = this;
    state[value] = value;
    this.setState(state);
  }
  // Popover on mouseEnter or hover
  handleClick(value) {
    const { state } = this;
    state[value] = '';
    this.setState(state);
  }
  render() {
    return (
      <div>
        <span className="largeScreen-header">
          <Header />
        </span>
        <span className="smallScreen-header">
          <Header3 />
        </span>
        <div className="admin-container">
          <nav className={`sidebar sidebar1-width ${this.state.nav1}`}>
            <div>
              <em className="fa fa-bars l-r-pad-text m-text bar1 toggle1" onClick={this.toggle} role="button" />
              <h3 className="y-color l-r-pad-text">Book-A-Meal</h3>
              <ul>
                {window.localStorage.getItem('role') === 'admin' ?
                  <li className="top-padding li-style">
                    <Link to="/admin" className="y-color">Admin</Link>

                  </li>
                : <span />}
                <li className="top-padding li-style">
                  <Link to="/dashboard" className="y-color">Dashboard</Link>

                </li>
                <li className="top-padding li-style">
                  <Link to="/dashboard/orders" className="y-color my-order">My Orders</Link>
                </li>
                <li className="top-padding li-style">
                  <span onClick={this.toggle} className="bar1 y-color " role="button">Notification</span>
                </li>
                <li className="top-padding li-style">
                  <Link to="/dashboard/profile" className="bar1 y-color ">Profile</Link>
                </li>
                <li className="top-padding li-style">
                  <Link to="/dashboard/profile" className="set y-color">Change Password</Link>
                </li>
                <li className="top-padding li-style">
                  <span onClick={this.logOut} className="y-color" role="button">LogOut</span>
                </li>
              </ul>
            </div>
          </nav>
          <nav className={`sidebar sidebar2-width ${this.state.nav2}`}>
            <div>
              <em className="fa fa-bars l-r-pad-text m-text bar2 y-color " onClick={this.toggle} role="button" />
              <h1 className="l-r-pad-text"><a href="index.html"><em className="y-color fa fa-home" /></a></h1>
              <ul className="y-color">
                <li className="top-padding li-style">
                  <Link
                    to="/dashboard"
                    className="y-color dashboard dashboard-link"
                    onMouseLeave={() => this.handleClose('dash')}
                    onMouseEnter={() => this.handleClick('dash')}
                  ><em className="fa fa-dashboard" />
                  </Link>
                  <span className={`p-dash m-text ${this.state.dash}`}>Dashoard</span>
                </li>
                <li className="top-padding li-style">
                  <Link
                    to="/dashboard/orders"
                    className="y-color m-text order-link"
                    onMouseLeave={() => this.handleClose('order')}
                    onMouseEnter={() => this.handleClick('order')}
                  ><em className="fa fa-calendar-o popover all-meal" />
                  </Link>
                  <span className={`p-all m-text ${this.state.order}`}>My Orders</span>
                </li>
                <li className="top-padding li-style">
                  <span
                    onClick={this.toggle}
                    role="button"
                    className="y-color m-text notific-link"
                    onMouseLeave={() => this.handleClose('notific')}
                    onMouseEnter={() => this.handleClick('notific')}
                  ><em className="fa fa-bell notif" />
                  </span>
                  <span className={`hover p-notif m-text ${this.state.notific}`}>Notifications</span>
                </li>
                <li className="top-padding li-style">
                  <Link
                    to="/dashboard/profile"
                    className="y-color m-text profile-link"
                    onMouseLeave={() => this.handleClose('profile')}
                    onMouseEnter={() => this.handleClick('profile')}
                  ><em className="fa fa-user add-meal" />
                  </Link>
                  <label className={`p-add m-text ${this.state.profile}`}>Profile</label>
                </li>
                <li className="top-padding li-style">
                  <Link
                    to="/dashboard/profile"
                    className="y-color m-text pReset-link"
                    onMouseLeave={() => this.handleClose('cPassword')}
                    onMouseEnter={() => this.handleClick('cPassword')}
                  ><em className="fa fa-edit set-meal" />
                  </Link>
                  <label className={`hover p-set m-text ${this.state.cPassword}`}>Change Password</label>
                </li>
                <li className="top-padding li-style">
                  <span
                    role="button"
                    onClick={this.logOut}
                    className="y-color m-text logout-link"
                    onMouseLeave={() => this.handleClose('logOut')}
                    onMouseEnter={() => this.handleClick('logOut')}
                  ><em className="fa fa-power-off logout" />
                  </span>
                  <span className={`hover p-out m-text ${this.state.logOut}`}>LougOut</span>
                </li>
              </ul>
            </div>
          </nav>

          <main className={`main ${this.state.main}`} id="main">
            <header className="header p-color">
              <div className="l-r-pad-text">
                <h4 className="">USER DASHBOARD</h4>
                { window.localStorage.getItem('role') === 'user' ?
                  <span onClick={this.upgrade} className="y-color hover upgrade" role="button"> Upgrade To A Caterer ?</span>
                : <Link to="/admin" className="y-color">Manage your meals</Link>
                }
              </div>
              <div>
                <h4 className="">{window.localStorage.getItem('username')}</h4>
                <img src={window.localStorage.getItem('image')} className="user-img rounded-circle" alt="user" />
              </div>
              <div className="notification1">
                <span className="hover" onClick={this.toggle} role="button">
                  <h4 className=" hover">Notification</h4>
                  <em className="fa fa-bars l-r-pad-text y-color hover" />
                </span>
              </div>

            </header>

            <div className="content-container">
              <div className={`modal-order ${this.state.upgradeModal}`}>
                <button
                  style={{ float: 'right', backgroundColor: 'red', display: 'block' }}
                  className="remove-modal"
                  onClick={this.cancelUpgrade}
                >
                  &times;
                </button>
                <div className="modal-order-content" style={{ margin: '1rem 1rem 1rem 1rem' }}>
                  <p className="justify l-r-pad-text"> You are about to upgrade to admin/Caterer</p>
                  <p className="justify l-r-pad-text danger">{this.props.errorMessage.upgradeError}</p>
                </div>
                <div className="modal-order-content">
                  <button className="remove-modal confirmUpgrade" onClick={this.confirmUpgrade}>{this.state.upgradeButton}</button><button onClick={this.cancelUpgrade}className="remove-modal cancelUpgrade">Cancel</button>
                </div>
              </div>

              <Route exact path="/dashboard" component={MyMenu} />
              <Route exact path="/dashboard/profile" component={Profil} />
              <Route exact path="/dashboard/orders" component={Order} />
              <div className={`timeline-container ${this.state.timeline}`}>
                <h2>Timeline</h2>
                <Timeline notifics={this.props.notifics} />
              </div>

            </div>
            <Footer />
          </main>

        </div>

      </div>

    );
  }
}
Dashboard.propTypes = {
  notifics: PropTypes.array.isRequired,
  errorMessage: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

export function mapStateToProps(state) {
  const { notifics } = state;
  return {
    errorMessage: state.errorMessage,
    successMessage: state.successMessage,
    notifics
  };
}
export function mapDispatchToProps(dispatch) {
  return {
    menuActions: bindActionCreators(menuActions, dispatch),
    orderActions: bindActionCreators(orderActions, dispatch),
    actions: bindActionCreators(actions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
