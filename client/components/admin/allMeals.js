import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../redux/Action/action';
import './index.scss';

class AllMeal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mealId: 0,
      mealName: '',
      mealImage: '',
      modal: 'modal'
    };
    this.onChange = this.onChange.bind(this);
    this.cancelDelete = this.cancelDelete.bind(this);
    this.deleteMeal = this.deleteMeal.bind(this);
  }
  onChange(e) {
    const { state } = this;
    state[e.target.name] = e.target.value;
    this.setState(state);
  }
  cancelDelete() {
    this.setState({
      mealId: '', mealName: '', mealImage: '', modal: 'modal'
    });
  }
  deleteMeal() {
    if (this.state.mealId) {
      this.props.actions.deleteMeal(this.state.mealId);
      this.setState({
        mealId: '', mealName: '', mealImage: '', modal: 'modal'
      });
    }
  }
  render() {
    const confirmMeal = (mealId, mealName, mealImage) => {
      this.setState({
        mealId, mealName, mealImage, modal: ''
      });
    };
    return (
      <div>
        <div className={`modal-order ${this.state.modal}`}>
          <button
            style={{ float: 'right', backgroundColor: 'red', display: 'block' }}
            className="remove-modal"
            onClick={this.cancelDelete}
          >
            &times;
          </button>
          <div className="modal-order-content">
            <img src={this.state.mealImage} className="rounded-circle img-height" />
          </div>
          <div className="modal-order-content">
            <p className="justify l-r-pad-text"> You are about to delete {this.state.mealName}</p>
          </div>
          <div className="modal-order-content">
            <button className="remove-modal" onClick={this.deleteMeal}>Delete</button><button onClick={this.cancelDelete}className="remove-modal">Cancel</button>
          </div>
        </div>
        <h2>All Meal Options{this.props.successMessage.createMealSuccess }</h2>
        <h4 className="p-color text-center">Edit, delete or View all meal options</h4>
        <h4 className="danger text-center">{this.props.successMessage.message}</h4>
        {this.props.meals.map(meal =>
        (<div className="contents">
          <div className="content-wrap">
            <div className="col-meal l-r-pad-text">
              <img src={meal.image} className="rounded-circle img-height" alt="meals" />
            </div>
            <div className="col-meal">
              <h4 className="p-color"> Title</h4>
              <Link to={`/admin/edit/${meal.id}`}>{meal.name}</Link>
            </div>
            <div className="col-meal">
              <h4 className="p-color">Price</h4>{meal.price}
            </div>
            <div className="col-meal">
              <br />
              <Link to={`/admin/edit/${meal.id}`}><em className="fa fa-edit p-color" />&nbsp;Edit</Link><br /> <br />
              <span onClick={() => confirmMeal(meal.id, meal.name, meal.image)} className="p-color"><em className="fa fa-trash p-color" />&nbsp;Delete</span>
            </div>
          </div>
        </div>)
      )}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    meals: state.meals,
    successMessage: state.successMessage
  };
}
function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) };
}
export default connect(mapStateToProps, mapDispatchToProps)(AllMeal);
