import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area } from 'Recharts';
import Dropzone from 'react-dropzone';
import FormData from 'form-data';

import * as mealActions from '../../redux/Action/mealAction';
import './index.scss';

class Add extends Component {
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
  }
  componentWillReceiveProps(newProps) {
    if (newProps.errorMessage) {
      this.setState({ addMeal: 'Add Meal' });
    }
  }
  onChange(e) {
    const { state } = this;
    state[e.target.name] = e.target.value;
    this.setState(state);
  }
  onDrop(file) {
    this.setState({ file, image: '' });
  }
  addMeal(e) {
    e.preventDefault();
    const {
      name, price, description, file
    } = this.state;
    if (!name) { this.setState({ validName: 'Name is required' }); return; }
    if (!price) { this.setState({ validPrice: 'Price is required' }); return; }
    if (!description) { this.setState({ validDescription: 'Description is required' }); return }
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
                <textarea cols="7" rows="9" onChange={this.onChange} className="form-label" name="description" placeholder="Description of the meal" required />

              </div>
              <div className="form-field">
                <label htmlFor="password">
                  Image
                </label>
                <span className="form-label">
                  <Dropzone
                    onDrop={this.onDrop.bind(this)}
                    accept="image/jpeg,image/jpg,image/tiff,image/gif,image/png,image/svg"
                    ref="dropzone"
                    multiple={false}
                  >
                    Drag and drop or click to select an image to upload.
                  </Dropzone>
                  {this.state.file.map(fil=><img src={fil.preview} className="img-fluid" style={{width: '200px', height: '200px'}} alt="upload"/>)}
                </span>
              </div>
              <div className="form-field">
                <button type="submit" className="button lg" onClick={this.addMeal}>{this.state.addMeal}</button>
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

function mapStateToProps(state, ownProps) {
  return {
    errorMessage: state.errorMessage,
    successMessage: state.successMessage
  };
}
function mapDispatchToProps(dispatch) {
  return { mealActions: bindActionCreators(mealActions, dispatch) };
}
export default connect(mapStateToProps, mapDispatchToProps)(Add);
