import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Popover from 'react-simple-popover';
import PropTypes from 'prop-types';
import * as orderActions from '../../redux/Action/orderAction';
import * as actions from '../../redux/Action/action';


export class Orders extends Component {
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
    // bind this to methods
    this.onChange = this.onChange.bind(this);
    this.cancelOrder = this.cancelOrder.bind(this);
    this.modify = this.modify.bind(this);
    this.confirmStatus = this.confirmStatus.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  /**
   * lifecycle hook called when component is mounted to DOM
   *
   * @memberof DashboardOrder index
   *
   * @returns {undefined} get all orders
   */
  componentDidMount() {
    this.props.orderActions.getMyOrder();
  }
  /**
   * lifecycle hook called when component receives new props
   * Return new state when new props arrive from redux store
   */
  static getDerivedStateFromProps(props) {
    if (props.errorMessage.updateError) {
      const modifyError = props.errorMessage.updateError;
      props.actions.clearMessages();
      return {
        modifyOrder: 'Modify',
        modifyError
      };
    } else if (props.successMessage.updateSuccess || props.successMessage.confirmSuccess) {
      props.actions.clearMessages();
      return {
        modal: 'modal',
        address: '',
        quantity: '',
        orderId: '',
        price: '',
        statusModal: 'modal',
        modifyError: '',
        modifyOrder: 'Modify',
        confirmButton: 'Confirm'
      };
    }
    return null;
  }
  /**
   * @param  {} e set state on input onchange event
  */
  onChange(e) {
    const { state } = this;
    state[e.target.name] = e.target.value;
    this.setState(state);
  }
  // show popover on hover
  handleClick() {
    this.setState({ open: !this.state.open });
  }
  // close popover on mouse leave event
  handleClose() {
    this.setState({ open: false });
  }
  /**
   * cancel modal if the user dont want to proceed with the order
  */
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
  /**
   * call a redux action
   * user confirms that meal is received
  */
  confirmStatus() {
    const { orderId } = this.state;
    this.props.orderActions.confirmStatus(orderId);
    this.setState({ confirmButton: (<div><i className="fa fa-spinner fa-spin fa-2x fa-fw" aria-hidden="true" /></div>) });
  }
  /**
   * call a redux action
   * modifies order within an hour the meal was ordered
  */
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
    // show confirm status order modal
    const confirmOrder = (orderId, mealName) => {
      this.setState({ orderId, mealName, statusModal: '' });
    };
    // show modify order modal
    const modifyOrder = (orderId, mealName, quantity, address, price) => {
      this.setState({
        orderId, mealName, quantity, address, price, modal: ''
      });
    };
    return (
      <div className="order-wrapper order-container">
        <div style={{ margin: '1rem 1rem 1rem 1rem' }}>
          <div className={`modal-order ${this.state.statusModal}`}>
            <button
              style={{ float: 'right', backgroundColor: 'red', display: 'block' }}
              className="remove-modal"
              onClick={this.cancelOrder}
            >
              &times;
            </button>
            <div className="modal-order-content" style={{ margin: '1rem 1rem 1rem 1rem' }}>
              <p className="justify l-r-pad-text"> Confirm that you have received  {this.state.mealName}</p>
            </div>
            <div className="modal-order-content">
              <button className="remove-modal confirmStatus" onClick={this.confirmStatus}>{this.state.confirmButton}</button><button onClick={this.cancelOrder}className="remove-modal">Cancel</button>
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
              <span className="modal-order-items l-r-pad-text"><input id="quantity" value={this.state.quantity} name="quantity" type="number" onChange={this.onChange} /></span>
            </div>
            <div className="justify-overide">
              <span className="modal-order-items l-r-pad-text address"> Address: </span>
              <span className="modal-order-items l-r-pad-text"><input id="address" value={this.state.address} name="address" type="text" onChange={this.onChange} /></span>
            </div>
            <div className="modal-order-content">
              <span className="modal-order-items l-r-pad-text">
                <button onClick={this.modify} className="remove-modal modify">{this.state.modifyOrder}</button>
              </span>
              <span className="modal-order-items l-r-pad-text">
                <button onClick={this.cancelOrder} className="remove-modal cancel">Cancel</button>
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
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.Meal.name}</td>
                  <td>{order.quantity}</td>
                  <td>{order.Meal.price}</td>
                  <td>{order.totalPrice}</td>
                  <td>{monthNames[new Date(order.createdAt).getMonth()].substr(0, 3)} &nbsp;
                    {new Date(order.createdAt).getDate()} &nbsp;
                    {new Date(order.createdAt).getFullYear()}
                  </td>
                  <td>{order.address}</td>
                  <td>{order.status === 'pending' ?
                    <span>{order.status}
                      <button
                        className="y-color confirm-btn"
                        onClick={() => confirmOrder(order.id, order.Meal.name)}
                        ref="target"
                        onMouseEnter={this.handleClick}
                        onMouseLeave={this.handleClose}
                      >Confirm
                      </button>
                      <Popover
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
                  <td><button className="p-color modify-btn" onClick={() => modifyOrder(order.id, order.Meal.name, order.quantity, order.address, order.Meal.price)}>Modify</button></td>
                </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
Orders.propTypes = {
  errorMessage: PropTypes.object.isRequired,
  orderActions: PropTypes.object.isRequired,
  myOrder: PropTypes.array.isRequired
};
export function mapStateToProps(state) {
  return {
    errorMessage: state.errorMessage,
    successMessage: state.successMessage,
    myOrder: state.myOrder
  };
}
export function mapDispatchToProps(dispatch) {
  return {
    orderActions: bindActionCreators(orderActions, dispatch),
    actions: bindActionCreators(actions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Orders);
