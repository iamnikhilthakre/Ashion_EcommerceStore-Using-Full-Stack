import React, { useEffect } from 'react'
// import ProductCard from '../components/ProductCard'
import ProductList from '../components/ProductList'
import { NavLink, Link } from 'react-router-dom'
import trendData from '../data/array'

function Home() {

  useEffect(() => {
    const nextYear = new Date().getFullYear() + 1;
    const endDate = new Date(`January 1, ${nextYear} 00:00:00`).getTime();

    function startTimer() {
      const now = new Date().getTime();
      const distance = endDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor(
        (distance % (1000 * 60)) / 1000
      );

      document.getElementById("days").innerText = String(days).padStart(2, "0");
      document.getElementById("hours").innerText = String(hours).padStart(2, "0");
      document.getElementById("minutes").innerText = String(minutes).padStart(2, "0");
      document.getElementById("seconds").innerText = String(seconds).padStart(2, "0");

      if (distance < 0) {
        clearInterval(timer);
      }
    }

    const timer = setInterval(startTimer, 1000);
    startTimer();

    return () => clearInterval(timer);
  }, []);
  return (
    <>
      {/* Category Section */}
      <section className="categories">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6 p-0">
              <div className="categories__item categories__large__item set-bg"
                style={{
                  backgroundImage: "url('/images/bg1.webp')"
                }}>
                <div className="categories__text">
                  <h1>Women’s fashion</h1>
                  <p>Sitamet, consectetur adipiscing elit, sed do eiusmod tempor incidid-unt labore
                    edolore magna aliquapendisse ultrices gravida.</p>
                  <Link to="/shop">Shop now</Link>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6 p-0">
                  <div className="categories__item set-bg" style={{
                    backgroundImage: "url('/images/bg2.webp')"
                  }}>
                    <div className="categories__text">
                      <h4>Men's fashion</h4>
                      <p>358 items</p>
                      <Link to="/shop">Shop now</Link>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 p-0">
                  <div className="categories__item set-bg" style={{
                    backgroundImage: "url('/images/bg3.webp')"
                  }}>
                    <div className="categories__text">
                      <h4>Kid's fashion</h4>
                      <p>273 items</p>
                      <Link to="/shop">Shop now</Link>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 p-0">
                  <div className="categories__item set-bg" style={{
                    backgroundImage: "url('/images/bg4.webp')"
                  }}>
                    <div className="categories__text">
                      <h4>Cosmetics</h4>
                      <p>159 items</p>
                      <Link to="/shop">Shop now</Link>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 p-0">
                  <div className="categories__item set-bg" style={{
                    backgroundImage: "url('/images/bg5.webp')"
                  }}>
                    <div className="categories__text">
                      <h4>Accessories</h4>
                      <p>792 items</p>
                      <Link to="/shop">Shop now</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Product Section */}
      <section className="mt-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 products">
              <h2 className="underline">AI-PREMIUM PRODUCTS</h2>
              <p className="text-center text-muted mb-4">Curated just for you by our smart AI recommendation engine</p>
              <ProductList />
            </div>
          </div>
        </div>
      </section>


      <section className="banner set-bg container-fluid mt-5" style={{
        backgroundImage: "url('/images/portfolio.webp')"
      }}>
        <div className="container">
          <div className="row">
            <div className="col-xl-7 col-lg-8 m-auto">
              <div className="banner__slider"><div className="banner__slider-wrapper"><div className="banner__item">
                <div className="banner__text">
                  <span>The Chloe Collection</span>
                  <h1>The Project Jacket</h1>
                  <Link to="/shop">Shop now</Link>
                </div>

              </div></div><div className="banner__dots"><span className="banner__dot" data-index="0"></span><span className="banner__dot active" data-index="1"></span><span className="banner__dot" data-index="2"></span></div></div>
            </div>
          </div>
        </div>
      </section>

      {/* TREND BESTSELLER FEATURE SECTION */}
      <section className="trend spad">
        <div className="container">
          <div className="row">
            {trendData.map((section, index) => (
              <div className="col-lg-4 col-md-4 col-sm-6" key={index}>
                <div className="trend__content">
                  <div className="section-title">
                    <h4>{section.title}</h4>
                  </div>

                  {section.items.map((item, i) => (
                    <div className="trend__item" key={i}>
                      <div className="trend__item__pic">
                        <img src={item.image} alt={item.name} />
                      </div>

                      <div className="trend__item__text">
                        <h6>{item.name}</h6>

                        <div className="rating">
                          {[...Array(5)].map((_, starIndex) => (
                            <i
                              key={starIndex}
                              className="pe-3 fa fa-star"
                            ></i>
                          ))}
                        </div>

                        <div className="product__price">
                          ${item.price}.0
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="discount">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 p-0">
              <div className="discount__pic">
                <img src="/images/timing.webp" alt="" />
              </div>
            </div>

            <div className="col-lg-6 p-0">
              <div className="discount__text">
                <div className="discount__text__title">
                  <span>Discount</span>
                  <h2>Summer 2019</h2>
                  <h5><span>Sale</span> 50%</h5>
                </div>

                <div className="discount__countdown" id="countdown-time">
                  <div className="countdown__item">
                    <span id="days">00</span>
                    <p>Days</p>
                  </div>
                  <div className="countdown__item">
                    <span id="hours">00</span>
                    <p>Hour</p>
                  </div>
                  <div className="countdown__item">
                    <span id="minutes">00</span>
                    <p>Min</p>
                  </div>
                  <div className="countdown__item">
                    <span id="seconds">00</span>
                    <p>Sec</p>
                  </div>
                </div>

                <a href="#">Shop now</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="services spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="services__item">
                <i className="fa fa-car"></i>
                <h6>Free Shipping</h6>
                <p>For all oder over $99</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="services__item">
                <i className="fas fa-brain"></i>
                <h6>AI Recommendations</h6>
                <p>Smart product suggestions</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="services__item">
                <i className="fas fa-phone-volume"></i>
                <h6>Online Support 24/7</h6>
                <p>Dedicated support</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="services__item">
                <i className="fa fa-headphones"></i>
                <h6>AI-Powered Search</h6>
                <p>Find exactly what you need</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}

export default Home
