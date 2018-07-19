import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as menuActions from '../../redux/Action/menuAction';
import * as actions from '../../redux/Action/action';
import * as mealActions from '../../redux/Action/mealAction';
import './index.scss';

const limit = 6;
export class SetMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      orderBefore: '',
      modal: 'modal',
      mealId: 0,
      mealName: '',
      erorTitle: '',
      errorOrderBefore: '',
      setMenuSuccess: '',
      Add: 'Add',
      pageNum: 1
    };
    this.handlePageNext = this.handlePageNext.bind(this);
    this.handlePagePrev = this.handlePagePrev.bind(this);
    this.onChange = this.onChange.bind(this);
    this.addMenu = this.addMenu.bind(this);
    this.cancelAdd = this.cancelAdd.bind(this);
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
        Add: 'Add',
        modal: 'modal',
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
  // cancel modal
  cancelAdd() {
    this.setState({ mealId: 0, mealName: '', modal: 'modal' });
  }
  /** Add meal to menu
   * calls redux action
   */
  addMenu() {
    const { mealId, title, orderBefore } = this.state;
    if (mealId && title) {
      this.props.menuActions.setMenu(mealId, title, orderBefore);
      this.setState({
        mealId: '',
        mealName: '',
        Add: (<div><i className="fa fa-spinner fa-spin fa-2x fa-fw" aria-hidden="true" /></div>)
      });
    }
  }
  handlePageNext() {
    let { pageNum } = this.state;
    pageNum += 1;
    const offset = (pageNum - 1) * limit;
    const totalPage = this.props.meals.count / limit;
    if (pageNum === totalPage || pageNum > totalPage) {
      return this.setState({ lastPage: 'Last page', firstPage: '' });
    }
    this.props.mealActions.getAllMeals(limit, offset);
    this.setState({ pageNum, firstPage: '' });
  }
  handlePagePrev() {
    let { pageNum } = this.state;
    pageNum -= 1;
    if (pageNum < 1) {
      return this.setState({ firstPage: 'firstPage', lastPage: '' });
    }
    const offset = (pageNum - 1) * limit;
    this.props.mealActions.getAllMeals(limit, offset);
    this.setState({ pageNum, lastPage: '' });
  }

  render() {
    // Display modal that allow you to add meal to menu
    const confirmAdd = (mealId, mealName) => {
      if (!this.state.title) {
        this.setState({ errorTitle: 'Title is required' });
        return;
      }
      if (!this.state.orderBefore) {
        this.setState({ errorOrderBefore: 'Order Expiring time is required' });
        return;
      }
      this.setState({ mealId, mealName, modal: '' });
    };

    return (
      <div className="order-wrapper order-container">
        <div className={`modal-order ${this.state.modal}`}>
          <button
            style={{ float: 'right', backgroundColor: 'red', display: 'block' }}
            className="remove-modal"
            onClick={this.cancelAdd}
          >
            &times;
          </button>
          <div className="modal-order-content" style={{ margin: '1rem 1rem 1rem 1rem' }}>
            <p className="justify l-r-pad-text"> Add {this.state.mealName} to todays menu</p>
          </div>
          <div className="modal-order-content">
            <button className="remove-modal" id="addMenu" onClick={this.addMenu}>{this.state.Add}</button><button onClick={this.cancelAdd}className="remove-modal" id="removeMenu">Cancel</button>
          </div>
        </div>
        <h2 style={{ marginTop: '2rem' }}>SET MENU FOR THE DAY</h2>
        <h4 className="p-color text-center">Enter Menu Title and the Expire Time(24 Hours Format) in Hours</h4>
        <h5 className="p-color text-center">Eg Expire time of 17 <em className="fa fa-long-arrow-right" /> 5pm</h5>
        <h4 className="danger text-center">{this.state.errorMessage}</h4>
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
        <h4 className="p-color text-center">Set menu from the meal options</h4>
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Price ($)</th>
              <th>Add to Menu</th>
            </tr>
            {this.props.meals.rows.map(meal =>
              (
                <tr className="tr" key={meal.id}>
                  <td>{meal.name}</td>
                  <td>{meal.price}</td>
                  <td>
                    <button onClick={() => confirmAdd(meal.id, meal.name)} id={`${meal.name}`}>
                      <i className="fa fa-list-alt y-color" aria-hidden="true" />&nbsp;Add
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="pagination">
          <div className="prev p-color">{this.state.firstPage} &nbsp; <button onClick={this.handlePagePrev}> <em className="fa fa-angle-left" /> PREV </button></div>
          <div className="current p-color"><button>{this.state.pageNum} </button></div>
          <div className="next p-color"><button onClick={this.handlePageNext}>NEXT <em className="fa fa-angle-right" /></button> &nbsp;{this.state.lastPage} </div>
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
export function mapDispatchToProps(dispatch) {
  return {
    menuActions: bindActionCreators(menuActions, dispatch),
    actions: bindActionCreators(actions, dispatch),
    mealActions: bindActionCreators(mealActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(SetMenu);
