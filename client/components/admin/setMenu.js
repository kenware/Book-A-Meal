import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import Pagination from 'react-js-pagination';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as menuActions from '../../redux/Action/menuAction';
import * as actions from '../../redux/Action/action';
import * as mealActions from '../../redux/Action/mealAction';
import './index.scss';

const limit = 6;
export class SetMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meals: [],
      title: '',
      orderBefore: '',
      erorTitle: '',
      errorOrderBefore: '',
      setMenuSuccess: '',
      add: 'Set Menu',
      pageNum: 1,
      emailSwitch: false
    };
    this.onChange = this.onChange.bind(this);
    this.addMenu = this.addMenu.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.confirmAdd = this.confirmAdd.bind(this);
  }
  /**
   * lifecycle hook called when component receives props
   *
   * return new state after it is changed
   */
  componentDidMount() {
    this.props.mealActions.getAllMeals('6', '0');
  }

  static getDerivedStateFromProps(props) {
    if (props.errorMessage.setMenuError || props.successMessage.setMenuSuccess) {
      const successMessage = props.successMessage.setMenuSuccess;
      const errorMessage = props.errorMessage.setMenuError;
      swal({
        title: 'Success!',
        text: 'Menu Created!',
        icon: 'success',
        button: false,
        timer: 3000
      });
      props.actions.clearMessages();
      return {
        add: 'Set Menu',
        setMenuSuccess: successMessage,
        errorMessage
      };
    }
    return null;
  }

  /**
   * @param  {} e set state on input onchange event
  */
  onChange(e) {
    const { state } = this;
    if (e.target.name === 'emailSwitch') {
      return this.setState({ emailSwitch: !this.state.emailSwitch });
    }
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  /** Add meal to menu
   * calls redux action
   */
  addMenu() {
    const {
      meals, title, orderBefore, emailSwitch
    } = this.state;
    if (!title) {
      this.setState({ errorTitle: 'Title is required', errorOrderBefore: '' });
      return;
    }
    if (!orderBefore) {
      this.setState({ errorOrderBefore: 'Order Expiring time is required', errorTitle: '' });
      return;
    }
    if (meals.length > 0) {
      this.props.menuActions.setMenu(meals, title, orderBefore, emailSwitch);
      return this.setState({
        mealId: '',
        mealName: '',
        add: (<div><i className="fa fa-spinner fa-spin fa-2x fa-fw" aria-hidden="true" /></div>)
      });
    }
    this.setState({ mealError: 'Please select meals to set a menu' });
  }

  handlePageChange(pageNumber) {
    const offset = (pageNumber - 1) * limit;
    this.setState({ activePage: pageNumber });
    this.props.mealActions.getAllMeals(limit, offset);
  }

  confirmAdd(meal) {
    if (this.state.meals.indexOf(meal) === -1) {
      this.state.meals.push(meal);
    } else {
      const index = this.state.meals.indexOf(meal);
      this.state.meals.splice(index, 1);
    }
  }

  render() {
    return (
      <div className="my-menu">
        <ToastContainer autoClose={8000} />
        <h2 id="menu-header" style={{ marginTop: '2rem' }}>SET MENU FOR THE DAY</h2>
        <h4 className="p-color text-center">Enter Menu Title and the Expire Time(24 Hours Format) in Hours</h4>
        <h5 className="p-color text-center">Eg Expire time of 17 <em className="fa fa-long-arrow-right" /> 5pm</h5>
        <h4 className="danger text-center">{this.state.errorMessage}</h4>
        <h4 className="danger text-center">{this.state.mealError}</h4>
        <h4 className="y-color text-center">{this.state.setMenuSuccess}</h4>
        <div className="form-field" id="setMenu-forrm">
          <label htmlFor="name">
            Title <br />
            <span className="text-center danger">{this.state.errorTitle }</span>
          </label>
          <input onChange={this.onChange} type="text" id="title" className="menu-form" name="title" placeholder="Title" required />

        </div>
        <div className="form-field" id="setMenu-forrm">
          <label htmlFor="password">
            Expire Time <br />
            <span className="text-center danger">{this.state.errorOrderBefore }</span>
          </label>
          <input onChange={this.onChange} type="number" id="expire" className="menu-form" name="orderBefore" placeholder="24" required />
        </div>
        <div className="email-field">
          <div className="notific-div">
            Email Notification
          </div>
          <div className="switch-div">
            <label className="switch">
              <input onChange={this.onChange} type="checkbox" name="emailSwitch" value="true" />
              <span className="slider round" />
            </label>
          </div>
        </div>
        <h4 className="p-color text-center">Select meals to set todays menu</h4>
        <table className="table" style={{ margin: '10px 10% 10px 7%', width: '82%' }}>
          <tbody>
            <tr className="tr tr-color tr-height">
              <th>Name</th>
              <th>Price ($)</th>
              <th>Select</th>
            </tr>
            {this.props.meals.rows.map(meal =>
              (
                <tr className="tr meal-menu" key={meal.id} style={{ height: '4rem' }}>
                  <td>{meal.name}</td>
                  <td>{meal.price}</td>
                  <td>
                    <label>
                      {this.state.meals.indexOf(meal.id) !== -1 ? <input className="checkbox" type="checkbox" onClick={() => this.confirmAdd(meal.id)} id={`${meal.name}`} defaultChecked />
                      : <input className="checkbox" type="checkbox" onClick={() => this.confirmAdd(meal.id)} id={`${meal.name}`} /> }
                    </label>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {this.props.meals.rows.length > 0 ?
          <div>
            <div className=""> <button onClick={this.addMenu} className="setMenuBtn" style={{ marginRight: '11%' }}> {this.state.add} </button> </div><br /><br />
            <div style={{ textAlign: 'center' }}>
              <Pagination
                activePage={this.state.activePage}
                itemsCountPerPage={limit}
                totalItemsCount={Math.ceil(this.props.meals.count)}
                pageRangeDisplayed={4}
                onChange={this.handlePageChange}
              />

            </div>
          </div>
        : <p className="text-center p-color"> Empty Meal List </p>}
      </div>
    );
  }
}

SetMenu.propTypes = {
  meals: PropTypes.object.isRequired,
  menuActions: PropTypes.object.isRequired,
  mealActions: PropTypes.object.isRequired,
};

export function mapStateToProps(state) {
  return {
    errorMessage: state.errorMessage,
    successMessage: state.successMessage,
    meals: state.meals,
    mealList: state.cart
  };
}

export const mapDispatchToProps = dispatch => ({
  menuActions: bindActionCreators(menuActions, dispatch),
  actions: bindActionCreators(actions, dispatch),
  mealActions: bindActionCreators(mealActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SetMenu);
