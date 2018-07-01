import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dropzone from 'react-dropzone';
import FormData from 'form-data';
import PropTypes from 'prop-types';
import * as mealActions from '../../redux/Action/mealAction';
import * as actions from '../../redux/Action/action';
import './index.scss';

export class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      price: '',
      description: '',
      file: [],
      addMeal: 'Add Meal',
      validDescription: '',
      validPrice: '',
      validName: '',
      image: ''
    };
    this.onChange = this.onChange.bind(this);
    this.addMeal = this.addMeal.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }
  /**
   * lifecycle hook called when component receives props
   *
   * return new state after it is changed
   */
  static getDerivedStateFromProps(props) {
    if (props.errorMessage.createMealError || props.successMessage.createMealSuccess) {
      return { addMeal: 'Add Meal' };
    }
    return null;
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
    this.props.actions.clearMessages();
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
    this.setState({
      addMeal: (<div><i className="fa fa-spinner fa-spin fa-2x fa-fw" aria-hidden="true" /></div>)
    });
    this.props.mealActions.createMeal(payload);
  }
  render() {
    return (
      <div>
        <h2 style={{ marginTop: '2rem' }}>ADD A MEAL </h2>
        <div className="register-container" style={{ marginTop: '2px' }}>
          <div className="register-col" />
          <div className="register-wrapper" style={{ marginTop: '2px' }}>
            <h4 className="p-color text-center">Fill The Field Below To Add A Meal</h4><br />
            <h3 className="text-center danger">{this.props.errorMessage.createMealError }</h3>
            <h3 className="text-center danger">{this.state.message }</h3>
            <form>
              <div className="form-field">
                <label htmlFor="name">Name     <br />
                  <font color="red">{this.state.validName} </font>
                </label>
                <input onChange={this.onChange} type="text" id="name" name="name" placeholder="Jollof Rice" required />
              </div>
              <div className="form-field">
                <label htmlFor="price">Price<br />
                  <font color="red">{this.state.validPrice} </font>
                </label>
                <input onChange={this.onChange} type="number" id="price" name="price" placeholder="5000" required />
              </div>
              <div className="form-field">
                <label htmlFor="name">Description<br />
                  <font color="red">{this.state.validDescription} </font>
                </label>
                <textarea cols="7" rows="9" id="description" onChange={this.onChange} className="form-label descriptions" name="description" placeholder="Description of the meal" required />

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
                  {this.state.file.map(fil => <img key={fil.preview} src={fil.preview} className="img-fluid" style={{ width: '200px', height: '200px' }} alt="upload" />)}
                </span>
              </div>
              <div className="form-field">
                <button type="submit" className="button lg submit" name="submit" onClick={this.addMeal}>{this.state.addMeal}</button>
              </div>
              <div className="form-field">
                <span className="text-center form-label p-color">{this.props.successMessage.createMealSuccess }</span>
              </div>
            </form>

          </div>
          <div className="register-col" />
        </div>
      </div>
    );
  }
}
Add.propTypes = {
  errorMessage: PropTypes.object.isRequired,
  successMessage: PropTypes.object.isRequired,
  mealActions: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};
export function mapStateToProps(state) {
  return {
    errorMessage: state.errorMessage,
    successMessage: state.successMessage
  };
}
export function mapDispatchToProps(dispatch) {
  return {
    mealActions: bindActionCreators(mealActions, dispatch),
    actions: bindActionCreators(actions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Add);
