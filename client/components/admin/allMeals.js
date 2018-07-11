import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import './index.scss';
import * as mealActions from '../../redux/Action/mealAction';

const limit = 6;
export class AllMeal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mealId: 0,
      mealName: '',
      mealImage: '',
      modal: 'modal',
      pageNum: 1
    };
    this.handlePageNext = this.handlePageNext.bind(this);
    this.handlePagePrev = this.handlePagePrev.bind(this);
    this.cancelDelete = this.cancelDelete.bind(this);
    this.deleteMeal = this.deleteMeal.bind(this);
  }
  componentDidMount() {
    this.props.mealActions.getAllMeals(limit, 0);
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
        {this.props.meals.rows.map(meal =>
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
        <div className="pagination">
          <div className="prev p-color">{this.state.firstPage} &nbsp; <button onClick={this.handlePagePrev}> <em className="fa fa-angle-left" /> PREV </button></div>
          <div className="current p-color"><button>{this.state.pageNum} </button></div>
          <div className="next p-color"><button onClick={this.handlePageNext}>NEXT <em className="fa fa-angle-right" /></button> &nbsp;{this.state.lastPage} </div>
        </div>
      </div>
    );
  }
}
AllMeal.propTypes = {
  meals: PropTypes.object.isRequired,
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
