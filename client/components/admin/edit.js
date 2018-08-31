import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dropzone from 'react-dropzone';
import FormData from 'form-data';
import PropTypes from 'prop-types';

import * as mealActions from '../../redux/Action/mealAction';
import * as actions from '../../redux/Action/action';
import './index.scss';

export class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meals: [],
      name: this.props.meals.name,
      price: this.props.meals.price,
      description: this.props.meals.description,
      file: [],
      updateMeal: 'Update Meal',
      validDescription: '',
      validPrice: '',
      validName: '',
      image: this.props.meals.image
    };
    this.onChange = this.onChange.bind(this);
    this.addMeal = this.addMeal.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  /**
   * lifecycle hook called when component is mounted to DOM
   *
   * @memberof Admin index
   *
   * @returns {getAllMeal} fetches all meals
   */
  componentWillMount() {
    if (this.props.meals.name === '') {
      this.props.mealActions.getAllMeal();
    }
  }

  /**
   * lifecycle hook called when component receives props
   *
   * return new state after it is changed
   */
  static getDerivedStateFromProps(props, state) {
    if (props.meals !== state.meals) {
      return {
        meals: props.meals,
        image: props.meals.image,
        name: props.meals.name,
        price: props.meals.price,
        description: props.meals.description,
        updateMeal: 'Update Meal'
      };
    }
    return { meals: state.meals };
  }

  /**
   * remove error props in redux store if component unmount
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
   * @param  {} file sets image to state using drop box
  */
  onDrop(file) {
    this.setState({ file, image: '' });
  }

  /**
   * calls a redux function
   * adds a meal using form-data
  */
  addMeal(e) {
    e.preventDefault();
    const {
      name, price, description, file
    } = this.state;
    if (!name) { this.setState({ validName: 'Name is required' }); return; }
    if (!price) { this.setState({ validPrice: 'Price is required' }); return; }
    if (!description) { this.setState({ validDescription: 'Description is required' }); return; }
    const payload = new FormData();
    payload.append('name', name);
    payload.append('price', price);
    payload.append('description', description);
    file.forEach((photo) => {
      payload.append('file', photo);
    });
    // show loading icon on addmeal button
    this.setState({
      updateMeal: (<div><i className="fa fa-spinner fa-spin fa-2x fa-fw" aria-hidden="true" /></div>)
    });
    this.props.mealActions.updateMeal(this.props.meals.id, payload);
  }

  render() {
    const meal = this.props.meals;
    return (
      <div>
        <h2 style={{ marginTop: '2rem' }}>UPDATE A MEAL </h2>
        <div className="register-container" style={{ marginTop: '2px' }}>
          <div className="register-col" />
          <div className="register-wrapper" style={{ marginTop: '2px' }}>
            <h4 className="p-color text-center">Edit The Field Below To Update {meal.name} Meal</h4><br />
            <h3 className="text-center danger">{this.props.errorMessage.updateMealError }</h3>
            <h3 className="text-center danger">{this.state.message }</h3>
            <form>
              <div className="form-field">
                <label htmlFor="name">Name     <br />
                  <font color="red">{this.state.validName} </font>
                </label>
                <input onChange={this.onChange} type="text" value={this.state.name} name="name" id="name" required />
              </div>
              <div className="form-field">
                <label htmlFor="price">Price<br />
                  <font color="red">{this.state.validPrice} </font>
                </label>
                <input onChange={this.onChange} type="number" value={this.state.price} name="price" id="price" required />
              </div>
              <div className="form-field">
                <label htmlFor="name">Description<br />
                  <font color="red">{this.state.validDescription} </font>
                </label>
                <textarea cols="7" rows="9" onChange={this.onChange} className="form-label" name="description" value={this.state.description} id="description"required />

              </div>
              <div className="form-field">
                <label htmlFor="password">
                  Image
                </label>
                <span className="form-label">
                  <Dropzone
                    onDrop={this.onDrop}
                    accept="image/jpeg,image/jpg,image/tiff,image/gif,image/png,image/svg"
                    ref="dropzone"
                    multiple={false}
                  >
                    Drag and drop or click to select an image to upload.
                  </Dropzone>
                  {this.state.file.map(fil => <img key={fil.preview} src={fil.preview} className="img-fluid" alt="meal" />)}
                </span>
              </div>
              <div className="form-field">
                <button type="submit" className="button lg submit" onClick={this.addMeal}>{this.state.updateMeal}</button>
              </div>
              <div className="form-field">
                <span className="text-center form-label p-color">{this.props.successMessage.updateMealSuccess }</span>
              </div>
            </form>

          </div>
          <div className="register-col" />
        </div>
      </div>
    );
  }
}

export const mapStateToProps = (state, ownProps) => {
  let meals;
  if (state.meals.rows.length > 0) {
    meals = state.meals.rows.find(meal => meal.id === parseInt(ownProps.match.params.mealId));
  } else {
    meals = {
      name: '', price: 0, description: '', id: 0
    };
  }
  return {
    errorMessage: state.errorMessage,
    successMessage: state.successMessage,
    meals
  };
};

Edit.propTypes = {
  meals: PropTypes.object.isRequired,
  errorMessage: PropTypes.object.isRequired,
  successMessage: PropTypes.object.isRequired,
  mealActions: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

export const mapDispatchToProps = dispatch => ({
  mealActions: bindActionCreators(mealActions, dispatch),
  actions: bindActionCreators(actions, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(Edit);
