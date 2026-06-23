import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromWishlist } from "../redux/wishlistSlice";
import { addToCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";

function Wishlist() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { wishlistItems, totalWishlistItems } = useSelector((state) => state.wishlist);

  const handleRemove = (id) => {
    dispatch(removeFromWishlist(id));
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart({ product, quantity: 1 }));
    dispatch(removeFromWishlist(product.id));
    navigate("/cart");
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="container py-5">
        <div className="text-center py-5">
          <i className="far fa-heart fa-4x text-muted mb-4"></i>
          <h2 className="fw-bold mb-3">Your Wishlist is Empty</h2>
          <p className="text-muted mb-4">Save items you love by clicking the heart icon on any product.</p>
          <Link to="/shop" className="btn btn-danger px-5 py-3 fw-bold">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <div className="breadcrumb-container">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item"><Link to="/" className="text-decoration-none text-muted small">Home</Link></li>
              <li className="breadcrumb-item active small" aria-current="page">Wishlist</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold mb-0">My Wishlist</h2>
          <span className="text-muted">{totalWishlistItems} items</span>
        </div>

        <div className="row g-4">
          {wishlistItems.map((product) => (
            <div key={product.id} className="col-lg-3 col-md-4 col-sm-6">
              <div className="product-item position-relative">
                <div className="product-img-box position-relative overflow-hidden rounded shadow-sm bg-light">
                  <Link to={`/product/${product.id}`} className="d-block">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="img-fluid w-100"
                    />
                  </Link>
                  <button
                    className="btn btn-sm btn-light position-absolute top-0 end-0 m-2 rounded-circle shadow-sm"
                    onClick={() => handleRemove(product.id)}
                    title="Remove from Wishlist"
                    style={{ zIndex: 10 }}
                  >
                    <i className="fas fa-times text-danger"></i>
                  </button>
                </div>
                <div className="product-info-box mt-3 text-center">
                  <Link to={`/product/${product.id}`} className="text-decoration-none text-dark">
                    <h6 className="product-title mb-1 fw-bold">{product.name}</h6>
                  </Link>
                  <div className="product-rating text-warning small mb-1">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                  <p className="product-price text-danger fw-bold mb-2">
                    ${product.price}.00
                  </p>
                  <button
                    className="btn btn-sm btn-danger w-100"
                    onClick={() => handleAddToCart(product)}
                  >
                    <i className="fas fa-cart-plus me-2"></i> Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-5">
          <Link to="/shop" className="btn btn-outline-dark px-5 py-3 fw-bold">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Wishlist;