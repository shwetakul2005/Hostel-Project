import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import './Signup.css'; 


import hostelImage1 from '../assets/hostel-1.jpg'; 
import hostelImage2 from '../assets/hostel-2.jpeg';
import hostelImage3 from '../assets/hostel-3.jpeg';

function SignupPage() {
    //Form state
    const [formData, setFormData] = useState({
        role: 'student',
        name: '',
        username: '',
        email: '',
        mobile: '',
        password: '',
    });
    const navigate = useNavigate();

    // Handlers
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form data to be sent:", formData);
        
        try {
            
            toast.success("Signup successful! Please log in.");
            setTimeout(() => navigate('/login'), 2000);

        } catch (error) {
            const errorMsg = error.response?.data?.message || error.message;
            console.error("Signup failed:", errorMsg);
            toast.error("Signup failed. Please try again.");
        }
    };

    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} />
            
            <div className='signup-container'>
                
                {/* --- 1. CAROUSEL HALF (Left) --- */}
                <div className='signup-carousel-half'>
                    <div id="hostelCarousel" className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="2000">
                        
                        {/* Indicators (Bottom dots) */}
                        <div className="carousel-indicators">
                            <button type="button" data-bs-target="#hostelCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#hostelCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#hostelCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        </div>
                        
                        {/* Slides (Images and Captions) */}
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img src={hostelImage1} className="d-block w-100" alt="Hostel Room" />
                                <div className="text-car carousel-caption d-none d-md-block">
                                        <h4>Comfortable Living</h4>
                                        <p>" It feels like a home away from home, the staff is very sweet."</p>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <img src={hostelImage2} className="d-block w-100" alt="Hostel Mess Hall" />
                                <div className="text-car carousel-caption d-none d-md-block">
                                    <h4>Hygienic Mess</h4>
                                    <p>"The meals are truly nutritious and delicious. No complaints "</p>
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
                        
                        {/* Controls (Left/Right Arrows) */}
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

                {/* --- 2. FORM HALF (Right) --- */}
                <div className='signup-form-half'>
                    <form className='signup-form' onSubmit={handleSubmit}>
                        <h1>Please sign up to continue</h1>
                        
                        <div className='form-group'>
                            <label htmlFor="role">Sign up as...</label>
                            <select 
                                name="role" 
                                id="role" 
                                className='form-control'
                                value={formData.role}
                                onChange={handleChange}
                            >
                                <option value="student">Student</option>
                                <option value="warden">Warden</option>
                                <option value="mess">Mess</option>
                            </select>
                        </div>

                        <div className='form-group'>
                            <label htmlFor="name">Name</label>
                            <input 
                                type="text" 
                                name="name" 
                                id="name" 
                                className='form-control'
                                placeholder='Enter Your Name'
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className='form-group'>
                            <label htmlFor="username">Username</label>
                            <input 
                                type="text" 
                                name="username" 
                                id="username" 
                                className='form-control'
                                placeholder='Enter Your Username'
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className='form-group'>
                            <label htmlFor="email">Email ID</label>
                            <input 
                                type="email" 
                                name="email" 
                                id="email" 
                                className='form-control'
                                placeholder='Enter Email Address'
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className='form-group'>
                            <label htmlFor="mobile">Mobile Number</label>
                            <input 
                                type="tel" // 'tel' is better for mobile numbers
                                name="mobile" 
                                id="mobile" 
                                className='form-control'
                                placeholder='Enter Mobile No.'
                                value={formData.mobile}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className='form-group'>
                            <label htmlFor="password">Password</label>
                            <input 
                                type="password" // Use 'password' type
                                name="password" 
                                id="password" 
                                className='form-control'
                                placeholder='Enter Password'
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        
                        <button type="submit" className='btn btn-primary w-100'>Sign Up</button>
                        
                        <span className='login-link'>
                            Already have an account? <Link to="/login">Login</Link>
                        </span>
                    </form>
                </div>

            </div>
        </>
    );
}

export default SignupPage;