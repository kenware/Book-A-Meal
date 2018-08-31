import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../header/index';
import * as actions from '../../redux/Action/action';
import * as mealActions from '../../redux/Action/mealAction';
import * as orderActions from '../../redux/Action/orderAction';
import './index.scss';
import Order from './order';
import Allmeals from './allMeals';
import Setmenu from './setMenu';
import Addmeals from './addMeal';
import EditMeal from './edit';

const limit = 6;
export class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1
    };
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

  handlePageChange(pageNumber) {
    const offset = (pageNumber - 1) * limit;
    this.setState({ activePage: pageNumber });
    this.props.orderActions.getAllOrders(limit, offset);
  }
  render() {
    return (
      <div>
        <Header component="admin" />
        <div className="page-container">
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
