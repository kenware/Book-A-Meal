import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import './index.scss';

import * as mealActions from '../../redux/Action/mealAction';
import './index.scss';

const limit = 6;
export class AllMeal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mealId: 0,
      mealName: '',
      mealImage: '',
      modal: 'modal',
      currentPage: ''
    };
    // this.handlePageChange = this.handlePageChange.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.cancelDelete = this.cancelDelete.bind(this);
    this.deleteMeal = this.deleteMeal.bind(this);
  }
  /**
   * closes modal without deleting a meal
   */
  cancelDelete() {
    this.setState({
      mealId: '', mealName: '', mealImage: '', modal: 'modal'
    });
  }
  /**
   * calls a redux action
   * deletes a meal
   */
  deleteMeal() {
    if (this.state.mealId) {
      this.props.mealActions.deleteMeal(this.state.mealId);
      this.setState({
        mealId: '', mealName: '', mealImage: '', modal: 'modal'
      });
    }
  }
  handlePageClick(data) {
    const selected = data.selected;
    const offset = Math.ceil(selected);

    this.setState({ currentPage: selected });
  }

  render() {
    /**
     * @param  {} mealId
     * @param  {} mealName
     * @param  {} mealImage
     * displays modal that give options to delete a meal or cancel delete
     */
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
            <img src={this.state.mealImage} className="rounded-circle img-height" alt="meal" />
          </div>
          <div className="modal-order-content">
            <p className="justify l-r-pad-text"> You are about to delete {this.state.mealName}</p>
          </div>
          <div className="modal-order-content">
            <button className="remove-modal delete-meal" onClick={this.deleteMeal}>Delete</button><button onClick={this.cancelDelete}className="remove-modal cancel-delete">Cancel</button>
          </div>
        </div>
        <h2>All Meal Options{this.props.successMessage.createMealSuccess }</h2>
        <h4 className="p-color text-center">Edit, delete or View all meal options</h4>
        <h4 className="danger text-center">{this.props.successMessage.message}</h4>
        {this.props.meals.map(meal =>
        (
          <div className="contents container" key={meal.id}>
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
                <span onClick={() => confirmMeal(meal.id, meal.name, meal.image)} className="p-color" id={meal.name} role="button"><em className="fa fa-trash p-color" />&nbsp;Delete</span>
              </div>
            </div>
          </div>
        ))}
        <ReactPaginate clickCallback={this.handlePageClick}
                                   previousLabel={<span class="prev">Previous</span>}
                                   nextLabel={<span class="prev">Next</span>}
                                   breakLabel={<span class="ellipsis">...</span>}
                                   pageNum={this.state.pageNum}
                                   marginPagesDisplayed={2}
                                   pageRangeDisplayed={5} />
      </div>
    );
  }
}
AllMeal.propTypes = {
  meals: PropTypes.array.isRequired,
  successMessage: PropTypes.object.isRequired,
  mealActions: PropTypes.object.isRequired
};
export function mapStateToProps(state) {
  return {
    meals: state.meals,
    successMessage: state.successMessage
  };
}
export function mapDispatchToProps(dispatch) {
  return { mealActions: bindActionCreators(mealActions, dispatch) };
}
export default connect(mapStateToProps, mapDispatchToProps)(AllMeal);
