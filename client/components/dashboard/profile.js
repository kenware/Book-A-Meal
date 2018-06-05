import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dropzone from 'react-dropzone';
import FormData from 'form-data';

import * as mealActions from '../../redux/Action/mealAction';
import * as actions from '../../redux/Action/action';
import './index.scss';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      file: [],
      image: '',
      updateProfile: 'Update'
    };
    this.onChange = this.onChange.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
  }
  componentDidMount() {
    this.props.actions.getUser()
  }

  componentWillUnmount() {
    //this.props.actions.clearMessages();
  }
  onChange(e) {
    const { state } = this;
    state[e.target.name] = e.target.value;
    this.setState(state);
  }
  onDrop(file) {
    this.setState({ file, image: '' });
  }
  updateProfile(e) {
    e.preventDefault();
    const {
      name, file
    } = this.state;
    if (!name) { this.setState({ validName: 'Name is required' }); return; }
    const payload = new FormData();
    payload.append('name', name);
    file.forEach((photo) => {
      payload.append('file', photo);
    });
    this.setState({
      updateProfile: (<div><i className="fa fa-spinner fa-spin fa-2x fa-fw" aria-hidden="true" /></div>)
    });
    this.props.actions.clearMessages();
    this.props.mealActions.createMeal(payload);

  }
  render() {
    return (
      <div className="order-container">
        <h2 style={{ marginTop: '2rem' }}>Update your Profile </h2>
        <h4 className="p-color text-center">Fill The Field Below To Update a profile</h4><br />
            <h3 className="text-center danger">{this.props.errorMessage.email }</h3>
            <h3 className="text-center danger">{this.state.message }</h3>
        <div className="profile-container" style={{ marginTop: '2px' }}>
           
            <form>
              <div className="profile-field">
                <label htmlFor="name">Name     <br />
                  <font color="red">{this.state.validName} </font>
                </label>
                <input onChange={this.onChange} type="text" id="name" name="name" value={this.state.name} required />
              </div>
              <div className="profile-field">
                <label htmlFor="price">Username<br />
                </label>
                <input type="text" value={this.props.user.username} required />
              </div>
              <div className="profile-field">
                <label htmlFor="name">Email<br />
                </label>
                <input type="email" id="email" name="email" value={this.props.user.email} required />
              </div>
              <div className="profile-field">
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
                  {this.state.file.map(fil => <img src={fil.preview} className="img-fluid" style={{ width: '200px', height: '200px' }} alt="upload" />)}
                  <img src={this.state.image} className="img-fluid" style={{ width: '200px', height: '200px' }} alt="upload" />
                </span>
              </div>
              <div className="form-field">
                <button type="submit" className="button lg" onClick={this.updateProfile}>{this.state.updateProfile}</button>
              </div>
              <div className="form-field">
                <span className="text-center form-label p-color">{this.props.successMessage.updateProfileSuccess }</span>
              </div>
            </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    errorMessage: state.errorMessage,
    successMessage: state.successMessage,
    user: state.user
  };
}
function mapDispatchToProps(dispatch) {
  return {
    mealActions: bindActionCreators(mealActions, dispatch),
    actions: bindActionCreators(actions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
