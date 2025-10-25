import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css'; 

import loginBgImage from '../assets/hostel-2.jpeg'; 

function LoginPage() {
    const [loginInfo, setLoginInfo] = useState({
        role: 'student', 
        username: '',
        password: '',
    });
    const navigate = useNavigate();

    // --- Handlers ---
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Login data to be sent:", formData);
        
        try {
            
            toast.success("Login successful! Redirecting...");
            setTimeout(() => navigate('/dashboard'), 2000); // Navigate to dashboard or home

        } catch (error) {
            
            toast.error("Login failed. Please check your credentials.");
        }
    };

    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} />
            
            <div 
                className='login-container' 
                style={{ backgroundImage: `url(${loginBgImage})` }}
            >
                <form className='login-form-box' onSubmit={handleSubmit}>
                    <h1>Welcome Back</h1>
                    <h4 textAlign="center">Please log in to your account.</h4>
                    
                    <div className='form-group'>
                        <label htmlFor="role">Login as</label>
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
                        <label htmlFor="username">Username</label>
                        <input 
                            type="text" 
                            name="username" 
                            id="username" 
                            className='form-control'
                            placeholder='Enter your username'
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className='form-group'>
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            id="password" 
                            className='form-control'
                            placeholder='Enter your password'
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    
                    <button type="submit" className='btn btn-primary w-100'>Login</button>
                    
                    <span className='signup-link'>
                        Don't have an account? <Link to="/signup">Sign Up</Link>
                    </span>
                </form>
            </div>
        </>
    );
}

export default LoginPage;