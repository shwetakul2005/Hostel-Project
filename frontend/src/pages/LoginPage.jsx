import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css'; 

import loginBgImage from '../assets/hostel-2.jpeg'; 
import { handleError } from './utils';

function LoginPage() {
    const [loginInfo, setLoginInfo] = useState({
        username: '',
        password: '',
    });
    const navigate = useNavigate();

    // --- Handlers ---
    const handleChange = (e) => {
        const { name, value } = e.target;
        // console.log(name, value);
        const copyLoginInfo={...loginInfo};
        copyLoginInfo[name]=value;

        setLoginInfo(copyLoginInfo);
    };
    console.log("Login Info -", loginInfo);

    const handleLogin = async (e) => {
        e.preventDefault();
        const {username, password}=loginInfo;
        console.log("Login data to be sent:", loginInfo);
        if(!username || !password){
            return handleError("All fields are required.");
        }
        try {       
            const url="http://localhost:8080/auth/login";     
            const response=await fetch(url, {
                method:"POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginInfo)
            });
            const result=await response.json();
            console.log(result);
            const {success, message, jwtToken, name, role, error}=result;
            if(success){
                toast.success("Login successful! Redirecting...");
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
                if(role=='student'){
                    setTimeout(() => navigate('/student/dashboard'), 2000); // Navigate to dashboard
                }
                else if(role=='warden'){
                    setTimeout(() => navigate('/warden/dashboard'), 2000); // Navigate to dashboard
                }
                else if(role=='mess'){
                    setTimeout(() => navigate('/mess/dashboard'), 2000); // Navigate to dashboard
                }
                
            }
           else {
            let errorMessage = "An unknown error occurred.";

            // Check if it's a Joi validation error
            if (error && error.details && error.details.length > 0) {
                errorMessage = error.details[0].message;
            
            // Check if it's a standard logical error
            } else if (message) {
                errorMessage = message;
            }
            // Show the error
            handleError(errorMessage); 

            // If the user doesn't exist, redirect
            if (errorMessage === "User doesn't exist, please signup.") {
                setTimeout(() => navigate('/signup'), 2000);
            }
        }
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
                <form className='login-form-box' onSubmit={handleLogin}>
                    <h1>Welcome Back</h1>
                    <h4 textAlign="center">Please log in to your account.</h4>

                    <div className='form-group'>
                        <label htmlFor="username">Username</label>
                        <input 
                            type="text" 
                            name="username" 
                            id="username" 
                            className='form-control'
                            placeholder='Enter your username'
                            value={loginInfo.username}
                            onChange={handleChange}
                            //removed 'required' because we want to see the server-side validation 
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
                            value={loginInfo.password}
                            onChange={handleChange}
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