import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { addToWishlist, removeFromWishlist } from "../redux/wishlistSlice";
import ProductCard from "../components/ProductCard";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);

  const isInWishlist = product ? wishlistItems.some(item => String(item.id) === String(product.id)) : false;

  useEffect(() => {
    // Scroll to top when product changes
    window.scrollTo(0, 0);

    let currentCategory = "";

    axios
      .get(`${import.meta.env.VITE_API_URL}/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        currentCategory = res.data.category;
        // Fetch all products to filter manually (more reliable than API filtering in some json-server setups)
        return axios.get(`${import.meta.env.VITE_API_URL}/products`);
      })
      .then((res) => {
        // Filter by category and exclude current product
        const filtered = res.data
          .filter(p => p.category === currentCategory)
          .filter(p => String(p.id) !== String(id))
          .slice(0, 4);
        
        // If we still have nothing in that category, just show other products as fallback
        if (filtered.length === 0) {
          setRelatedProducts(res.data.filter(p => String(p.id) !== String(id)).slice(0, 4));
        } else {
          setRelatedProducts(filtered);
        }
      })
      .catch((err) => {
        console.error("Error fetching product details:", err);
      });
  }, [id]);

  if (!product) {
    return <h2 className="text-center mt-5">Loading...</h2>;
  }

  const handleAddToCart = () => {
    const quantity = parseInt(document.getElementById("product-qty")?.value || 1);
    dispatch(addToCart({ product, quantity }));
  };

  const handleBuyNow = () => {
    // Check if item is already in cart (using string comparison for ID safety)
    const isAlreadyInCart = cartItems.some((item) => String(item.id) === String(product.id));

    if (!isAlreadyInCart) {
      handleAddToCart();
    }

    // Always navigate to cart
    navigate("/cart");
  };

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  return (
    <div className="product-details-page">
      {/* Breadcrumb */}
      <div className="breadcrumb-container">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item"><Link to="/" className="text-decoration-none text-muted small">Home</Link></li>
              <li className="breadcrumb-item"><Link to="/shop" className="text-decoration-none text-muted small">Shop</Link></li>
              <li className="breadcrumb-item active small" aria-current="page">{product.name}</li>
            </ol>
          </nav>
        </div>
      </div>

      <section className="product-main-details py-5">
        <div className="container">
          <div className="row g-5">
            {/* Product Images */}
            <div className="col-lg-6">
              <div className="row g-3 sticky-top" style={{ top: '100px', height: 'fit-content' }}>
                <div className="col-2">
                  <div className="d-flex flex-column gap-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className={`product-gallery-thumb rounded overflow-hidden ${i === 1 ? 'active' : ''}`}>
                        <img src={product.image} alt="" className="img-fluid" />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-10">
                  <div className="product-main-img-container shadow-sm">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="img-fluid rounded w-100"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Product Content */}
            <div className="col-lg-6">
              <div className="product-details-content">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="badge bg-danger text-uppercase">New Arrival</span>
                  <div className="d-flex align-items-center gap-3">
                    <button
                      className={`btn btn-sm border-0 bg-transparent p-0 ${isInWishlist ? 'text-danger' : 'text-muted'}`}
                      onClick={handleWishlistToggle}
                      title={isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                    >
                      <i className={`${isInWishlist ? 'fas' : 'far'} fa-heart fa-lg`}></i>
                    </button>
                    <div className="social-share d-flex gap-3 text-muted small">
                      <span className="cursor-pointer hover-text-danger"><i className="fab fa-facebook-f"></i></span>
                      <span className="cursor-pointer hover-text-danger"><i className="fab fa-twitter"></i></span>
                      <span className="cursor-pointer hover-text-danger"><i className="fab fa-pinterest"></i></span>
                      <span className="cursor-pointer hover-text-danger"><i className="fas fa-share-alt"></i></span>
                    </div>
                  </div>
                </div>
                <h2 className="display-6 fw-bold mb-2">{product.name}</h2>
                
                <div className="d-flex align-items-center gap-3 mb-4">
                  <div className="text-warning">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star-half-alt"></i>
                  </div>
                  <span className="text-muted small fw-bold">4.8 / 5.0 (128 Reviews)</span>
                  <span className="text-success small fw-bold ms-auto"><i className="fas fa-eye me-1"></i> 24 people viewing this right now</span>
                </div>

                <div className="price-box">
                  <span className="current-price">${product.price}.00</span>
                  <span className="old-price">${product.price + 50}.00</span>
                  <span className="text-success small fw-bold bg-light-success px-2 py-1 rounded">Save $50.00</span>
                </div>

                <p className="product-short-desc text-muted mb-4 fs-5">
                  Experience premium quality and unparalleled style with the {product.name}. 
                  Designed for those who appreciate the finer details, this product combines 
                  comfort, durability, and a modern aesthetic that fits perfectly into any wardrobe.
                </p>

                <div className="product-options mb-4 p-4 bg-light rounded-3">
                  <div className="row g-4">
                    <div className="col-sm-6">
                      <label className="fw-bold mb-2 small text-uppercase text-muted d-block">Availability:</label>
                      <span className="text-success fw-bold small"><i className="fas fa-check-circle me-1"></i> In Stock (Ready to Ship)</span>
                    </div>
                    <div className="col-sm-6">
                      <label className="fw-bold mb-2 small text-uppercase text-muted d-block">Shipping Time:</label>
                      <span className="text-dark fw-bold small"><i className="fas fa-clock me-1"></i> 3 - 5 Business Days</span>
                    </div>
                  </div>
                  
                  {product.sizes && (
                    <div className="mt-4 pt-4 border-top">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <label className="fw-bold small text-uppercase text-muted">Select Size:</label>
                        <button className="btn btn-link btn-sm text-decoration-none text-danger p-0 small fw-bold">SIZE GUIDE</button>
                      </div>
                      <div className="d-flex gap-2">
                        {product.sizes.map((size) => (
                          <button key={size} className="btn btn-outline-dark btn-sm px-3 py-2 fw-bold">{size}</button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="d-flex align-items-center gap-3 mb-5">
                  <div className="qty-input-box bg-white">
                    <button className="qty-btn" onClick={() => {
                      const input = document.getElementById('product-qty');
                      if (input.value > 1) input.value = parseInt(input.value) - 1;
                    }}>-</button>
                    <input
                      type="number"
                      min="1"
                      defaultValue="1"
                      className="qty-input"
                      id="product-qty"
                    />
                    <button className="qty-btn" onClick={() => {
                      const input = document.getElementById('product-qty');
                      input.value = parseInt(input.value) + 1;
                    }}>+</button>
                  </div>
                  
                  <div className="action-buttons d-flex gap-2 flex-grow-1">
                    <button className="btn btn-danger flex-grow-1 py-3" onClick={handleAddToCart}>
                      <i className="fas fa-shopping-cart me-2"></i> Add to Cart
                    </button>
                    <button className="btn btn-dark flex-grow-1 py-3" onClick={handleBuyNow}>
                      Buy Now
                    </button>
                  </div>
                </div>

                <div className="trust-badges pt-4 border-top">
                  <div className="row g-4">
                    <div className="col-6">
                      <div className="trust-item d-flex align-items-center gap-3">
                        <div className="trust-icon bg-light p-3 rounded-circle text-danger">
                          <i className="fas fa-truck"></i>
                        </div>
                        <div>
                          <h6 className="mb-0 fw-bold small">Free Shipping</h6>
                          <p className="mb-0 text-muted smaller">On all orders over $99</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="trust-item d-flex align-items-center gap-3">
                        <div className="trust-icon bg-light p-3 rounded-circle text-danger">
                          <i className="fas fa-undo"></i>
                        </div>
                        <div>
                          <h6 className="mb-0 fw-bold small">30 Day Returns</h6>
                          <p className="mb-0 text-muted smaller">No questions asked</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="trust-item d-flex align-items-center gap-3">
                        <div className="trust-icon bg-light p-3 rounded-circle text-danger">
                          <i className="fas fa-shield-alt"></i>
                        </div>
                        <div>
                          <h6 className="mb-0 fw-bold small">Secure Payment</h6>
                          <p className="mb-0 text-muted smaller">100% Secure Checkout</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="trust-item d-flex align-items-center gap-3">
                        <div className="trust-icon bg-light p-3 rounded-circle text-danger">
                          <i className="fas fa-headset"></i>
                        </div>
                        <div>
                          <h6 className="mb-0 fw-bold small">24/7 Support</h6>
                          <p className="mb-0 text-muted smaller">Dedicated help center</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Tabs Section */}
          <div className="product-tabs-section">
            <ul className="nav nav-tabs nav-tabs-premium" id="productTab" role="tablist">
              <li className="nav-item" role="presentation">
                <button className="nav-link active" id="description-tab" data-bs-toggle="tab" data-bs-target="#description" type="button" role="tab">DESCRIPTION</button>
              </li>
              <li className="nav-item" role="presentation">
                <button className="nav-link" id="specifications-tab" data-bs-toggle="tab" data-bs-target="#specifications" type="button" role="tab">SPECIFICATIONS</button>
              </li>
              <li className="nav-item" role="presentation">
                <button className="nav-link" id="reviews-tab" data-bs-toggle="tab" data-bs-target="#reviews" type="button" role="tab">REVIEWS (128)</button>
              </li>
            </ul>
            <div className="tab-content" id="productTabContent">
              <div className="tab-pane fade show active" id="description" role="tabpanel">
                <div className="tab-pane-content text-center mx-auto" style={{maxWidth: '800px'}}>
                  <h4 className="fw-bold mb-4">Unmatched Quality & Style</h4>
                  <p className="mb-4">
                    The {product.name} represents the pinnacle of our design philosophy. 
                    Every stitch, every fold, and every choice of material has been carefully 
                    vetted to ensure you receive a product that not only looks exceptional 
                    but feels incredible to wear.
                  </p>
                  <div className="row g-4 mt-2">
                    <div className="col-md-6 text-start">
                      <h6 className="fw-bold mb-3"><i className="fas fa-check text-success me-2"></i> Premium Materials</h6>
                      <p className="small">Sourced from the finest suppliers, our materials are chosen for their longevity and soft feel.</p>
                    </div>
                    <div className="col-md-6 text-start">
                      <h6 className="fw-bold mb-3"><i className="fas fa-check text-success me-2"></i> Modern Fit</h6>
                      <p className="small">Tailored to provide a contemporary silhouette that complements all body types.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" id="specifications" role="tabpanel">
                <div className="tab-pane-content mx-auto" style={{maxWidth: '700px'}}>
                  <div className="spec-row">
                    <div className="spec-label text-uppercase small">Material</div>
                    <div className="spec-value">100% Organic Cotton / Recycled Polyester</div>
                  </div>
                  <div className="spec-row">
                    <div className="spec-label text-uppercase small">Weight</div>
                    <div className="spec-value">320 GSM Premium Fabric</div>
                  </div>
                  <div className="spec-row">
                    <div className="spec-label text-uppercase small">Care</div>
                    <div className="spec-value">Machine wash cold, tumble dry low</div>
                  </div>
                  <div className="spec-row">
                    <div className="spec-label text-uppercase small">Origin</div>
                    <div className="spec-value">Ethically manufactured in Italy</div>
                  </div>
                  <div className="spec-row">
                    <div className="spec-label text-uppercase small">SKU</div>
                    <div className="spec-value">ASH-{product.id}-00{product.id}</div>
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" id="reviews" role="tabpanel">
                <div className="tab-pane-content">
                  <div className="row justify-content-center">
                    <div className="col-lg-10">
                      <div className="d-flex justify-content-between align-items-center mb-5 pb-4 border-bottom">
                        <div>
                          <h4 className="fw-bold mb-1">Customer Reviews</h4>
                          <div className="text-warning small">
                            <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star-half-alt"></i>
                            <span className="ms-2 text-dark fw-bold">4.8 out of 5</span>
                          </div>
                        </div>
                        <button className="btn btn-dark fw-bold px-4">WRITE A REVIEW</button>
                      </div>

                      <div className="review-list">
                        {[
                          { name: 'John D.', date: 'April 12, 2024', title: 'Excellent Quality!', rating: 5, comment: 'The material is much better than I expected. Fits perfectly and looks very premium.' },
                          { name: 'Sarah M.', date: 'March 28, 2024', title: 'Great Style', rating: 4, comment: 'Love the design and color. It\'s very comfortable to wear all day.' },
                          { name: 'Robert P.', date: 'February 15, 2024', title: 'Highly Recommend', rating: 5, comment: 'Fantastic product. The attention to detail is impressive. Will definitely buy more.' },
                        ].map((rev, i) => (
                          <div key={i} className="mb-5 pb-4 border-bottom">
                            <div className="d-flex justify-content-between mb-2">
                              <div className="text-warning small">
                                {[...Array(5)].map((_, idx) => (
                                  <i key={idx} className={`${idx < rev.rating ? 'fas' : 'far'} fa-star`}></i>
                                ))}
                              </div>
                              <span className="text-muted small fw-bold text-uppercase">{rev.date}</span>
                            </div>
                            <h6 className="fw-bold mb-2">{rev.title}</h6>
                            <p className="text-muted mb-3">{rev.comment}</p>
                            <div className="d-flex align-items-center gap-2">
                              <div className="bg-light rounded-circle d-flex align-items-center justify-content-center" style={{width: '35px', height: '35px', fontSize: '0.8rem', fontWeight: 'bold'}}>
                                {rev.name.charAt(0)}
                              </div>
                              <span className="small fw-bold">{rev.name}</span>
                              <span className="ms-3 text-success small"><i className="fas fa-check-circle me-1"></i> Verified Purchase</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="text-center mt-4">
                        <button className="btn btn-outline-dark btn-sm px-5 fw-bold">LOAD MORE REVIEWS</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          <div className="related-products mt-5 pt-5">
            <div className="d-flex justify-content-between align-items-end mb-4">
              <div>
                <span className="text-danger fw-bold text-uppercase small letter-spacing-1">AI-Powered</span>
                <h3 className="fw-bold mb-0">You Might Also Like</h3>
                <p className="text-muted small mb-0">Curated by our smart recommendation engine</p>
              </div>
              <Link to="/shop" className="btn btn-outline-dark btn-sm px-4 fw-bold">VIEW ALL</Link>
            </div>
            <div className="row g-4">
              {relatedProducts.length > 0 ? (
                relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))
              ) : (
                <div className="col-12 text-center py-5">
                  <div className="spinner-border text-danger" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <div className="newsletter-content">
                <span className="text-danger fw-bold text-uppercase small mb-3 d-block">Join Our Community</span>
                <h2 className="mb-4">Get 20% Off Your First Order</h2>
                <p className="text-white-50 mb-5 mx-auto" style={{maxWidth: '500px'}}>
                  Subscribe to our newsletter and be the first to know about new arrivals, 
                  exclusive offers, and the latest fashion trends.
                </p>
                <form className="newsletter-form d-flex mx-auto" style={{maxWidth: '500px'}}>
                  <input type="email" className="form-control" placeholder="Your Email Address" required />
                  <button type="submit" className="btn btn-danger">Subscribe</button>
                </form>
                <p className="mt-4 small text-white-50">
                  <i className="fas fa-shield-alt me-2"></i> Your privacy is important to us. Unsubscribe at any time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductDetails;