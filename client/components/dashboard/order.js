import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Popover from 'react-simple-popover';
import PropTypes from 'prop-types';
import Modal from 'react-responsive-modal';
import Pagination from 'react-js-pagination';
import * as orderActions from '../../redux/Action/orderAction';
import * as actions from '../../redux/Action/action';
import OrderModal from './modals/orderModal';

const limit = 6;
export class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmOrderModal: false,
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
      confirmButton: 'Confirm',
      activePage: 1
    };
    // bind this to methods
    this.onChange = this.onChange.bind(this);
    this.cancelOrder = this.cancelOrder.bind(this);
    this.modify = this.modify.bind(this);
    this.confirmStatus = this.confirmStatus.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);

    this.onOpenModal = this.onOpenModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
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
        open: false,
        confirmOrderModal: false,
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

  onCloseModal() {
    this.cancelOrder();
    this.setState({ open: false });
  }

  onOpenModal(orderId, mealName, quantity, address, price) {
    this.setState({
      orderId, mealName, quantity, address, price, modal: ''
    });
    this.setState({ open: true });
  }

  // show popover on hover
  handleClick(orderId, mealName) {
    this.setState({
      confirmOrderModal: !this.state.confirmOrderModal,
      orderId,
      mealName,
      statusModal: ''
    });
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

  handlePageChange(pageNumber) {
    const offset = (pageNumber - 1) * limit;
    this.setState({ activePage: pageNumber });
    this.props.orderActions.getMyOrder(limit, offset);
  }

  render() {
    const monthNames = [
      'January', 'February', 'March',
      'April', 'May', 'June',
      'July', 'August', 'September',
      'October', 'November', 'December'
    ];

    return (
      <div className="order-wrapper order-container">
        <div style={{ margin: '1rem 1rem 1rem 1rem' }}>
          <Modal open={this.state.open} onClose={this.onCloseModal} center>
            <OrderModal modify={this.modify} state={this.state} onChange={this.onChange} />
          </Modal>
          <Modal open={this.state.confirmOrderModal} onClose={this.handleClick} center>
            <br />
            <div className="modal-header">
              <p className="justify l-r-pad-text"> Confirm that you have received  {this.state.mealName}</p>
            </div>
            <div className="modal-contents">
              <button className="remove-modal confirmStatus" onClick={this.confirmStatus}>{this.state.confirmButton}</button>
            </div>
          </Modal>

          <h2 style={{ marginTop: '4rem' }}>MY MEAL ORDER HISTORY</h2>
          <h3 className="danger text-center"><b>{this.props.errorMessage.myOrderError}</b></h3>
          <table>
            <tbody>
              <tr className="p-color">
                <th>Name</th>
                <th>Quanitity odered
                </th>
                <th>Price ($)</th>
                <th>Total price</th>
                <td>Date</td>
                <td>Status</td>
                <td>Modify</td>
              </tr>
              {this.props.myOrder.rows.map(order =>
              (
                <tr key={order.id}>
                  <td>{order.Meal.name}</td>
                  <td>{order.quantity}</td>
                  <td>{order.Meal.price}</td>
                  <td>{order.totalPrice}</td>
                  <td>{monthNames[new Date(order.createdAt).getMonth()].substr(0, 3)} &nbsp;
                    {new Date(order.createdAt).getDate()} &nbsp;
                    {new Date(order.createdAt).getFullYear()}
                  </td>
                  <td>{order.status === 'pending' ?
                    <span>{order.status}&nbsp;
                      <button
                        className="y-color confirm-btn"
                        onClick={() => this.handleClick(order.id, order.Meal.name)}
                      >Confirm
                      </button>
                    </span>
                  : <span>{order.status}</span>}
                  </td>
                  <td>{ order.status === 'confirmed' ?
                    <button className="p-color modify-btn" disabled>Modify</button> :
                    <button onClick={() => this.onOpenModal(order.id, order.Meal.name, order.quantity, order.address, order.Meal.price)} className="p-color modify-btn" >Modify</button>}
                  </td>
                </tr>
                ))}
            </tbody>
          </table>
          <div className="meal-pagination">
            <Pagination
              activePage={this.state.activePage}
              itemsCountPerPage={limit}
              totalItemsCount={Math.ceil(this.props.myOrder.count)}
              pageRangeDisplayed={4}
              onChange={this.handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }
}
Orders.propTypes = {
  errorMessage: PropTypes.object.isRequired,
  orderActions: PropTypes.object.isRequired,
  myOrder: PropTypes.object.isRequired
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
