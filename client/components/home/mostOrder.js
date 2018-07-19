import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
/**
 * @param  {} {mostOrder} load most ordered menu
 */
export const mostOrdered = ({ mostOrder }) => (
  <div className="meal-menu-row">
    { mostOrder.map(meal =>
    (
      <div className="meal-menu" key={meal.id}>
        <div className="meal-menu-card">
          <div className="meal-img-wrap">
            <div className="meal-overlay" />
            <img src={meal.Meal.image} alt="Avatar" className="meal-card-img" />
          </div>
          <div className="container l-r-pad-text">
            <h4 className="p-color"><b>${meal.Meal.price}</b></h4>
            <p>{meal.Meal.name}</p>
            <Link to="/dashboard">View</Link>
          </div>
        </div>
      </div>
    ))
    }
  </div>
);
mostOrdered.propTypes = {
  mostOrder: PropTypes.array.isRequired,
};
export default mostOrdered;

