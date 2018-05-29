import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Player, BigPlayButton } from 'video-react';
import 'video-react/dist/video-react.css';

import * as menuActions from '../../redux/Action/menuAction';
import * as orderActions from '../../redux/Action/orderAction';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mealId: '',
      menuId: '',
      quantity: 0,
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
  }
  componentWillMount() {
    this.props.menuActions.getMenu();
  }
  componentWillReceiveProps(newProps) {
    if (newProps.errorMessage || newProps.successMessage) {
      this.setState({ modal: 'modal', order: 'Order' });
    }
  }
  onChange(e) {
    const { state } = this;
    state[e.target.name] = e.target.value;
    this.setState(state);
  }
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
  orderMeal(e) {
    const {
      mealId,
      menuId,
      address,
      quantity
    } = this.state;
    if (!address) {
      this.setState({ addressError: 'Your address is required' }); return;
    } this.setState({ addressError: '' });
    if (!quantity) {
      this.setState({ quantityError: 'Quantity is required' }); return;
    } this.setState({ quantityError: '' });
    this.props.orderActions.orderMeal(mealId, menuId, address, quantity);
    this.setState({
      order: (<div><i className="fa fa-spinner fa-spin fa-2x fa-fw" aria-hidden="true" /></div>)
    });
  }
  render() {
    const confirmOrder = (mealId, menuId, mealName, image, price, mealDescription) => {
      this.setState({
        mealId,
        menuId,
        mealName,
        image,
        price,
        mealDescription,
        modal: ''
      });
    };
    return (
      <div className="meal-container">
        <div className={`modal-order ${this.state.modal}`}>
          <button
            style={{ float: 'right', backgroundColor: 'red', display: 'block' }}
            onClick={this.cancelOrder}
            className="remove-modal"
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
            <span className="modal-order-items l-r-pad-text"><input name="quantity" type="number" onChange={this.onChange} /></span>
          </div>
          <div className="justify-overide">
            <span className="modal-order-items l-r-pad-text"> Address: </span>
            <span className="modal-order-items l-r-pad-text"><input name="address" type="text" onChange={this.onChange} /></span>
          </div>
          <div className="modal-order-content">
            <span className="modal-order-items l-r-pad-text">
              <button onClick={this.orderMeal} className="remove-modal">{this.state.order}</button>
            </span>
            <span className="modal-order-items l-r-pad-text">
              <button onClick={this.cancelOrder} className="remove-modal">Cancel</button>
            </span>
          </div>
        </div>
        <h2>ORDER A MEAL IN A TWO MORE EASY STEPS</h2>
        <h4 className="p-color text-center">Choose and order a meal in todays menu using the order button</h4>
        <div className="all-meal-step">
          <div className="meal-day">
            <div >
              <div className="circle" ><span className="fa fa-check fa-4x p-color" style={{ margin: '10px 0px 0px 13px' }} /></div><br />
              <span>SignUp/SignIn</span>
            </div>
          </div>
          <div className="meal-day">
            <span className="fa fa-long-arrow-right fa-4x p-color" />
          </div>
          <div className="meal-day">
            <div >
              <div className="circle" /><br />
              <span>Order A Meal</span>
            </div>
          </div>
          <div className="meal-day">
            <span className="fa fa-long-arrow-right fa-4x p-color" />
          </div>
          <div className="meal-day">
            <div>
              <div><img src="image/l.png" id="App-logo" className="rounded-circle" style={{ height: '100px', width: '100px' }} alt="meal" /></div>
              <br /><span>Hot Fresh Meal</span>
            </div>
          </div>
        </div>
        <h2 className="top-bot-margin">TODAYS MENU</h2>
        <h3 className="success text-center">{this.props.successMessage.orderSuccess}</h3>
        <h3 className="danger text-center">{this.props.errorMessage.orderError}</h3>
        <h3 className="danger text-center">{this.props.errorMessage.getMenuError}</h3>
        {this.props.menu.map(menuMeals =>
          (
            <div>
              <h3 className="p-color text-center">Menu by Caterer&nbsp;
                <Link to={`/profile/${menuMeals.User.id}`}>{menuMeals.User.name}</Link>
                &nbsp; <img src={menuMeals.User.image} className="user-img rounded-circle" alt="profile" />
              </h3>
              {menuMeals.Meals.map(meal =>
            (
              <div className="contents">
                <div className="content-wrap">
                  <div className="col-meal l-r-pad-text">
                    <a href="image/l.png"><img src={meal.image} className="rounded-circle img-height" alt="menu meal" /></a>
                  </div>
                  <div className="col-meal">
                    <h4 className="p-color"> Name</h4>{meal.name}
                  </div>
                  <div className="col-meal">
                    <h4 className="p-color">Price(#)</h4>{meal.price}
                  </div>
                  <div className="col-meal">
                    <h5 className="p-color">
                      <Link to="/detail">View</Link>&nbsp;
                      <button onClick={() => confirmOrder(meal.id, menuMeals.id, meal.name, meal.image, meal.price, meal.description)}className="order1">
                        <em className="fa fa-cart-plus" />
                    &nbsp; Order
                      </button>
                    </h5>
                  </div>
                </div>
              </div>
              ))}
            </div>
          ))}
        {this.props.menu.length < 1 ?
          <div>
            <h3 className="p-color text-center">While waiting for today's menu, you might want to watch this video </h3>
            <h5 className="text-center"> French Recipe</h5>
            <div className="video-container">
              <Player poster="https://img.buzzfeed.com/thumbnailer-prod-us-east-1/13b12570812444f1bc86415b6e4c5284/BFV39875_VeganLunchMealPrep_FB_FINAL_FINAL_FINAL.jpg">
                <source src="https://vid.buzzfeed.com/output/83972/landscape_720/1520642061" />
                <BigPlayButton position="center" />
              </Player>
            </div>
          </div> : <span />}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    errorMessage: state.errorMessage,
    successMessage: state.successMessage,
    menu: state.menu
  };
}
function mapDispatchToProps(dispatch) {
  return {
    menuActions: bindActionCreators(menuActions, dispatch),
    orderActions: bindActionCreators(orderActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Menu);
