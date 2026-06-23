import React, { useState, useEffect } from "react"
import { NavLink, Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { setSearchQuery, toggleSearch, closeSearch } from "../redux/searchSlice"
import { addToCart } from "../redux/cartSlice"
import { logout } from "../redux/authSlice"
import axios from "axios"
import '@fortawesome/fontawesome-free/css/all.min.css';

function Navbar() {
    const { totalQuantity } = useSelector((state) => state.cart);
    const { query, isSearchOpen } = useSelector((state) => state.search);
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const { totalWishlistItems } = useSelector((state) => state.wishlist);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        if (query.length >= 2) {
            const fetchResults = async () => {
                setIsSearching(true);
                try {
                    const res = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
                    const filtered = res.data.filter(p =>
                        p.name.toLowerCase().includes(query.toLowerCase()) ||
                        p.category.toLowerCase().includes(query.toLowerCase())
                    ).slice(0, 5);
                    setSearchResults(filtered);
                } catch (err) {
                    console.error("Search error:", err);
                }
                setIsSearching(false);
            };
            const timeoutId = setTimeout(fetchResults, 300);
            return () => clearTimeout(timeoutId);
        } else {
            setSearchResults([]);
        }
    }, [query]);

    const handleSearchInputChange = (e) => {
        const value = e.target.value;
        setSearchInput(value);
        dispatch(setSearchQuery(value));
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchInput.trim()) {
            dispatch(closeSearch());
            navigate(`/shop?search=${encodeURIComponent(searchInput.trim())}`);
            setSearchInput("");
            setSearchResults([]);
        }
    };

    const handleResultClick = (productId) => {
        dispatch(closeSearch());
        setSearchInput("");
        setSearchResults([]);
        navigate(`/product/${productId}`);
    };

    const handleSearchToggle = () => {
        dispatch(toggleSearch());
        if (!isSearchOpen) {
            setSearchInput("");
            setSearchResults([]);
        }
    };

    const handleAddToCart = (product) => {
        dispatch(addToCart({ product, quantity: 1 }));
        dispatch(closeSearch());
        setSearchInput("");
        setSearchResults([]);
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    return (
        <>
            <div className={`offcanvas-menu-overlay ${isMenuOpen ? "active" : ""}`} onClick={toggleMenu}></div>
            <div className={`offcanvas-menu-wrapper ${isMenuOpen ? "show-offcanvas-menu-wrapper" : ""}`}>
                <div className="offcanvas__close" onClick={toggleMenu}>+</div>
                <ul className="offcanvas__widget">
                    <li><span className="icon_search search-switch" onClick={handleSearchToggle}></span></li>
                    <li><NavLink to="/wishlist"><span className="icon_heart_alt"></span>
                        <div className="tip">{totalWishlistItems}</div>
                    </NavLink></li>
                    <li><NavLink to="/cart"><span className="icon_bag_alt"></span>
                        <div className="tip">{totalQuantity}</div>
                    </NavLink></li>
                </ul>
                <div className="offcanvas__logo">
                    <NavLink to="/"><img src="/images/logo.webp" alt="" /></NavLink>
                </div>
                <div id="mobile-menu-wrap"></div>
                <div className="offcanvas__auth">
                    {isAuthenticated ? (
                        <>
                            <span className="text-dark small">Hi, {user?.name?.split(" ")[0] || "User"}</span>
                            <button className="btn btn-link text-danger p-0 border-0 small" onClick={handleLogout}>Logout</button>
                        </>
                    ) : (
                        <>
                            <NavLink to="/login">Login</NavLink>
                            <NavLink to="/login">Register</NavLink>
                        </>
                    )}
                </div>
            </div>

            <header className="header">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-3 col-lg-2">
                            <div className="header__logo">
                                <NavLink to="/"><img src="/images/logo.webp" alt="Logo" /></NavLink>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-7">
                            <nav className="header__menu">
                                <ul>
                                    <li><NavLink to="/" end>Home</NavLink></li>
                                    <li><NavLink to="/shop">Shop</NavLink></li>
                                    <li><NavLink to="#">Pages</NavLink>
                                        <ul className="dropdown">
                                            <li><NavLink to="/cart">Shop Cart</NavLink></li>
                                            <li><NavLink to="/checkout">Checkout</NavLink></li>
                                            {isAuthenticated && <li><NavLink to="/wishlist">Wishlist</NavLink></li>}
                                        </ul>
                                    </li>
                                    <li><NavLink to="/contact">Contact</NavLink></li>
                                </ul>
                            </nav>
                        </div>
                        <div className="col-lg-3">
                            <div className="header__right">
                                <div className="header__right__auth">
                                    {isAuthenticated ? (
                                        <div className="d-flex align-items-center gap-2">
                                            <span className="small text-dark">Hi, <strong>{user?.name?.split(" ")[0] || "User"}</strong></span>
                                            <button
                                                className="btn btn-link text-danger p-0 border-0 small"
                                                onClick={handleLogout}
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <NavLink to="/login">Login</NavLink>
                                            <NavLink to="/login">Register</NavLink>
                                        </>
                                    )}
                                </div>
                                <ul className="header__right__widget">
                                    <li onClick={handleSearchToggle} style={{ cursor: 'pointer' }}>
                                        <i className="fas fa-search"></i>
                                    </li>
                                    <li>
                                        <NavLink to="/wishlist">
                                            <i className="far fa-heart"></i>
                                            <div className="tip">{totalWishlistItems}</div>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/cart">
                                            <i className="fas fa-shopping-bag"></i>
                                            <div className="tip">{totalQuantity}</div>
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="canvas__open" onClick={toggleMenu}>
                        <i className="fa fa-bars"></i>
                    </div>
                </div>
            </header>

            {/* Search Overlay */}
            {isSearchOpen && (
                <div className="search-overlay" onClick={(e) => { if (e.target.className === 'search-overlay') dispatch(closeSearch()); }}>
                    <div className="search-modal">
                        <div className="search-header d-flex justify-content-between align-items-center mb-3">
                  <h5 className="mb-0 fw-bold">AI-Powered Search</h5>
                  <button
                    className="btn btn-link text-dark p-0 border-0"
                    onClick={() => dispatch(closeSearch())}
                  >
                    <i className="fas fa-times fa-lg"></i>
                  </button>
                </div>
                <form onSubmit={handleSearchSubmit} className="search-form">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Search with AI - find exactly what you need..."
                      value={searchInput}
                      onChange={handleSearchInputChange}
                      autoFocus
                    />
                    <button className="btn btn-dark" type="submit">
                      <i className="fas fa-search"></i>
                    </button>
                  </div>
                </form>

                        {searchResults.length > 0 && (
                            <div className="search-results mt-3">
                                <div className="list-group">
                                    {searchResults.map((product) => (
                                        <div key={product.id} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                                            <div
                                                className="d-flex align-items-center gap-3 w-100 cursor-pointer"
                                                onClick={() => handleResultClick(product.id)}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <img src={product.image} alt={product.name} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                                                <div>
                                                    <h6 className="mb-0">{product.name}</h6>
                                                    <small className="text-muted">{product.category}</small>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center gap-2">
                                                <span className="text-danger fw-bold">${product.price}.00</span>
                                                <button
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }}
                                                    title="Add to Cart"
                                                >
                                                    <i className="fas fa-cart-plus"></i>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button
                                    className="btn btn-link text-danger w-100 mt-3 text-center"
                                    onClick={handleSearchSubmit}
                                >
                                    View all results for "{query}"
                                </button>
                            </div>
                        )}

                        {isSearching && (
                            <div className="text-center py-3">
                                <div className="spinner-border text-danger" role="status"></div>
                            </div>
                        )}

                        {query.length >= 2 && searchResults.length === 0 && !isSearching && (
                            <div className="text-center py-4">
                                <i className="fas fa-search fa-2x text-muted mb-2"></i>
                                <p className="text-muted mb-0">No products found for "{query}"</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}

export default Navbar