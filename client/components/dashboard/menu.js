import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import 'video-react/dist/video-react.css';
import PropTypes from 'prop-types';
import Modal from 'react-responsive-modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Pagination from 'react-js-pagination';
import * as actions from '../../redux/Action/action';
import * as menuActions from '../../redux/Action/menuAction';
import * as orderActions from '../../redux/Action/orderAction';
import MealGuide from './mealGuide';
import TodayMenu from './todayMenu';
import Video from './video';
import MenuModal from './modals/menuModal';

const limit = 4;
export class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      address: '',
      name: '',
      cart: {},
      checkOut: [],
      pageNum: 1,
      accordion: {},
      menuActivePage: 1,
      mealActivePage: 1
    };
    this.onChange = this.onChange.bind(this);
    this.cancelOrder = this.cancelOrder.bind(this);
    this.showMenu = this.showMenu.bind(this);
    this.handleMenuPageChange = this.handleMenuPageChange.bind(this);
    this.handleMealPageChange = this.handleMealPageChange.bind(this);
    this.cartModal = this.cartModal.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }
  /**
   * lifecycle hook called when component is mounted to DOM
   *
   * @memberof DashboardMenu index
   *
   * @returns {undefined} fetches totay menu
   */
  componentDidMount() {
    this.props.menuActions.getMenu(limit, 0);
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

  cartModal(mealId, menuId, mealName, image, price, mealDescription) {
    const cart = {
      mealId,
      menuId,
      mealName,
      image,
      price,
      mealDescription,
    };
    this.setState({
      cart,
      open: !this.state.open
    });
  }

  // shows modal to comfirm that user want to a meal
  addToCart() {
    if (!this.state.quantity) {
      return this.setState({ emptyAddress: 'All the field is required' });
    }
    if (this.state.quantity < 1) {
      return this.setState({ emptyAddress: 'Quantity cannot be less than one' });
    }
    const myOrder = {
      mealId: this.state.cart.mealId,
      name: this.state.cart.mealName,
      menuId: this.state.cart.menuId,
      quantity: Number(this.state.quantity)
    };

    const { cart } = this.props.cart;
    for (const meal of cart) {
      if (meal.menuId === myOrder.menuId && meal.mealId === myOrder.mealId) {
        toast.error('This meal is already in the cart', {
          className: 'errortoast'
        });
        return this.setState({ open: false });
      }
    }
    this.props.menuActions.addToCart(myOrder);
    this.setState({ open: false });
  }

  showMenu(id, url) {
    let state = this.state.accordion;
    if (state[id]) {
      this.state.accordion = {};
      this.setState(state);
    } else {
      this.props.menuActions.clearMenuMeals();
      this.props.menuActions.getMenuMeals(url);
      this.state.accordion = {};
      state = this.state.accordion;
      state[id] = id;
      state.url = url;
      this.setState(state);
    }
  }
  /**
   * Pagination method
   * Menu Pagination
   */
  handleMenuPageChange(pageNumber) {
    const offset = (pageNumber - 1) * limit;
    this.setState({ menuActivePage: pageNumber });
    this.props.menuActions.getMenu(limit, offset);
  }

  /**
   * Pagination method
   * Meal Pagination
   */
  handleMealPageChange(pageNumber) {
    const offset = (pageNumber - 1) * limit;
    this.setState({ mealActivePage: pageNumber });
    this.props.menuActions.clearMenuMeals();
    this.props.menuActions.getMenuMeals(this.state.accordion.url, limit, offset);
  }

  render() {
    return (
      <div className="meal-container">
        <ToastContainer autoClose={8000} />
        <Modal open={this.state.open} onClose={this.cartModal} center>
          <MenuModal addToCart={this.addToCart} state={this.state} onChange={this.onChange} />
        </Modal>
        <MealGuide />
        <h2 className="top-bot-margin" id="menu-header">TODAY MENU FROM All CATERERS</h2>
        <h3 className="success text-center">{this.state.successMessage}</h3>
        {this.props.menu.rows.length < 1 ?
          <h3 className="danger text-center">{this.props.errorMessage.getMenuError}</h3> :
          <span /> }
        <TodayMenu
          menu={this.props.menu}
          cartModal={this.cartModal}
          state={this.state}
          showMenu={this.showMenu}
          menuMeals={this.props.menuMeals}
          handleMealPageChange={this.handleMealPageChange}
        />
        {this.props.menu.rows.length < 1 ?
          <Video /> :
          <div className="meal-pagination" id="menuPagination">
            <Pagination
              activePage={this.state.menuActivePage}
              itemsCountPerPage={limit}
              totalItemsCount={Math.ceil(this.props.menu.count)}
              pageRangeDisplayed={6}
              onChange={this.handleMenuPageChange}
            />
          </div>
           }

      </div>
    );
  }
}
// propType validation
Menu.propTypes = {
  errorMessage: PropTypes.object.isRequired,
  menu: PropTypes.object.isRequired,
  menuActions: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  menuMeals: PropTypes.object.isRequired,
  cart: PropTypes.object.isRequired
};

export function mapStateToProps(state) {
  return {
    errorMessage: state.errorMessage,
    successMessage: state.successMessage,
    menu: state.menu,
    menuMeals: state.menuMeals,
    cart: state.cart
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
