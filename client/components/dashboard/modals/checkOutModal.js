import React from 'react';
import PropTypes from 'prop-types';
import './modal.scss';

const checkOutModal = ({
  carts, state, onChange, removeFromeCart
}) => (
  <div className="modal-wrapper top-margin">
    <p className="order-center">
      Cart
    </p>
    <div className="modal-contents">
      <span className="modal-items l-r-pad-text address"> Address: </span>
      <textarea rows="4" className="modal-menu "id="address" name="address" type="text" onChange={onChange} value={state.address} style={{ marginLeft: '1rem' }} />
    </div>
    <div className="">
      <h3 className="danger justify l-r-pad-text">
        {state.orderError}
      </h3>
      {state.errorMessage}
    </div>
    {carts.length > 0 ?
      <div>
        <table className="table">
          <tbody>
            <tr className="p-white tr-color tr-height">
              <th>S/N</th>
              <th>Name</th>
              <td>Quantity</td>
              <td>Remove</td>
            </tr>
            {carts.map(cart =>
                    (
                      <tr key={cart.id} className="order-contents tr tr-height">
                        <td>{carts.indexOf(cart) + 1}</td>
                        <td>{cart.name}</td>
                        <td>{cart.quantity}</td>
                        <td><em onClick={() => removeFromeCart(cart)} className="fa fa-trash-o" id="cart-btn" role="button" /></td>
                      </tr>
                    ))}
          </tbody>
        </table>
      </div>
    :
      <p className="order-center">
        Cart Empty
      </p>
  }
  </div>
);

checkOutModal.propTypes = {
  onChange: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired,
  carts: PropTypes.array.isRequired,
  removeFromeCart: PropTypes.func.isRequired
};

export default checkOutModal;
