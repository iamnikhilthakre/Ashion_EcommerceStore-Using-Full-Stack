import React, { useState, useEffect } from 'react'
import ProductCard from '../components/ProductCard'
import axios from 'axios'
import { Link, useSearchParams } from 'react-router-dom'

function Shop() {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState('default')
  const [priceRange, setPriceRange] = useState('all')
  const [searchParams] = useSearchParams()

  const priceRanges = [
    { id: 'all', label: 'All Prices', min: 0, max: Infinity },
    { id: '0-50', label: '$0 - $50', min: 0, max: 50 },
    { id: '50-100', label: '$50 - $100', min: 50, max: 100 },
    { id: '100-150', label: '$100 - $150', min: 100, max: 150 },
    { id: '150+', label: '$150+', min: 150, max: Infinity }
  ]

  useEffect(() => {
    const API = `${import.meta.env.VITE_API_URL}/products`
    axios.get(API)
      .then((res) => {
        setProducts(res.data)
        setFilteredProducts(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    const searchQuery = searchParams.get('search');
    let result = [...products];

    if (searchQuery) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (category !== 'all') {
      result = result.filter(p => p.category === category)
    }

    const selectedRange = priceRanges.find(r => r.id === priceRange);
    if (selectedRange && selectedRange.id !== 'all') {
      result = result.filter(p => p.price >= selectedRange.min && p.price < selectedRange.max);
    }

    if (sort === 'price-low') {
      result.sort((a, b) => a.price - b.price)
    } else if (sort === 'price-high') {
      result.sort((a, b) => b.price - a.price)
    } else if (sort === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name))
    }

    setFilteredProducts(result)
  }, [category, products, sort, priceRange, searchParams])

  const handleReset = () => {
    setCategory('all');
    setSort('default');
    setPriceRange('all');
  }

  return (
    <div className="shop-page">
      {/* Breadcrumb */}
      <div className="breadcrumb-container">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item"><Link to="/" className="text-decoration-none text-muted small">Home</Link></li>
              <li className="breadcrumb-item active small" aria-current="page">Shop</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container py-5">
        <div className="row">
          {/* Sidebar Filters */}
          <div className="col-lg-3">
            <div className="shop__sidebar pe-lg-4">
              <div className="sidebar__item mb-5">
                <h5 className="fw-bold mb-4 text-uppercase letter-spacing-1">Categories</h5>
                <ul className="list-unstyled">
                  {[
                    { id: 'all', label: 'All Categories' },
                    { id: 'women', label: "Women's Fashion" },
                    { id: 'men', label: "Men's Fashion" },
                    { id: 'kids', label: 'Kids & Baby' },
                    { id: 'cosmetics', label: 'Cosmetics' }
                  ].map((cat) => (
                    <li key={cat.id} className="mb-3">
                      <button
                        className={`btn btn-link text-decoration-none p-0 w-100 text-start d-flex justify-content-between align-items-center ${category === cat.id ? 'text-danger fw-bold' : 'text-muted'}`}
                        onClick={() => setCategory(cat.id)}
                      >
                        <span>{cat.label}</span>
                        {category === cat.id && <i className="fas fa-chevron-right small"></i>}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="sidebar__item mb-5">
                <h5 className="fw-bold mb-4 text-uppercase letter-spacing-1">Filter By Price</h5>
                <div className="price-range-wrap">
                  <div className="d-flex flex-wrap gap-2">
                    {priceRanges.filter(r => r.id !== 'all').map((range) => (
                      <button
                        key={range.id}
                        className={`btn btn-sm px-3 py-2 small fw-bold ${priceRange === range.id ? 'btn-danger text-white' : 'btn-outline-secondary'}`}
                        onClick={() => setPriceRange(range.id)}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="sidebar__item mb-5">
                <h5 className="fw-bold mb-4 text-uppercase letter-spacing-1">AI Features</h5>
                <p className="text-muted small mb-3">Our AI helps you find the perfect products faster!</p>
                <div className="alert alert-light border-0">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <i className="fas fa-brain text-danger"></i>
                    <span className="fw-bold small">Smart Recommendations</span>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <i className="fas fa-search text-danger"></i>
                    <span className="fw-bold small">AI-Powered Search</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="col-lg-9">
            <div className="shop__product__option mb-4 pb-3 border-bottom d-flex justify-content-between align-items-center">
              <div className="shop__product__option__left">
                <p className="mb-0 text-muted small">Showing <span className="fw-bold text-dark">{filteredProducts.length}</span> products</p>
              </div>
              <div className="shop__product__option__right d-flex align-items-center gap-3">
                <span className="small text-muted text-nowrap">Sort by:</span>
                <select
                  className="form-select form-select-sm border-0 bg-light fw-bold"
                  style={{ width: 'auto', cursor: 'pointer' }}
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option value="default">Default Sorting</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Product Name</option>
                </select>
              </div>
            </div>

            <div className="row g-4">
              {loading ? (
                <div className="col-12 text-center py-5">
                  <div className="spinner-border text-danger" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <div className="col-12 text-center py-5">
                  <div className="mb-4">
                    <i className="fas fa-search fa-3x text-light-emphasis"></i>
                  </div>
                  <h4 className="fw-bold">No products found</h4>
                  <p className="text-muted">Try adjusting your filters or search criteria.</p>
                  <button className="btn btn-danger mt-3 px-4" onClick={handleReset}>Reset All Filters</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Shop