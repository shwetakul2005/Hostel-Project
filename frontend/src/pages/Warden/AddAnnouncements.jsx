import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AddAnnouncements.css';
import { handleError, handleSuccess } from '../utils'; 

function AddAnnouncement() {
    const [AnnouncementData, setAnnouncementData] = useState({
        title: '',
        content: '',
        expiryDate: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // Get today's date in YYYY-MM-DD format for the min date
    const today = new Date().toISOString().split('T')[0];

    const handleChange = (e) => {
        const { name, value } = e.target;
        const copyAnnouncementData={...AnnouncementData};
        copyAnnouncementData[name]=value;
        setAnnouncementData(copyAnnouncementData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        let { title, content, expiryDate } = AnnouncementData;
        console.log("Submitting:", AnnouncementData);

        if (!title || !content) {
            setIsLoading(false); 
            return handleError("Title and content are required.");
        }

        try {
           
            const token = localStorage.getItem('token');
            if (!token) {
                setIsLoading(false);
                handleError("Authentication error. Please log in again.");
                return navigate('/login');
            }

            const url = "http://localhost:8080/api/add-announcements";
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    title,
                    content,
                    expiryDate: expiryDate || null 
                })
            });

            const result = await response.json();
            const { success, message, error } = result;

            if (success) {
                handleSuccess(message || "Announcement posted successfully!");
                setAnnouncementData({
                    title: '',
                    content: '',
                    expiryDate: '',
                });
                setTimeout(() => navigate('/warden/dashboard'), 2000);
            } else if (error) {
                const details = error?.details[0]?.message;
                handleError(details || "An error occurred.");
            } else if (!success) {
                handleError(message || "An error occurred.");
            }
            console.log("Server Response:", result);

        } catch (error) {
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
                    <h2>Post a New Announcement</h2>
                    <p className="form-subtitle">This announcement will be visible to all students.</p>
                    
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={AnnouncementData.title}
                            onChange={handleChange}
                            placeholder="Enter title..."
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="content">Content</label>
                        <textarea
                            id="content"
                            name="content"
                            value={AnnouncementData.content}
                            onChange={handleChange}
                            rows="6"
                            placeholder="Write the full details of the announcement here..."
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="expiryDate">Active Until (Optional)</label>
                        <input
                            type="date"
                            id="expiryDate"
                            name="expiryDate"
                            value={AnnouncementData.expiryDate}
                            onChange={handleChange}
                            min={today} 
                        />
                        <small>The announcement will be hidden after this date. Leave blank to keep it active indefinitely.</small>
                    </div>
                    
                    <button type="submit" className="submit-btn" disabled={isLoading}>
                        {isLoading ? "Posting..." : "Post Announcement"}
                    </button>
                </form>
            </div>
        </>
    );
}

export default AddAnnouncement;
