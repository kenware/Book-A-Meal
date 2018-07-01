import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const todayMenu = ({ menu, confirmOrder }) => (
  <div>
    { menu.map(menuMeals =>
        (
          <div key={menuMeals.id}>
            <h3 className="p-color text-center">Menu by Caterer&nbsp;
              <Link to={`/profile/${menuMeals.User.id}`}>{menuMeals.User.name}</Link>
              <img src={menuMeals.User.image} className="user-img rounded-circle" alt="profile" />
            </h3>
            {menuMeals.Meals.map(meal =>
            (
              <div className="contents" key={meal.id}>
                <div className="content-wrap">
                  <div className="col-meal l-r-pad-text">
                    <a href="image/l.png"><img src={meal.image} className="rounded-circle img-height" alt="menu meal" /></a>
                  </div>
                  <div className="col-meal">
                    <h4 className="p-color"> Name</h4>{meal.name}
                  </div>
                  <div className="col-meal">
                    <h4 className="p-color">Price(#)</h4>{meal.price}
                  </div>
                  <div className="col-meal">
                    <h5 className="p-color">
                      <Link to="/detail">View</Link>&nbsp;
                      <button onClick={() => confirmOrder(meal.id, menuMeals.id, meal.name, meal.image, meal.price, meal.description)} className="order1">
                        <em className="fa fa-cart-plus" />
                    &nbsp; Order
                      </button>
                    </h5>
                  </div>
                </div>
              </div>
                ))}
          </div>
        )) }
  </div>
);
todayMenu.propTypes = {
  menu: PropTypes.array.isRequired,
  confirmOrder: PropTypes.func.isRequired
};
export default todayMenu;

