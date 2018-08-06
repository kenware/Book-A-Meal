import React from 'react';
import PropTypes from 'prop-types';
import './modal.scss';

const checkOutModal = ({
  carts, state, onChange, removeFromeCart
}) => (
  <div className="modal-wrapper top-margin">
    <div className="modal-contents">
      <span className="modal-items danger l-r-pad-text address"> {state.orderError} </span>
    </div>
    <div className="modal-contents">
      <span className="modal-items l-r-pad-text address"> Address: </span>
      <textarea rows="4" className="modal-menu "id="address" name="address" type="text" onChange={onChange} value={state.address} />
    </div>
    <div className="">
      <h4 className="justify l-r-pad-text">
        My Carts
      </h4>
      <h5 className="justify l-r-pad-text">
        {state.address}
      </h5>
    </div>
    <table className="table">
      <tbody>
        <tr className="p-white tr-color tr-height">
          <th>S/N</th>
          <th>Name</th>
          <td>Quantity</td>
          <td>Total Price</td>
          <td>Remove</td>
        </tr>
        {carts.map(cart =>
                (
                  <tr key={cart.id} className="order-contents tr tr-height">
                    <td>{carts.indexOf(cart) + 1}</td>
                    <td>{cart.name}</td>
                    <td>{cart.quantity}</td>
                    <td>{cart.totalPrice}</td>
                    <td><em onClick={() => removeFromeCart(cart)} className="fa fa-delete" role="button">Remove</em></td>
                  </tr>
                ))}
      </tbody>
    </table>

  </div>
);

checkOutModal.propTypes = {
  onChange: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired,
  carts: PropTypes.array.isRequired,
  removeFromeCart: PropTypes.func.isRequired
};

export default checkOutModal;
