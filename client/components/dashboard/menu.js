import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import 'video-react/dist/video-react.css';
import PropTypes from 'prop-types';
import * as actions from '../../redux/Action/action';
import * as menuActions from '../../redux/Action/menuAction';
import * as orderActions from '../../redux/Action/orderAction';
import MealGuide from './mealGuide';
import TodayMenu from './todayMenu';
import Video from './video';

export class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mealId: '',
      menuId: '',
      quantity: '',
      address: '',
      name: '',
      image: '',
      price: '',
      mealDescription: '',
      order: 'Order',
      modal: 'modal'
    };
    this.onChange = this.onChange.bind(this);
    this.orderMeal = this.orderMeal.bind(this);
    this.cancelOrder = this.cancelOrder.bind(this);
    this.confirmOrder = this.confirmOrder.bind(this);
  }
  /**
   * lifecycle hook called when component is mounted to DOM
   *
   * @memberof DashboardMenu index
   *
   * @returns {undefined} fetches totay menu
   */
  componentDidMount() {
    this.props.menuActions.getMenu();
  }
  /**
   * lifecycle hook called when component receives
   * Return new state when new props arrive from redux store
   */
  static getDerivedStateFromProps(props) {
    if (props.errorMessage.orderError || props.successMessage.orderSuccess) {
      const successMessage = props.successMessage.orderSuccess;
      const errorMessage = props.errorMessage.orderError;
      props.actions.clearMessages();
      return {
        modal: 'modal',
        order: 'Order',
        errorMessage,
        successMessage
      };
    }
    return null;
  }
  /**
   * remove error props/messages in redux store if component unmount
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
   * cancel modal if the user dont want to proceed with the order
  */
  cancelOrder() {
    this.setState({
      modal: 'modal',
      mealId: '',
      menuId: '',
      mealName: '',
      image: '',
      price: '',
      quantityError: '',
      addressError: ''
    });
  }
  /**
   * Orders meal
   * calls redux action
  */
  orderMeal() {
    const {
      mealId,
      menuId,
      address,
      quantity
    } = this.state;
    // Ensure that address and quanity is not empty
    if (!address) {
      this.setState({ addressError: 'Your address is required' }); return;
    } this.setState({ addressError: '' });
    if (!quantity) {
      this.setState({ quantityError: 'Quantity is required' }); return;
    } this.setState({ quantityError: '' });
    // redux addmeal action
    this.props.orderActions.orderMeal(mealId, menuId, address, quantity);
    this.setState({
      order: (<div><i className="fa fa-spinner fa-spin fa-2x fa-fw" aria-hidden="true" /></div>)
    });
  }
  // shows modal to comfirm that user want to a meal
  confirmOrder(mealId, menuId, mealName, image, price, mealDescription) {
    this.setState({
      mealId,
      menuId,
      mealName,
      image,
      price,
      mealDescription,
      modal: ''
    });
  }
  render() {
    return (
      <div className="meal-container">
        <div className={`modal-order ${this.state.modal}`}>
          <button
            style={{ float: 'right', backgroundColor: 'red', display: 'block' }}
            onClick={this.cancelOrder}
            className="remove-modal top-close"
          >
             &times;
          </button>
          <div className="modal-order-content">
            <img src={this.state.image} className="rounded-circle img-height" alt="menu" />
          </div>
          <div className="modal-order-content">
            <p className="justify l-r-pad-text">
              You about to Order {this.state.mealName}<br />
              <h4 className="danger text-center">{this.state.quantityError}</h4>
              <h4 className="danger text-center">{this.state.addressError}</h4>
            </p>
          </div>
          <div className="justify-overide">
            <span className="modal-order-items l-r-pad-text"> Name:: </span>
            <span className="modal-order-items ">{this.state.mealName}</span>
          </div>
          <div className="justify-overide">
            <span className="modal-order-items l-r-pad-text"> Price (#): </span>
            <span className="modal-order-items ">{this.state.price}</span>
          </div>
          <div className="justify-overide">
            <span className="modal-order-items l-r-pad-text"> Quantity: </span>
            <span className="modal-order-items l-r-pad-text"><input id="quantity" name="quantity" type="number" onChange={this.onChange} /></span>
          </div>
          <div className="justify-overide">
            <span className="modal-order-items l-r-pad-text"> Address: </span>
            <span className="modal-order-items l-r-pad-text"><input name="address" id="address" type="text" onChange={this.onChange} /></span>
          </div>
          <div className="modal-order-content">
            <span className="modal-order-items l-r-pad-text">
              <button onClick={this.orderMeal} className="remove-modal order-meal">{this.state.order}</button>
            </span>
            <span className="modal-order-items l-r-pad-text">
              <button onClick={this.cancelOrder} className="remove-modal close-modal">Cancel</button>
            </span>
          </div>
        </div>
        <MealGuide />
        <h2 className="top-bot-margin">TODAYS MENU</h2>
        <h3 className="success text-center">{this.state.successMessage}</h3>
        <h3 className="danger text-center">{this.state.errorMessage}</h3>
        <h3 className="danger text-center">{this.props.errorMessage.getMenuError}</h3>
        <TodayMenu menu={this.props.menu} confirmOrder={this.confirmOrder} />
        {this.props.menu.length < 1 ?
          <Video /> : <span />}
      </div>
    );
  }
}
// propType validation
Menu.propTypes = {
  errorMessage: PropTypes.object.isRequired,
  orderActions: PropTypes.object.isRequired,
  menu: PropTypes.array.isRequired,
  menuActions: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

export function mapStateToProps(state) {
  return {
    errorMessage: state.errorMessage,
    successMessage: state.successMessage,
    menu: state.menu
  };
}
export function mapDispatchToProps(dispatch) {
  return {
    menuActions: bindActionCreators(menuActions, dispatch),
    orderActions: bindActionCreators(orderActions, dispatch),
    actions: bindActionCreators(actions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Menu);
