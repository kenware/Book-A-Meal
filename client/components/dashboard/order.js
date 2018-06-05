import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Popover from 'react-simple-popover';

import * as orderActions from '../../redux/Action/orderAction';


class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      quantity: '',
      address: '',
      orderId: '',
      mealName: '',
      price: '',
      totalPrice: '',
      modal: 'modal',
      modifyOrder: 'Modify',
      statusModal: 'modal',
      modifyError: '',
      confirmButton: 'Confirm'
    };
    this.onChange = this.onChange.bind(this);
    this.cancelOrder = this.cancelOrder.bind(this);
    this.modify = this.modify.bind(this);
    this.confirmStatus = this.confirmStatus.bind(this);
  }
  componentDidMount() {
    this.props.orderActions.getMyOrder();
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    if (newProps.errorMessage.updateError) {
      this.setState({
        modifyOrder: 'Modify',
        modifyError: newProps.errorMessage.updateError
      });
    } else if (newProps.successMessage.updateSuccess) {
      this.cancelOrder();
    }
    else if (newProps.successMessage.confirmSuccess) {
      this.cancelOrder();
    }
  }

  onChange(e) {
    const { state } = this;
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  handleClick(e) {
    this.setState({ open: !this.state.open });
  }

  handleClose(e) {
    this.setState({ open: false });
  }
  cancelOrder() {
    this.setState({
      modal: 'modal',
      address: '',
      quantity: '',
      orderId: '',
      price: '',
      statusModal: 'modal',
      modifyError: '',
      modifyOrder: 'Modify',
      confirmButton: 'Confirm'
    });
  }
  confirmStatus() {
    const { orderId } = this.state;
    this.props.orderActions.confirmStatus(orderId);
    this.setState({ confirmButton: (<div><i className="fa fa-spinner fa-spin fa-2x fa-fw" aria-hidden="true" /></div>) });
  }
  modify() {
    const {
      orderId,
      quantity,
      address,
      status
    } = this.state;
    if (!quantity || !address) {
      return this.setState({ modifyError: 'All the field is required' });
    }
    this.setState({ modifyOrder: (<div><i className="fa fa-spinner fa-spin fa-2x fa-fw" aria-hidden="true" /></div>) });
    this.props.orderActions.updateOrder(orderId, quantity, address, status);
  }


  render() {
    const monthNames = [
      'January', 'February', 'March',
      'April', 'May', 'June',
      'July', 'August', 'September',
      'October', 'November', 'December'
    ];

    const confirmOrder = (orderId, mealName) => {
      this.setState({ orderId, mealName, statusModal: '' });
    };
    const modifyOrder = (orderId, mealName, quantity, address, price) => {
      this.setState({
        orderId, mealName, quantity, address, price, modal: ''
      });
    };
    return (
      <div className="order-wrapper order-container">
        <div style={{margin: '1rem 1rem 1rem 1rem'}}>
        <div className={`modal-order ${this.state.statusModal}`}>
          <button
            style={{ float: 'right', backgroundColor: 'red', display: 'block' }}
            className="remove-modal"
            onClick={this.cancelOrder}
          >
            &times;
          </button>
          <div className="modal-order-content" style={{ margin: '1rem 1rem 1rem 1rem' }}>
            <p className="justify l-r-pad-text"> Confirm{this.state.orderId} that you have received ' {this.state.mealName} '</p>
          </div>
          <div className="modal-order-content">
            <button className="remove-modal" onClick={this.confirmStatus}>{this.state.confirmButton}</button><button onClick={this.cancelOrder}className="remove-modal">Cancel</button>
          </div>
        </div>
        <div className={`modal-order ${this.state.modal}`}>
          <button
            style={{ float: 'right', backgroundColor: 'red', display: 'block' }}
            onClick={this.cancelOrder}
            className="remove-modal"
          >
             &times;
          </button>
          <div className="modal-order-content">
            <p className="justify l-r-pad-text">
              Edit the field to modify this order<br />
              NB This order can only be modified <br />within ONE hour after it is created
              <h4 className="danger text-center">{this.state.modifyError}</h4>
            </p>
          </div>
          <div className="justify-overide">
            <span className="modal-order-items l-r-pad-text"> Name: </span>
            <span className="modal-order-items ">{this.state.mealName}</span>
          </div>
          <div className="justify-overide">
            <span className="modal-order-items l-r-pad-text"> Price per Meal(#): </span>
            <span className="modal-order-items ">{this.state.price}</span>
          </div>
          <div className="justify-overide">
            <span className="modal-order-items l-r-pad-text"> Quantity: </span>
            <span className="modal-order-items l-r-pad-text"><input value={this.state.quantity} name="quantity" type="number" onChange={this.onChange} /></span>
          </div>
          <div className="justify-overide">
            <span className="modal-order-items l-r-pad-text"> Address: </span>
            <span className="modal-order-items l-r-pad-text"><input value={this.state.address} name="address" type="text" onChange={this.onChange} /></span>
          </div>
          <div className="modal-order-content">
            <span className="modal-order-items l-r-pad-text">
              <button onClick={this.modify} className="remove-modal">{this.state.modifyOrder}</button>
            </span>
            <span className="modal-order-items l-r-pad-text">
              <button onClick={this.cancelOrder} className="remove-modal">Cancel</button>
            </span>
          </div>
        </div>

        <h2 style={{ marginTop: '4rem' }}>MY MEAL ORDER HISTORY</h2>
        <h3 className="danger text-center"><b>{this.props.errorMessage.myOrderError}</b></h3>
        <table>
          <tbody>
            <tr>
              <th>id</th>
              <th>Name</th>
              <th>Quanitity odered
              </th>
              <th>Price ($)</th>

              <th>Total price ( price * quantity)</th>
              <td>Date</td>
              <td>Address</td>
              <td>Status</td>
              <td>Modify</td>
            </tr>
            {this.props.myOrder.map(order =>
              (
                <tr>
                  <td>{order.id}</td>
                  <td>{order.Meal.name}</td>
                  <td>{order.quantity}</td>
                  <td>{order.Meal.price}</td>
                  <td>{order.totalPrice}</td>
                  <td>{monthNames[new Date(order.createdAt).getMonth()].substr(0, 3)}&nbsp;
                    {new Date(order.createdAt).getDate()} &nbsp; {new Date(order.createdAt).getFullYear()}
                  </td>
                  <td>{order.address}</td>
                  <td>{order.status === 'pending' ?
                    <span>{order.status}
                      <button
                        className="y-color"
                        onClick={() => confirmOrder(order.id, order.Meal.name)}
                        ref="target"
                        onMouseEnter={this.handleClick.bind(this)}
                        onMouseLeave={this.handleClose.bind(this)}
                      >Confirm
                      </button>
                      <Popover
                        container={{ color: 'yellow' }}
                        placement="top"
                        container={this}
                        target={this.refs.target}
                        show={this.state.open}
                      >
                        <p className="p-color">Confirm Meal Delivery</p>
                      </Popover>
                    </span>
                  : <span>{order.status}</span>}
                  </td>
                  <td><button className="p-color" onClick={() => modifyOrder(order.id, order.Meal.name, order.quantity, order.address, order.Meal.price)}>Modify</button></td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    errorMessage: state.errorMessage,
    successMessage: state.successMessage,
    myOrder: state.myOrder
  };
}
function mapDispatchToProps(dispatch) {
  return { orderActions: bindActionCreators(orderActions, dispatch) };
}
export default connect(mapStateToProps, mapDispatchToProps)(Orders);
