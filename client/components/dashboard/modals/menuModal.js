import React from 'react';
import PropTypes from 'prop-types';
import './modal.scss';

const menuModal = ({ state, addToCart, onChange }) => (
  <div className="">
    <br />
    <div className="modal-header">
      <h4 className="justify l-r-pad-text">
        Add { state.cart.mealName} to cart <br />
        Price: # { state.cart.price }
        <p className="danger text-center">{state.emptyAddress}</p>
      </h4>
    </div>
    <div className="modal-contents" style={{ justifyContent: 'center' }}>
      <img src={state.cart.image} className="rounded-circle img-height" alt="meal" />
    </div>
    <div className="modal-contents">
      <span className="modal-items l-r-pad-text"> Quantity: </span>
      <input type="number" onChange={onChange} className="modal-menu select" name="quantity" />

    </div>
    <div className="menu-footer">
      <button onClick={addToCart} className="modal-btn">Add To Cart</button>
    </div>
  </div>
);

menuModal.propTypes = {
  state: PropTypes.object.isRequired,
  addToCart: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

export default menuModal;
