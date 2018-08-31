import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Pagination from 'react-js-pagination';

const todayMenu = ({
  menu,
  cartModal,
  state,
  showMenu,
  menuMeals,
  handleMealPageChange
}) => (
  <div>
    { menu.rows.map(oneMenu =>
        (
          <div key={oneMenu.id}>
            <button className="menuAccordion" onClick={() => showMenu(oneMenu.id, oneMenu.meals.replace(window.location.host, ''))}>
              <span style={{ float: 'right', marginTop: '1.5rem' }}>{ state.accordion[oneMenu.id] ? <em className="fa fa-minus p-color" /> : <em className="fa fa-plus p-color" />}</span>
              <img src={oneMenu.user.image ? oneMenu.user.image : 'image/profile.png'} className="user-img rounded-circle" alt="profile" /><br />
              {oneMenu.user.username}
            </button>
            <div className={`showA meal-menu-row spread${state.accordion[oneMenu.id]}`} >
              { menuMeals.meals.length > 0 ? menuMeals.meals.map(meal => (
                <div key={meal.id} className="meal-menu">
                  <div className="menu-card">
                    <div className="menu-img-wrap">
                      <div className="menu-overlay" />
                      <img src={meal.image} alt="Avatar" className="menu-card-img" />
                    </div>
                    <div className="container l-r-pad-text flex-direction pad-text">
                      <span className="p-color pad-text"><b>{meal.name}</b></span>
                      <span className="p-color pad-text"><b>$ {meal.price}</b></span>
                    </div>
                    <div className="container l-r-pad-text">
                      <button onClick={() => cartModal(meal.id, oneMenu.id, meal.name, meal.image, meal.price, meal.description)} className="order1">
                        <em className="fa fa-cart-plus" />
                        &nbsp; Order
                      </button>
                    </div>
                  </div>
                </div>
              )) :
              <div><i className="fa fa-spinner fa-spin fa-4x fa-fw" aria-hidden="true" /></div>}
              <div className="meal-pagination" style={{ width: '100%' }}>
                <Pagination
                  activePage={state.mealActivePage}
                  itemsCountPerPage={4}
                  totalItemsCount={Math.ceil(menuMeals.count)}
                  pageRangeDisplayed={6}
                  onChange={handleMealPageChange}
                />
              </div>
            </div>
          </div>
        )) }
  </div>
);

todayMenu.propTypes = {
  handleMealPageChange: PropTypes.func.isRequired,
  menuMeals: PropTypes.object.isRequired,
  showMenu: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired,
  menu: PropTypes.object.isRequired,
  cartModal: PropTypes.func.isRequired
};

export default todayMenu;

