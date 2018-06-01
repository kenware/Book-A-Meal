import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactCardFlip from 'react-card-flip';

import Header from '../header/index';
import Footer from '../footer/index';
import './index.scss';
import * as actions from '../../redux/Action/action';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFlipped: false
    };
    this.onChange = this.onChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  componentWillMount() {
    this.props.actions.loadMostOrderedMeal();
  }

  onChange(e) {
    const newLocal = this;
    const { state } = newLocal.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  }
  handleClick(e) {
    e.preventDefault();
    this.setState({ isFlipped: !this.state.isFlipped });
  }

  render() {
    const handleClick = (e) => {
      const state = this.state;
      state[e] = true;
      this.setState({ state });
    };
    const handleClose = (e) => {
      const state = this.state;
      state[e] = false;
      this.setState({ state });
    };
    const home = 'home';
    return (
      <div>
        <Header home={home} />
        <div className="carousel-header">
          <div className="header-overlay" />
          <div className="caption">
            <h3 className="lead">Book A Meal Today</h3>
            <p className="lead">Health is wealth!</p>
          </div>
        </div>
        <div className="site-container" style={{ marginLeft: '3%', marginRight: '3%' }}>
          <h2>BOOK A MEAL IN THREE EASY STEPS</h2>
          <div className="all-meal-step">
            <div className="meal-day">
              <div >
                <div className="circle" /><br />
                <span>SignUp/SignIn</span>
              </div>
            </div>
            <div className="meal-day">
              <span className="fa fa-long-arrow-right fa-4x" />
            </div>
            <div className="meal-day">
              <div >
                <div className="circle" /><br />
                <span>Order A Meal</span>
              </div>
            </div>
            <div className="meal-day">
              <span className="fa fa-long-arrow-right fa-4x" />
            </div>
            <div className="meal-day">
              <div>
                <div><img src="image/l.png" id="App-logo" className="rounded-circle" style={{ height: '100px', width: '100px' }} alt="meal" /></div>
                <br /><span>Hot Fresh Meal</span>
              </div>
            </div>
          </div>
          <h2>Recommended meals</h2>
          <div className="meal-menu-row">
            { this.props.mostOrder.map(meal =>
              (<div className="meal-menu">
                <div className="meal-menu-card">
                  <div className="meal-img-wrap">
                    <div className="meal-overlay" />
                    <img src={meal.Meal.image} alt="Avatar" className="meal-card-img" />
                  </div>
                  <div className="container l-r-pad-text">
                    <h4 className="p-color"><b>${meal.Meal.price}</b></h4>
                    <p>{meal.Meal.name}</p>
                    <Link to={`/detail/${meal.Meal.id}`}>View</Link>
                  </div>
                </div>
               </div>))}
          </div>
        </div>
        <div className="parallex">
          <div className="parallex-menu">
            <div className="parallex-img">
              <span className="fa fa-dashboard fa-4x white-color" style={{ marginLeft: '40%' }} />
            </div>
            <div className="parallex-card">
              <div className="container"><br />
                <h2 className="white-color">Dashboard</h2>
                <p className="white-color">Enter your dashboard to perform awesome
                            functionality which include ordering for a meal, adding meal options
                            from meal menu
                </p>
              </div>
              <div className="parallex-footer">
                <button>
                  <Link to="/dashbord"> more</Link>
                </button>
              </div>
            </div>
          </div>
          <div className="parallex-menu">
            <div className="parallex-img">
              <span className="fa fa-rocket fa-4x white-color" style={{ marginLeft: '40%' }} />
            </div>
            <div className="parallex-card">
              <div className="container"><br />
                <h2 className="white-color">Login/SignUp</h2>
                <p className="p-style">Login to order menu of your choice with just a single click</p>
              </div>
              <div className="parallex-footer">
                <button>
                  <Link to="/login"> more</Link>
                </button>
              </div>
            </div>
          </div>
          <div className="parallex-menu">
            <div className="parallex-img">
              <span className="fa fa-user fa-4x white-color" style={{ marginLeft: '40%' }} />
            </div>
            <div className="parallex-card">
              <div className="container"><br />
                <h2 className="white-color">SignUp</h2>
                <p className="p-style">SignUp to get started. Login to order menu of your choice with just a
                                single click
                </p>
              </div>
              <div className="parallex-footer">
                <button>
                  <Link to="/register"> more</Link>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="site-container" style={{ marginLeft: '3%', marginRight: '3%', marginBottom: '2rem' }}>
          <div className="meal-menu-row">
            { this.props.mealFlip.map(meal =>
            (<div className="meal-menu">
              <div className="meal-menu-flip">
                <ReactCardFlip isFlipped={this.state[meal.Meal.id]}>
                  <div
                    key="front"
                    onMouseEnter={() => handleClick(meal.Meal.id)}
                  >
                    <img src={meal.Meal.image} alt="Avatar" className="meal-card-img" />
                  </div>
                  <div
                    key="back"
                    onMouseLeave={() => handleClose(meal.Meal.id)}
                  >
                    <h2>{meal.Meal.name}</h2>
                    <h2>Price: {meal.Meal.price}</h2>
                    <p className="justify l-r-pad-text">{`${meal.Meal.description.substr(0, 100).trim()  }...`}</p>
                  </div>
                </ReactCardFlip>
              </div>
            </div>))}
          </div>
        </div>
        <div className="user-testimonial"><br /><br />
          <h2>WHAT OUR FANTASTIC USERS SAY</h2>
          <h4 className="p-color text-center">Best site to get latest recipe with just a click<br /><br /></h4>
          <div className="testimonial-wrap">
            <div>
              <div className="user-testimonial-menu">
                <div className="testimonial-photo">
                  <img src="image/eze.jpg" className="rounded-circle" style={{ width: '100px', height: '100px' }} alt="profile" />
                </div>
                <p className="justify text-pad">
             Book-A-Meal is just amazing!. For the first time i can book for any meal
             by a single click any where around the world, without having to go to any  resturant
            .This is really awesome.
                </p>
                <div className="container">
                  <h2 className="white-color">Kevin</h2>
                  <p className="text-center white-color">Developer</p>
                </div>
              </div>
            </div>
            <div>
              <div className="user-testimonial-menu">
                <div className="testimonial-photo">
                  <img src="image/face1.jpg" className="rounded-circle" style={{ width: '100px', height: '100px' }} alt="profile" />
                </div>
                <p className="justify l-r-pad-text">
              Book-A-Meal is  awesome!.This have preventd the stress of having to
              go down the street from one resturant to another, i have my favorite
              delivered to my door step b a single click.This is really awsome.
                </p>
                <div className="container">
                  <h2 className="white-color">Jessica Jones</h2>
                  <p className="white-color text-center">Actor</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>

    );
  }
}

function mapStateToProps(state, ownProps) {
  const mealFlip = state.mostOrder.reverse().slice(0, 3);
  return {
    mostOrder: state.mostOrder,
    mealFlip
  };
}
function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) };
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
