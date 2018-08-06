import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../header/index';
import Header2 from '../header/header2';
import Footer from '../footer/index';
import * as actions from '../../redux/Action/action';
import * as mealActions from '../../redux/Action/mealAction';
import * as orderActions from '../../redux/Action/orderAction';
import './index.scss';
import Order from './order';
import Allmeals from './allMeals';
import Setmenu from './setMenu';
import Addmeals from './addMeal';
import EditMeal from './edit';
import history from '../../history';
import auth from '../../authenticate/auth';
import SideBar from './sidebar';

const limit = 6;
export class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nav1: '',
      nav2: 'nav2',
      main: 'main-sidebar1',
      dash: 'dash',
      cPassword: 'cPassword',
      profile: 'profile',
      notific: 'notific',
      logout: 'logout',
      order: 'order',
      setmeal: 'setmeal',
      activePage: 1
    };
    this.logOut = this.logOut.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }
  /**
   * lifecycle hook called when component is mounted to DOM
   * @returns {mostOrder} load most ordered meal on page load
   * @returns {meals} get all meal
   * @returns {allOrder} get all orders.
   * refreshes token if it is not expired or logout and redirect to home if expired
   */
  componentDidMount() {
    this.props.mealActions.loadMostOrderedMeal(5);
    this.props.orderActions.getAllOrders();
    this.props.actions.refreshToken('admin');
  }
  // logout user
  logOut() {
    auth.logOut();
    history.push('/meals');
  }
  // toggle sidbar
  toggle() {
    if (this.state.nav1 === '') {
      this.setState({
        nav2: '',
        nav1: 'nav1',
        main: 'main-sidebar2'
      });
    } else {
      this.setState({
        nav2: 'nav2',
        nav1: '',
        main: 'main-sidebar1'
      });
    }
  }
  // Remove popover on mouseLeave
  handleClose(value) {
    const state = this;
    state[value] = value;
    this.setState(state);
  }
  // Popover on mouseEnter or hover
  handleClick(value) {
    const state = this;
    state[value] = '';
    this.setState(state);
  }

  handlePageChange(pageNumber) {
    const offset = (pageNumber - 1) * limit;
    this.setState({ activePage: pageNumber });
    this.props.orderActions.getAllOrders(limit, offset);
  }
  render() {
    const {
      nav1,
      nav2,
      main,
      dash,
      cPassword,
      profile,
      notific,
      logout,
      order,
      setmeal,
    } = this.state;
    const prop = {
      nav1,
      nav2,
      main,
      dash,
      cPassword,
      profile,
      notific,
      logout,
      order,
      setmeal,
    };

    return (
      <div>
        <span className="largeScreen-header">
          <Header component="admin" />
        </span>
        <span className="smallScreen-header">
          <Header2 />
        </span>
        <div className="admin-container">
          <SideBar
            {...prop}
            handleClick={this.handleClick}
            handleClose={this.handleClose}
            toggle={this.toggle}
            logOut={this.logOut}
          />
          <main className={`main ${this.state.main}`} id="main">
            <header className="header smallScreen-header">
              <div className="l-r-pad-text">
                <h4 className="p-color">ADMIN</h4>
              </div>
              <div>
                <h4 className="p-color">{window.localStorage.getItem('username')}</h4>
                <img src={window.localStorage.getItem('image')} className="user-img rounded-circle" alt="profile" />
              </div>
            </header>
            <Route
              exact
              path="/admin"
              render={props => (<Order
                mostOrder={this.props.mostOrder}
                allOrder={this.props.allOrder}
                activePage={this.state.activePage}
                handlePageChange={this.handlePageChange}
                {...props}
              />)}
            />
            <Route exact path="/admin/allmeals" component={Allmeals} />
            <Route exact path="/admin/setmenu" component={Setmenu} />
            <Route exact path="/admin/addmeals" component={Addmeals} />
            <Route path="/admin/edit/:mealId" component={EditMeal} />
            <Footer />
          </main>

        </div>

      </div>

    );
  }
}

Admin.propTypes = {
  mostOrder: PropTypes.array.isRequired,
  allOrder: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  mealActions: PropTypes.object.isRequired,
  orderActions: PropTypes.object.isRequired,
};

export const mapStateToProps = state => ({
  errorMessage: state.errorMessage,
  mostOrder: state.mostOrder,
  allOrder: state.allOrder,
  cart: state.cart
});

export const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
  mealActions: bindActionCreators(mealActions, dispatch),
  orderActions: bindActionCreators(orderActions, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(Admin);
