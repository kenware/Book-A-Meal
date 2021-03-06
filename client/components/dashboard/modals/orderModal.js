import React from 'react';
import PropTypes from 'prop-types';
import './modal.scss';

const orderModal = ({ state, modify, onChange }) => (
  <div className="">
    <br />
    <div className="modal-header">
      <p className="justify l-r-pad-text">
        This order can only be modified within ONE hour after it is created
        <h4 className="danger text-center">{state.modifyError}</h4>
      </p>
    </div>
    <div className="modal-contents">
      <span className="modal-items l-r-pad-text"> Name: </span>
      <span className="modal-items ">{state.mealName}</span>
    </div>
    <div className="modal-contents">
      <span className="modal-items l-r-pad-text"> Price: </span>
      <span className="modal-items ">{state.price}</span>
    </div>
    <div className="modal-contents">
      <span className="modal-items l-r-pad-text"> Quantity: </span>
      <input className="modal-menu select" id="quantity" value={state.quantity} name="quantity" type="number" onChange={onChange} />
    </div>
    <div className="modal-contents">
      <span className="modal-items l-r-pad-text address"> Address: </span>
      <textarea rows="4" className="modal-menu" id="address" value={state.address} name="address" type="text" onChange={onChange} />
    </div>
    <button onClick={modify} className="checkout-btn">{state.modifyOrder}</button>
  </div>
);

orderModal.propTypes = {
  state: PropTypes.object.isRequired,
  modify: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

export default orderModal;
