import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";

function Payment() {
  const { totalPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handlePayment = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      alert("Payment Successful ✅\nYour order has been placed.");
      dispatch(clearCart());
      navigate("/");
    }, 2000);
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-sm p-4">
            <h3 className="text-center mb-4">Payment Methods</h3>
            <div className="mb-4 d-flex justify-content-center gap-3">
              <i className="fab fa-cc-visa fa-3x text-primary"></i>
              <i className="fab fa-cc-mastercard fa-3x text-danger"></i>
              <i className="fab fa-cc-paypal fa-3x text-info"></i>
            </div>

            <form onSubmit={handlePayment}>
              <div className="mb-3">
                <label className="form-label">Cardholder Name</label>
                <input type="text" className="form-control" placeholder="John Doe" required />
              </div>
              <div className="mb-3">
                <label className="form-label">Card Number</label>
                <input type="text" className="form-control" placeholder="XXXX XXXX XXXX XXXX" required />
              </div>
              <div className="row">
                <div className="col-6 mb-3">
                  <label className="form-label">Expiration Date</label>
                  <input type="text" className="form-control" placeholder="MM/YY" required />
                </div>
                <div className="col-6 mb-3">
                  <label className="form-label">CVV</label>
                  <input type="password" className="form-control" placeholder="XXX" required />
                </div>
              </div>

              <div className="border-top pt-3 mt-3">
                <div className="d-flex justify-content-between mb-3 fw-bold">
                  <span>Payable Amount</span>
                  <span className="text-danger">${totalPrice.toFixed(2)}</span>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-100 py-2"
                  disabled={loading || totalPrice === 0}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Processing...
                    </>
                  ) : (
                    "Confirm Payment"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;