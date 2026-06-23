import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { removeFromCart, updateQuantity } from "../redux/cartSlice";

function Cart() {
  const { cartItems, totalPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleQuantityChange = (id, quantity) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity: parseInt(quantity) }));
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <div className="text-center py-5">
          <h4>Your cart is empty</h4>
          <NavLink to="/" className="btn btn-primary mt-3">Continue Shopping</NavLink>
        </div>
      ) : (
        <div className="row">
          <div className="col-lg-8">
            <div className="table-responsive">
              <table className="table table-borderless align-middle">
                <thead className="border-bottom">
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id} className="border-bottom">
                      <td>
                        <div className="d-flex align-items-center">
                          <img
                            src={item.image}
                            alt={item.name}
                            style={{ width: "70px", height: "70px", objectFit: "cover", marginRight: "15px" }}
                          />
                          <span className="fw-bold">{item.name}</span>
                        </div>
                      </td>
                      <td>${item.price}</td>
                      <td>
                        <input
                          type="number"
                          className="form-control"
                          style={{ width: "70px" }}
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                          min="1"
                        />
                      </td>
                      <td>${(item.price * item.quantity).toFixed(2)}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => dispatch(removeFromCart(item.id))}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card shadow-sm p-4">
              <h4 className="mb-4">Cart Total</h4>
              <div className="d-flex justify-content-between mb-3">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-4 fw-bold">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <button
                className="btn btn-dark w-100 py-2"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
