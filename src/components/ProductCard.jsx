import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { addToWishlist, removeFromWishlist } from "../redux/wishlistSlice";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);

  const isInWishlist = wishlistItems.some(
    (item) => String(item.id) === String(product.id)
  );

  if (!product) return null;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart({ product, quantity: 1 }));
    navigate("/cart");
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  return (
    <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
      <div className="product-item position-relative overflow-hidden">
        {/* Image Container with Hover Actions */}
        <div className="product-img-box position-relative overflow-hidden rounded shadow-sm bg-light">
          <Link to={`/product/${product.id}`} className="d-block product-link">
            <img
              src={product.image}
              alt={product.name}
              className="img-fluid w-100 transition-transform"
            />
          </Link>

          {/* Wishlist Button - Positioned at top right */}
          <button
            className={`wishlist-btn position-absolute ${isInWishlist ? 'active' : ''}`}
            onClick={handleWishlistToggle}
            title={isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
            style={{ zIndex: 10 }}
          >
            <i className={`${isInWishlist ? 'fas' : 'far'} fa-heart`}></i>
          </button>

          {/* Quick Action Buttons */}
          <div className="product-hover-overlay">
            <div className="d-flex gap-2">
              <button
                className="hover-btn cart-btn"
                onClick={handleAddToCart}
                title="Add to Cart & View Cart"
              >
                <i className="fas fa-shopping-cart"></i>
              </button>
              <Link
                to={`/product/${product.id}`}
                className="hover-btn detail-btn text-decoration-none"
                title="View Details"
              >
                <i className="fas fa-eye"></i>
              </Link>
            </div>
          </div>
        </div>

        {/* Product Info - Outside the image box */}
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

          <p className="product-price text-danger fw-bold mb-0">
            ${product.price}.00
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;