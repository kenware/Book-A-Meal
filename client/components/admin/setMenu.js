import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Pagination from 'react-js-pagination';
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
      pageNum: 1
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
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  /** Add meal to menu
   * calls redux action
   */

  addMenu() {
    const { meals, title, orderBefore } = this.state;
    if (!title) {
      this.setState({ errorTitle: 'Title is required', errorOrderBefore: '' });
      return;
    }
    if (!orderBefore) {
      this.setState({ errorOrderBefore: 'Order Expiring time is required', errorTitle: '' });
      return;
    }
    if (meals.length > 0) {
      this.props.menuActions.setMenu(meals, title, orderBefore);
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

  confirmAdd(mealId) {
    const { state } = this;
    if (state.meals.indexOf(mealId) === -1) {
      state[mealId] = mealId;
      state.meals.push(mealId);
      this.setState(state);
    } else {
      const index = state.meals.indexOf(mealId);
      state.meals.splice(index, 1);
      state[mealId] = '';
      this.setState(state);
    }
  }

  render() {
    return (
      <div className="">
        <h2 style={{ marginTop: '2rem' }}>SET MENU FOR THE DAY</h2>
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
          <input onChange={this.onChange} type="text" id="title" name="title" placeholder="Keny" required />

        </div>
        <div className="form-field" id="setMenu-forrm">
          <label htmlFor="password">
            Expire Time <br />
            <span className="text-center danger">{this.state.errorOrderBefore }</span>
          </label>
          <input onChange={this.onChange} type="number" id="expire" name="orderBefore" required />
        </div>
        <h4 className="p-color text-center">Select meals to set todays menu</h4>
        <table className="table" style={{ margin: '10px 10% 10px 7%', width: '90%' }}>
          <tbody>
            <tr className="tr tr-color tr-height">
              <th>Name</th>
              <th>Price ($)</th>
              <th>Select</th>
            </tr>
            {this.props.meals.rows.map(meal =>
              (
                <tr className="tr tr tr-height" key={meal.id}>
                  <td>{meal.name}</td>
                  <td>{meal.price}</td>
                  <td>
                    {this.state[meal.id] ? <input className="checkbox" type="checkbox" onClick={() => this.confirmAdd(meal.id, meal.name)} id={`${meal.name}`} checked />
                    : <input className="checkbox" type="checkbox" onChange={() => this.confirmAdd(meal.id, meal.name)} id={`${meal.name}`} /> }
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className=""> <button onClick={this.addMenu} className="setMenuBtn"> {this.state.add} </button> </div><br /><br />
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
  };
}

export const mapDispatchToProps = dispatch => ({
  menuActions: bindActionCreators(menuActions, dispatch),
  actions: bindActionCreators(actions, dispatch),
  mealActions: bindActionCreators(mealActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SetMenu);
