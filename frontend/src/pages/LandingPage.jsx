import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css'; 

import hygiene from '../assets/hygiene.png'; 
import security from '../assets/security.png';
import wifi from '../assets/wifi.png';
import laundry from '../assets/laundry2.png';

import hostelImage1 from '../assets/hostel-1.jpg'; 
import hostelImage2 from '../assets/hostel-2.jpeg';
import hostelImage3 from '../assets/hostel-3.jpeg';
import coepLogo from '../assets/COEP-LOGO.png'

function LandingPage() {

    return (
        <div className='landing-page'>

            <nav className="navbar-landing">
                <div className="navbar-container">
                    <Link to="/" className="navbar-logo">
                        <img className='coep-logo' src={coepLogo} />   COEP Girls Hostel
                    </Link>
                    <ul className="navbar-menu">
                        <li className="navbar-item">
                          <a href="#amenities" className="navbar-link">About Us</a>
                        </li>
                        <li className="navbar-item">
                            <Link to="/contact" className="navbar-link">Contact</Link>
                        </li>
                    </ul>
                    <div className="navbar-buttons">
                        <Link to="/login" className="btn btn-primary btn-lg">
                            Login
                        </Link>
                        <Link to="/signup" className="btn btn-primary btn-lg">
                            Register
                        </Link>
                    </div>
                </div>
            </nav>

            <div className='landing-carousel-half'>
                <div id="hostelCarousel" className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="3000">
                    
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#hostelCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#hostelCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#hostelCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src={hostelImage1} className="d-block w-100" alt="Hostel Room" />
                            <div className="text-car carousel-caption d-none d-md-block">
                                <h4>Comfortable Living</h4>
                                <p>"It feels like a home away from home, the staff is very sweet."</p>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img src={hostelImage2} className="d-block w-100" alt="Hostel Mess Hall" />
                            <div className="text-car carousel-caption d-none d-md-block">
                                <h4>Hygienic Mess</h4>
                                <p>"The meals are truly nutritious and delicious. No complaints"</p>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img src={hostelImage3} className="d-block w-100" alt="Hostel Common Area" />
                            <div className="text-car carousel-caption d-none d-md-block">
                                <h4>Vibrant Community</h4>
                                <p>"The place where my best memories were made"</p>
                            </div>
                        </div>
                    </div>
                    
                    <button className="carousel-control-prev" type="button" data-bs-target="#hostelCarousel" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#hostelCarousel" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>

            <section id="amenities" className="amenities-section">
                <div className="container">
                    <h2 className="section-title">Amenities & Services</h2>
                    <p className="section-subtitle">We provide the best-in-class facilities to ensure a comfortable stay.</p>
                    <div className="amenities-grid">
                        <div className="amenity-card">
                            <div className="amenity-icon"><img src={hygiene}/></div>
                            <h3>Hygienic Mess</h3>
                            <p>Delicious and nutritious meals served 4 times a day, prepared in a clean environment.</p>
                        </div>
                        <div className="amenity-card">
                            <div className="amenity-icon"><img src={wifi}/></div>
                            <h3>High-Speed Wi-Fi</h3>
                            <p>Blazing fast internet access across the entire campus, 24/7, for study and leisure.</p>
                        </div>
                        <div className="amenity-card">
                            <div className="amenity-icon"><img src={security}/></div>
                            <h3>24/7 Security</h3>
                            <p>Your safety is our priority, with round-the-clock security personnel and CCTV surveillance.</p>
                        </div>
                        <div className="amenity-card">
                            <div className="amenity-icon"><img src={laundry}/></div>
                            <h3>Laundry Service</h3>
                            <p>On-site laundry and ironing services available to keep you looking sharp.</p>
                        </div>
                    </div>
                </div>
            </section>


            <section className="location-section">
                <div className="container location-container">

                    <div className="map-container">
                        <iframe /* Embedding of the map*/
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.999213785443!2d73.8493934733515!3d18.52893766892224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c07d671871f3%3A0xe8e5ad047c969c03!2sCOEP%20Girls%20Hostel%20Building%2C%20Shivajinagar%2C%20Pune%2C%20Maharashtra%20411005!5e0!3m2!1sen!2sin!4v1761341911868!5m2!1sen!2sin" 
                            width="600" 
                            height="450" 
                            style={{ border: 0 }} 
                            allowFullScreen="" 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Hostel Location"
                        ></iframe>
                    </div>
                    <div className="visit-us-box">
                        <h2>Come Visit Us!</h2>
                        <p>
                            We are conveniently located in the heart of the city,
                            just minutes away from the main campus. We are ~ <br />
                            <li>2 minutes from the Railway Station</li>
                            <li>15 minutes from the Airport</li>
                            <hr />
                        </p>
                        <p className="address">
                            <strong>COEP Girls Hostel</strong><br />
                            Shivajinagar, Pune, <br />
                            Maharashtra 411005
                        </p>
                        <Link to="https://www.google.com/maps/place/COEP+Girls+Hostel+Building,+Shivajinagar,+Pune,+Maharashtra+411005/@18.5289377,73.8493935,17z/data=!3m1!4b1!4m6!3m5!1s0x3bc2c07d671871f3:0xe8e5ad047c969c03!8m2!3d18.5289326!4d73.8519684!16s%2Fg%2F11wb1vngj7?entry=ttu&g_ep=EgoyMDI1MTAyOC4wIKXMDSoASAFQAw%3D%3D" 
                        className="btn btn-primary btn-lg">Get Directions</Link>
                    </div>
                </div>
            </section>


            <footer className="footer-landing">
                <div className="container">
                    <p>&copy; 2025 HostelHub. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
}

export default LandingPage;
