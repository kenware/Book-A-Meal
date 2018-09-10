import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-responsive-modal';
import Pagination from 'react-js-pagination';
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
      open: false,
      activePage: 1
    };
    this.cancelDelete = this.cancelDelete.bind(this);
    this.deleteMeal = this.deleteMeal.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.onOpenModal = this.onOpenModal.bind(this);
  }

  componentDidMount() {
    this.props.mealActions.getAllMeals(limit, 0);
  }

  /**
   * @param  {} mealId
   * @param  {} mealName
   * @param  {} mealImage
   * displays modal that give options to delete a meal or cancel delete
   */
  onOpenModal(mealId, mealName, mealImage) {
    this.setState({
      mealId, mealName, mealImage, open: true
    });
  }
  /**
   * closes modal without deleting a meal
   */
  cancelDelete() {
    this.setState({
      mealId: '', mealName: '', mealImage: '', open: false
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
        mealId: '', mealName: '', mealImage: '', open: false
      });
    }
  }

  handlePageChange(pageNumber) {
    const offset = (pageNumber - 1) * limit;
    this.setState({ activePage: pageNumber });
    this.props.mealActions.getAllMeals(limit, offset);
  }

  render() {
    return (
      <div id="allmeal">
        <Modal open={this.state.open} onClose={this.cancelDelete} center>
          <br />
          <div className="modal-header">
            <p className="justify l-r-pad-text"> You are about to delete {this.state.mealName}</p>
          </div>
          <div className="modal-contents" style={{ justifyContent: 'center' }}>
            <img src={this.state.mealImage} className="rounded-circle img-height" alt="meal" />
          </div>
          <div className="modal-footer">
            <button className="remove-modal delete-meal" onClick={this.deleteMeal}>Delete</button>
          </div>
        </Modal>
        <h2>All Meal Options{this.props.successMessage.createMealSuccess }</h2>
        <h4 className="p-color text-center">Edit, delete or View all meal options</h4>
        <h2 className="danger">{this.props.successMessage.deleteMessage }</h2>
        {this.props.meals.rows.map(meal =>
        (
          <div className="contents container allMeal" key={meal.id}>
            <div className="content-wrap">
              <div className="col-meal l-r-pad-text">
                <img src={meal.image} className="rounded-circle img-height" alt="meals" />
              </div>
              <div className="col-meal">
                <h4 className="p-color"> Title</h4>
                <Link to={`/admin/edit/${meal.id}`} id="edit">{meal.name}</Link>
              </div>
              <div className="col-meal">
                <h4 className="p-color">Price</h4>{meal.price}
              </div>
              <div className="col-meal">
                <br />
                <Link to={`/admin/edit/${meal.id}`}><em className="fa fa-edit p-color" />&nbsp;Edit</Link><br /> <br />
                <span onClick={() => this.onOpenModal(meal.id, meal.name, meal.image)} className="p-color delete" id={meal.name} role="button"><em className="fa fa-trash p-color" />&nbsp;Delete</span>
              </div>
            </div>
          </div>
        ))}
        <div className="meal-pagination margin-bottom">
          {this.props.meals.rows.length > 0 ?
            <Pagination
              activePage={this.state.activePage}
              itemsCountPerPage={limit}
              totalItemsCount={Math.ceil(this.props.meals.count)}
              pageRangeDisplayed={4}
              onChange={this.handlePageChange}
            />
          :
            <span> Meal List Empty</span>}
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

export const mapStateToProps = state => ({
  meals: state.meals,
  successMessage: state.successMessage
});

export const mapDispatchToProps = dispatch => ({
  mealActions: bindActionCreators(mealActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AllMeal);
