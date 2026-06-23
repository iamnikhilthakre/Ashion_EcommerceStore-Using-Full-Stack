import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6 col-sm-7">
            <div className="footer__about">
              <div className="footer__logo">
                <Link to="/"><img src="/images/logo.webp" alt="Logo" /></Link>
              </div>
              <p>Experience premium shopping with AI-powered recommendations and smart search.</p>
              <div className="footer__payment">
                <a href="#"><img src="/images/pay1.webp" alt="Payment 1" /></a>
                <a href="#"><img src="/images/pay2.webp" alt="Payment 2" /></a>
                <a href="#"><img src="/images/pay3.webp" alt="Payment 3" /></a>
                <a href="#"><img src="/images/pay4.webp" alt="Payment 4" /></a>
                <a href="#"><img src="/images/pay5.webp" alt="Payment 5" /></a>
              </div>
            </div>
          </div>
          <div className="col-lg-2 col-md-3 col-sm-5">
            <div className="footer__widget">
              <h6>Quick links</h6>
              <ul>
                <li><Link to="#">About</Link></li>
                <li><Link to="#">Blogs</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="#">FAQ</Link></li>
              </ul>
            </div>
          </div>
          <div className="col-lg-2 col-md-3 col-sm-4">
            <div className="footer__widget">
              <h6>AI Features</h6>
              <ul>
                <li><Link to="#">AI Recommendations</Link></li>
                <li><Link to="#">Smart Search</Link></li>
                <li><Link to="#">Personalized Shop</Link></li>
              </ul>
            </div>
          </div>
          <div className="col-lg-4 col-md-8 col-sm-8">
            <div className="footer__newslatter">
              <h6>NEWSLETTER</h6>
              <form action="#">
                <input type="text" placeholder="Email" />
                <button type="submit" className="site-btn">Subscribe</button>
              </form>
              <div className="footer__social">
                <a href="#"><i className="fab fa-facebook-f"></i></a>
                <a href="#"><i className="fab fa-twitter"></i></a>
                <a href="#"><i className="fab fa-youtube"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
                <a href="#"><i className="fab fa-pinterest"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
