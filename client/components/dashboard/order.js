import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from 'react-accessible-accordion';
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
      modifyOrder: 'Modify',
      statusModal: 'modal',
      modifyError: '',
      confirmButton: 'Confirm',
      activePage: 1
    };
    this.onChange = this.onChange.bind(this);
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
      const update = props.successMessage.updateSuccess ? 'Order updated successfuly' : 'Order delivery confirmed';
      toast(update, {
        className: 'toast'
      });
      props.actions.clearMessages();
      return {
        open: false,
        confirmOrderModal: false,
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
    this.setState({ open: false });
  }

  onOpenModal(meal, order) {
    this.setState({
      orderId: order.id,
      mealId: meal.id,
      mealName: meal.name,
      quantity: meal.orderMealItems.quantity,
      address: order.address,
      price: meal.price,
      open: true
    });
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
      quantity,
      address,
      mealId,
      orderId,
    } = this.state;

    if (!quantity || !address) {
      return this.setState({ modifyError: 'All the field is required' });
    }

    const meals = [{
      mealId,
      quantity
    }];

    this.setState({ modifyOrder: (<div><i className="fa fa-spinner fa-spin fa-2x fa-fw" aria-hidden="true" /></div>) });
    this.props.orderActions.updateOrder(orderId, meals, address);
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
        <ToastContainer autoClose={8000} />
        <div style={{ margin: '1rem 1rem 1rem 1rem' }}>
          <Modal open={this.state.open} onClose={this.onCloseModal} center>
            <OrderModal modify={this.modify} state={this.state} onChange={this.onChange} />
          </Modal>
          <Modal open={this.state.confirmOrderModal} onClose={this.handleClick} center>
            <br />
            <div className="modal-header">
              <p className="justify l-r-pad-text"> Confirm that you have received this order</p>
            </div>
            <div className="modal-contents">
              <button style={{ float: 'left', minHeight: '2rem' }} className="remove-modal confirmStatus" onClick={this.confirmStatus}>{this.state.confirmButton}</button>
            </div>
          </Modal>

          <h2 style={{ marginTop: '4rem' }}>MY MEAL ORDER HISTORY</h2>
          <h3 className="danger text-center"><b>{this.props.errorMessage.myOrderError}</b></h3>
          { this.props.myOrder.orders.length > 0 ?
            <div>
              <Accordion>
                <AccordionItem>
                  <AccordionItemTitle>
                    <div className="accordion__meal" />
                    <div className="order-accordion accordion-color">
                      <div> S/N </div>
                      <div>Total price</div>
                      <div>Date</div>
                      <div>Address</div>
                      <div>Status</div>
                      <div>Action</div>
                    </div>
                  </AccordionItemTitle>
                </AccordionItem>
                {this.props.myOrder.orders.map(order => (
                  <AccordionItem key={order.id}>
                    <AccordionItemTitle>
                      <div className="accordion__arrow u-postion-relative" />
                      <div className="order-accordion">
                        <div className="order-">
                          {this.props.myOrder.orders.indexOf(order) + 1}
                        </div>
                        <div className="order-contents ">
                          N{order.totalPrice}
                        </div>
                        <div className="order-contents ">
                          {monthNames[new Date(order.createdAt).getMonth()].substr(0, 3)}&nbsp;
                          {new Date(order.createdAt).getDate()} &nbsp;
                          {new Date(order.createdAt).getFullYear()}
                        </div>
                        <div>{order.address}</div>
                        <div className="order-contents">
                          {order.status}
                        </div>
                        <div>
                          {order.status === 'pending' ?
                            <button
                              className=" confirm-btn"
                              onClick={() => this.handleClick(order.id)}
                            >Confirm
                            </button>
                          : <span />
                        }
                        </div>
                      </div>
                    </AccordionItemTitle>
                    <AccordionItemBody>
                      <table className="table">
                        <tbody>
                          <tr className="p-color tr-height tr-color">
                            <th>S/N</th>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total Price</th>
                            <th>Edit</th>
                          </tr>
                          { order.meals.map(meal => (
                            <tr className="p-color tr tr-height" key={meal.id}>
                              <td>{order.meals.indexOf(meal) + 1}</td>
                              <td>{meal.name}</td>
                              <td>{meal.orderMealItems.quantity}</td>
                              <td>N{meal.price}</td>
                              <td>{meal.totalPrice}</td>
                              <td>{ order.status === 'pending' ?
                                <em role="button" onClick={() => this.onOpenModal(meal, order)} className="modify-btn fa fa-edit fa-2x" />
                                : <span />}
                              </td>
                            </tr>
                            ))}
                        </tbody>
                      </table>
                    </AccordionItemBody>
                  </AccordionItem>
                ))}
              </Accordion>
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
         : <div /> }
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
