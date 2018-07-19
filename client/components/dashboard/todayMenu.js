import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const todayMenu = ({
  menu, confirmOrder, state, showMenu, menuMeals
}) => (
  <div>
    { menu.map(oneMenu =>
        (
          <div key={oneMenu.id}>
            <button className="accordion" onClick={() => showMenu(oneMenu.id, oneMenu.Meals.replace(window.location.host, ''))}>
              <span style={{ float: 'right', marginTop: '1.5rem' }}>{ state.accordion[oneMenu.id] ? <em className="fa fa-minus p-color" /> : <em className="fa fa-plus p-color" />}</span>
              <img src={oneMenu.User.image ? oneMenu.User.image : 'image/l.png'} className="user-img rounded-circle" alt="profile" /><br />
              {oneMenu.User.username}
            </button>
            <div className={`showA meal-menu-row spread${state.accordion[oneMenu.id]}`} >
              { menuMeals.length > 0 ? menuMeals.map(meal => (
                <div key={meal.id} className="meal-menu">
                  <div className="menu-card">
                    <div className="menu-img-wrap">
                      <div className="menu-overlay" />
                      <img src={meal.image} alt="Avatar" className="menu-card-img" />
                    </div>
                    <div className="container l-r-pad-text">
                      <h4 className="p-color"><b>{meal.name}</b></h4>
                      <button onClick={() => confirmOrder(meal.id, oneMenu.id, meal.name, meal.image, meal.price, meal.description)} className="order1">
                        <em className="fa fa-cart-plus" />
                        &nbsp; Order
                      </button>
                    </div>
                  </div>
                </div>
              )) :
              <div><i className="fa fa-spinner fa-spin fa-4x fa-fw" aria-hidden="true" /></div>}
            </div>
          </div>
        )) }
  </div>
);

todayMenu.propTypes = {
  menuMeals: PropTypes.array.isRequired,
  showMenu: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired,
  menu: PropTypes.array.isRequired,
  confirmOrder: PropTypes.func.isRequired
};

export default todayMenu;

