import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './NightOutForm.css'; // Using the new CSS file
import { handleError, handleSuccess } from '../utils'; // Make sure this path is correct


function NightOutForm() {

    const [ApplicationData, setApplicationData] = useState({
        mis: "",
        parentName: "",
        parentMobile: "",
        fromDate: "",
        toDate: "",
        room: "",
        address: ""
    });
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const today = new Date().toISOString().split('T')[0];

    const handleChange = (e) => {
            const { name, value } = e.target;
            const copyApplicationData={...ApplicationData};
            copyApplicationData[name]=value;
            setApplicationData(copyApplicationData);
        };
        //OR we can also use this:
        //setApplicationData(prevData => ({
        //     ...prevData,
        //     [name]: value
        // }));
    
        const handleSubmit = async (e) => {
            e.preventDefault();
            setIsLoading(true);
    
            let {mis, parentName, parentMobile, fromDate, toDate, room, address} = ApplicationData;
            console.log("Submitting:", ApplicationData);
    
            if (!mis || !parentName || !parentMobile || !fromDate || !toDate || !room || !address) {
                setIsLoading(false); 
                return handleError("All fields are required.");
            }

            if (new Date(fromDate) > new Date(toDate)) {
            setIsLoading(false);
            return handleError("'From' date cannot be after 'To' date.");
            }

            try {
               
                const token = localStorage.getItem('token');
                if (!token) {
                    setIsLoading(false);
                    handleError("Authentication error. Please log in again.");
                    return navigate('/login');
                }
    
                const url = "http://localhost:8080/student/night-out";
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        mis, 
                        parentName,
                        parentMobile,
                        fromDate,
                        toDate,
                        room,
                        address
                    })
                });
    
                const result = await response.json();
                const { success, message, error } = result;
    
                if (success) {
                    handleSuccess(message || "Application submitted successfully!");
                    setApplicationData({
                        mis:"",
                        parentName:"",
                        parentMobile:"",
                        fromDate:"",
                        toDate:"",
                        room:"",
                        address:""
                    });
                    setTimeout(() => navigate('/student/nightout-form'), 2000); 
                } else if (error) {
                    const details = error?.details[0]?.message; //Joi validation error
                    handleError(details || "An error occurred.");
                } else if (!success) {
                    handleError(message || "An error occurred."); //Invalid/Expired Token Error
                    // success is false but the error object is missing or null so 
                }
                // console.log("Server Response:", result);
    
            } catch (error) { //Network Errors
                const errorMsg = error.message || "An unknown error occurred";
                console.error("Announcement could not be created:", errorMsg);
                toast.error("Announcement could not be created. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };

    return (
        <> 
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="form-container-wrapper">
                <form className="announcement-form" onSubmit={handleSubmit}>
                    <h2>Submit a New Application</h2>
                    <p className="form-subtitle">Fill the following details to submit an application for Leave Approval.</p>
                    
                    <div className="form-group">
                        <label htmlFor="mis">Mis</label>
                        <input
                            type="text"
                            id="mis"
                            name="mis"
                            value={ApplicationData.title}
                            onChange={handleChange}
                            placeholder="Enter your MIS number..."
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="fromDate">From</label>
                        <input
                            type="date"
                            id="fromDate"
                            name="fromDate"
                            value={ApplicationData.content}
                            onChange={handleChange}
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="toDate">To</label>
                        <input
                            type="date"
                            id="toDate"
                            name="toDate"
                            value={ApplicationData.expiryDate}
                            onChange={handleChange}
                            min={today} 
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="parentName">Parent's Name</label>
                        <input
                            type="text"
                            id="parentName"
                            name="parentName"
                            value={ApplicationData.parentName}
                            onChange={handleChange}
                            placeholder="Enter your parent's name..."
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="parentMobile">Parent's Mobile No.</label>
                        <input
                            type="tel"
                            id="parentMobile"
                            name="parentMobile"
                            value={ApplicationData.parentMobile}
                            onChange={handleChange}
                            placeholder="Enter your parent's mobile nummber..."
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="room">Room No.</label>
                        <input
                            type="text"
                            id="room"
                            name="room"
                            value={ApplicationData.room}
                            onChange={handleChange}
                            placeholder="Enter your Room no..."
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <textarea
                            id="address"
                            name="address"
                            value={ApplicationData.address}
                            onChange={handleChange}
                            rows="3"
                            placeholder="Enter the complete address that you are travelling to..."
                        />
                    </div>
                    
                    <button type="submit" className="submit-btn" disabled={isLoading}>
                        {isLoading ? "Posting..." : "Post Announcement"}
                    </button>
                </form>
            </div>
        </>
    );
}
export default NightOutForm


