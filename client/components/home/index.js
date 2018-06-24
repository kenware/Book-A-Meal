import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactCardFlip from 'react-card-flip';
import PropTypes from 'prop-types';
import Header from '../header/index';
import Footer from '../footer/index';
import './index.scss';
import { loadMostOrderedMeal } from '../../redux/Action/action';
import MostOrder from './mostOrder';
import ParallaxScroll from './parallaxScroll';
import UserTestimonial from './userTestimonial';

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFlipped: false
    };
  }
  /**
   * lifecycle hook called when component is mounted to DOM
   * load most ordered meal on page load
   */
  componentDidMount() {
    this.props.loadMostOrderedMeal();
  }

  render() {
    /**
   * @param  {} flip meal method
   * this methods is called on hover over meal card
   */

    const handleClick = (e) => {
      const { state } = this;
      state[e] = true;
      this.setState({ state });
    };
    const handleClose = (e) => {
      const { state } = this;
      state[e] = false;
      this.setState({ state });
    };
    return (
      <div>
        <Header />
        <div className="carousel-header">
          <div className="header-overlay" />
          <div className="caption">
            <h3 className="lead active-text-header">Book A Meal Today</h3>
            <p className="lead active-text-header">Health is wealth!</p>
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
          <MostOrder mostOrder={this.props.mostOrder} />
        </div>
        <ParallaxScroll />
        <div className="site-container" style={{ marginLeft: '3%', marginRight: '3%', marginBottom: '2rem' }}>
          <div className="meal-menu-row">
            { this.props.mealFlip.map(meal =>
            (
              <div className="meal-menu" key={meal.id}>
                <div className="meal-menu-flip">
                  <ReactCardFlip isFlipped={this.state[meal.Meal.id]}>
                    <div
                      id="flip-card"
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
                      <p className="justify l-r-pad-text">{`${meal.Meal.description.substr(0, 100).trim()}...`}</p>
                    </div>
                  </ReactCardFlip>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="user-testimonial"><br /><br />
          <h2>WHAT OUR FANTASTIC USERS SAY</h2>
          <h4 className="p-color text-center">Best site to get latest recipe with just a click<br /><br /></h4>
          <UserTestimonial />
        </div>
        <Footer />
      </div>

    );
  }
}
Home.propTypes = {
  mostOrder: PropTypes.array.isRequired,
  loadMostOrderedMeal: PropTypes.func.isRequired,
  mealFlip: PropTypes.array.isRequired
};
function mapStateToProps(state) {
  const mealFlip = state.mostOrder.reverse().slice(0, 3);
  return {
    mostOrder: state.mostOrder,
    mealFlip
  };
}
function mapDispatchToProps(dispatch) {
  return { loadMostOrderedMeal: bindActionCreators(loadMostOrderedMeal, dispatch) };
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
