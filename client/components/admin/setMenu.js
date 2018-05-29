import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as menuActions from '../../redux/Action/menuAction';
import './index.scss';

class SetMenu extends Component {
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
      Add: 'Add'
    };
    this.onChange = this.onChange.bind(this);
    this.addMenu = this.addMenu.bind(this);
    this.cancelAdd = this.cancelAdd.bind(this);
  }
  componentWillReceiveProps(newProps) {
    if (newProps.errorMessage || newProps.successMessage) {
      this.setState({ Add: 'Add', modal: 'modal', });
    }
  }

  onChange(e) {
    const { state } = this;
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  cancelAdd() {
    this.setState({ mealId: 0, mealName: '', modal: 'modal' });
  }

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

  render() {
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
            <button className="remove-modal" onClick={this.addMenu}>{this.state.Add}</button><button onClick={this.cancelAdd}className="remove-modal">Cancel</button>
          </div>
        </div>
        <h2 style={{ marginTop: '2rem' }}>SET MENU FOR THE DAY</h2>
        <h4 className="p-color text-center">Enter Menu Title and the Expire Time(24 Hours Format) in Hours</h4>
        <h5 className="p-color text-center">eg Expire time of 17 => 5pm</h5>
        <h4 className="danger text-center">{this.props.errorMessage.setMenuError}</h4>
        <h4 className="y-color text-center">{this.props.successMessage.setMenuSuccess}</h4>
        <div className="form-field">
          <label htmlFor="name">
            Title <br />
            <span className="text-center danger">{this.state.errorTitle }</span>
          </label>
          <input onChange={this.onChange} type="text" id="username" name="title" placeholder="Keny" required />

        </div>
        <div className="form-field">
          <label htmlFor="password">
            Expire Time <br />
            <span className="text-center danger">{this.state.errorOrderBefore }</span>
          </label>
          <input onChange={this.onChange} type="number" name="orderBefore" required />
        </div>
        <h4 className="p-color text-center">Set menu from the meal options</h4>
        <table>
          <tbody>
            <tr>
              <th>id</th>
              <th>Name</th>
              <th>Price ($)</th>
              <th>Add to Menu</th>
            </tr>
            {this.props.meals.map(meal =>
              (
                <tr>
                  <td>{meal.id}</td>
                  <td>{meal.name}</td>
                  <td>{meal.price}</td>
                  <td>
                    <button onClick={() => confirmAdd(meal.id, meal.name)}>
                      <i className="fa fa-list-alt y-color" aria-hidden="true" />&nbsp;Add
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    errorMessage: state.errorMessage,
    successMessage: state.successMessage,
    meals: state.meals,
  };
}
function mapDispatchToProps(dispatch) {
  return { menuActions: bindActionCreators(menuActions, dispatch) };
}
export default connect(mapStateToProps, mapDispatchToProps)(SetMenu);
