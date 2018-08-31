import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactCardFlip from 'react-card-flip';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { Redirect } from 'react-router-dom';
import Header from '../header/index';
import Footer from '../footer/index';
import './index.scss';
import { loadMostOrderedMeal } from '../../redux/Action/mealAction';
import MostOrder from './mostOrder';
import ParallaxScroll from './parallaxScroll';
import UserTestimonial from './userTestimonial';

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFlipped: false
    };
    this.showDetail = this.showDetail.bind(this);
  }
  /**
   * lifecycle hook called when component is mounted to DOM
   * load most ordered meal on page load
   */
  componentDidMount() {
    this.props.loadMostOrderedMeal(5);
  }

  showDetail(name, description, image) {
    return swal({
      title: name,
      text: description,
      icon: image,
      buttons: 'Cancel',
    });
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
    if (window.localStorage.getItem('role')) { return (<Redirect to="/dashboard" />); }
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
          <h2 id="header">BOOK A MEAL IN THREE EASY STEPS</h2>
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
          <MostOrder mostOrder={this.props.mostOrder} showDetail={this.showDetail} />
        </div>
        <ParallaxScroll />
        <div className="site-container" style={{ marginLeft: '3%', marginRight: '3%', marginBottom: '2rem' }}>
          <div className="meal-menu-row">
            { this.props.mealFlip.map(meal =>
            (
              <div className="meal-menu" key={meal.id}>
                <div className="meal-menu-flip">
                  <ReactCardFlip isFlipped={this.state[meal.id]}>
                    <div
                      id="flip-card"
                      key="front"
                      onMouseEnter={() => handleClick(meal.id)}
                    >
                      <img src={meal.image} alt="Avatar" className="meal-card-img" />
                    </div>
                    <div
                      id="flip-card-back"
                      key="back"
                      onMouseLeave={() => handleClose(meal.id)}
                    >
                      <h2>{meal.name}</h2>
                      <h2>Price: {meal.price}</h2>
                      <p className="justify l-r-pad-text">{`${meal.description.substr(0, 300).trim()}...`}</p>
                    </div>
                  </ReactCardFlip>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="user-testimonial"><br /><br />
          <h2 id="user-story">WHAT OUR FANTASTIC USERS SAY</h2>
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
export const mapStateToProps = (state) => {
  const mealFlip = state.mostOrder.reverse().slice(0, 3);
  return {
    mostOrder: state.mostOrder,
    mealFlip
  };
};

export const mapDispatchToProps = dispatch => ({
  loadMostOrderedMeal: bindActionCreators(loadMostOrderedMeal, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);
