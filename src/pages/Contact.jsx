import React from 'react'

function Contact() {
    return (
        <>
            <section className="contact spad">
                <div className="container">
                    <div className="row">

                        {/* Left Column */}
                        <div className="col-lg-6 col-md-6">
                            <div className="contact__content">
                                <div className="contact__address">
                                    <h5>CONTACT INFO</h5>
                                    <ul>
                                        <li>
                                            <h6>
                                                <i className="fas fa-map-marker-alt"></i> Address
                                            </h6>
                                            <p>
                                                160 Pennsylvania Ave NW, Washington,
                                                Castle, PA 16101-5161
                                            </p>
                                        </li>

                                        <li>
                                            <h6>
                                                <i className="fas fa-phone-alt"></i> Phone
                                            </h6>
                                            <p>
                                                <span>125-711-811</span> |{" "}
                                                <span>125-668-886</span>
                                            </p>
                                        </li>

                                        <li>
                                            <h6>
                                                <i className="fas fa-headphones"></i> Support
                                            </h6>
                                            <p>Support.photography@gmail.com</p>
                                        </li>
                                    </ul>
                                </div>

                                <div className="contact__form">
                                    <h5>SEND MESSAGE</h5>
                                    <form>
                                        <input type="text" placeholder="Name" />
                                        <input type="text" placeholder="Email" />
                                        <input type="text" placeholder="Website" />
                                        <textarea placeholder="Message"></textarea>

                                        <button
                                            type="submit"
                                            className="site-btn"
                                        >
                                            Send Message
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="col-lg-6 col-md-6">
                            <div className="contact__map">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18..."
                                    width="100%"
                                    height="780"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    title="Google Map"
                                ></iframe>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}

export default Contact