import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route, Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Modal from 'react-responsive-modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from '../header/index';
import Header3 from '../header/header3';
import MyMenu from './menu';
import Order from './order';
import Footer from '../footer/index';
import Profil from './profile';
import './index.scss';
import * as mealActions from '../../redux/Action/mealAction';
import * as menuActions from '../../redux/Action/menuAction';
import * as orderActions from '../../redux/Action/orderAction';
import * as actions from '../../redux/Action/action';
import Timeline from './timeline';
import auth from '../../authenticate/auth';
import history from '../../history';
import CheckOutModal from './modals/checkOutModal';

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      nav1: 'nav1',
      nav2: '',
      modal: 'modal',
      timeline: '',
      main: 'main-sidebar2',
      dash: 'dash',
      adminPage: 'adminPage',
      order: 'order',
      cPassword: 'cPassword',
      profile: 'profile',
      notific: 'notific',
      logOut: 'logOut',
      orderBtn: 'Check Out',
      upgradeModal: false,
      upgradeButton: 'Upgrade',
      orderError: '',
      Redirect: false,
      address: '',
      errorMessage: ''
    };
    this.upgrade = this.upgrade.bind(this);
    this.confirmUpgrade = this.confirmUpgrade.bind(this);
    this.logOut = this.logOut.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onModal = this.onModal.bind(this);
    this.onChange = this.onChange.bind(this);
    this.orderMeal = this.orderMeal.bind(this);
    this.removeFromeCart = this.removeFromeCart.bind(this);
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
    this.props.mealActions.loadMostOrderedMeal(5);
  }
  /**
   * lifecycle hook called when component receives props
   *
   * @memberof Dashboard index
   * return state after it is changed
   */
  componentWillReceiveProps(newProps) {
    if (newProps.successMessage.orderSuccess) {
      this.setState({
        orderBtn: 'Check Out',
        open: false
      });
      this.props.cart.cart = [];
      toast('Order created', {
        className: 'toast'
      });
    } else if (newProps.successMessage.upgradeSuccess) {
      this.setState({
        upgradeModal: false,
        upgradeButton: 'upGrade',
        admin: true
      });
    } else if (newProps.errorMessage.orderError) {
      this.setState({
        orderBtn: 'Check Out',
        errorMessage: 'You cannot order this menu at this time'
      });
      toast.error('Order failed', {
        className: 'toast'
      });
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

  onModal() {
    this.setState({
      open: !this.state.open,
      orderError: ''
    });
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
    this.setState({ upgradeModal: !this.state.upgradeModal });
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

  /**
   * Orders meal
   * calls redux action
  */
  orderMeal() {
    const {
      address
    } = this.state;
    if (!address) { return this.setState({ orderError: 'Address is required' }); }
    const order = {
      address: this.state.address,
      meals: this.props.cart.cart
    };
    this.props.orderActions.orderMeal(order);
    this.setState({
      orderBtn: (<div><i className="fa fa-spinner fa-spin fa-2x fa-fw" aria-hidden="true" /></div>)
    });
  }
  removeFromeCart(cart) {
    const myCart = this.props.cart.cart;
    const index = myCart.indexOf(cart);
    const newCart = this.props.cart.cart.splice(index, 1);
    this.setState({ open: true });
  }
  render() {
    if (this.state.admin) { return (<Redirect to="/admin" />); }
    return (
      <div>
        <ToastContainer autoClose={8000} />
        <span className="largeScreen-header">
          <Header component="dash" onModal={this.onModal} cart={this.props.cart.cart} />
        </span>
        <span className="smallScreen-header">
          <Header3 />
        </span>
        <div className="react-modal">
          <Modal open={this.state.open} onClose={this.onModal} center>
            <div style={{ backgroundColor: '#eee' }}>
              <CheckOutModal
                checkOut={this.checkOut}
                carts={this.props.cart.cart}
                state={this.state}
                onChange={this.onChange}
                removeFromeCart={this.removeFromeCart}
              />
              <button onClick={this.orderMeal} className="checkout-btn">{this.state.orderBtn}</button>
            </div>
          </Modal>
          <Modal open={this.state.upgradeModal} onClose={this.upgrade} center>
            <div className="modal-upgrade">
              <p className="justify l-r-pad-text danger">
                {this.props.errorMessage.upgradeError}
              </p>
              <h4 className="">
              You are about to upgrade to an admin
              </h4>
            </div>
            <button
              onClick={this.confirmUpgrade}
              id="upgrade"
              className="checkout-btn"
            >
              {this.state.upgradeButton}
            </button>
          </Modal>
        </div>
        <div className="admin-container">
          <nav className={`sidebar sidebar1-width ${this.state.nav1}`}>
            <div>
              <em className="fa fa-bars l-r-pad-text m-text bar1 toggle1 y-color" onClick={this.toggle} role="button" />
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
                  <span onClick={this.logOut} className="y-color" role="button">LogOut</span>
                </li>
              </ul>
            </div>
          </nav>
          <nav className={`sidebar sidebar2-width ${this.state.nav2}`}>
            <div>
              <ul className="y-color">
                <li className=" li-style">
                  <em className="fa fa-bars m-text bar2 y-color " onClick={this.toggle} role="button" />
                </li>
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
                {window.localStorage.getItem('role') === 'admin' ?
                  <li className="top-padding li-style">
                    <Link
                      to="/admin"
                      className="y-color m-text admin-link"
                      onMouseLeave={() => this.handleClose('adminPage')}
                      onMouseEnter={() => this.handleClick('adminPage')}
                    ><em className="fa fa-user-secret popover all-meal" />
                    </Link>
                    <span className={`p-admin m-text ${this.state.adminPage}`}>Admin</span>
                  </li>
                : <span />}
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
            <header className="header p-color smallScreen-header">
              <div className="l-r-pad-text">
                <h4 className="">USER DASHBOARD</h4>
                { window.localStorage.getItem('role') === 'user' ?
                  <span onClick={this.upgrade} className="y-color hover upgrade" role="button"> Upgrade To A Caterer ?</span>
                : <Link to="/admin" className="y-color">Manage your meals</Link>
                }
              </div>
              <div> <br /><br />
                <img src={window.localStorage.getItem('image') !== 'null' ? window.localStorage.getItem('image') : 'image/profile.png'} className="user-img rounded-circle" alt="user" />
              </div>
              <div className="notification1"><br />
                <span className="hover" onClick={this.toggle} role="button">
                  <h4 className=" hover"><em className="fa fa-bell notif" /></h4>
                </span>
              </div>
              <div onClick={this.onModal} role="button" >
                <br /><br />
                <em className="p-color">{this.props.cart.cart.length}</em>
                <i className="fa fa-shopping-cart fa-2x" aria-hidden="true" />
              </div>
            </header>
            <div className="content-container">
              <Route exact path="/dashboard" component={MyMenu} />
              <Route exact path="/dashboard/profile" component={Profil} />
              <Route exact path="/dashboard/orders" component={Order} />
              <div className={`timeline-container ${this.state.timeline}`}>
                <h2>Timeline</h2>
                <Timeline
                  notifics={this.props.notifics}
                  mostOrder={this.props.mostOrder}
                  upGrade={this.upgrade}
                />
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
  cart: PropTypes.object.isRequired,
  orderActions: PropTypes.object.isRequired,
  mostOrder: PropTypes.array.isRequired,
  mealActions: PropTypes.object.isRequired
};

export function mapStateToProps(state) {
  const { notifics } = state;
  return {
    errorMessage: state.errorMessage,
    successMessage: state.successMessage,
    notifics,
    cart: state.cart,
    mostOrder: state.mostOrder,
  };
}
export function mapDispatchToProps(dispatch) {
  return {
    menuActions: bindActionCreators(menuActions, dispatch),
    orderActions: bindActionCreators(orderActions, dispatch),
    actions: bindActionCreators(actions, dispatch),
    mealActions: bindActionCreators(mealActions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
