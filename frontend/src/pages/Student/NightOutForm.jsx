import React from 'react'

function NightOutForm() {
  return (
        <>
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="form-container-wrapper">
                <form className="announcement-form" onSubmit={handleSubmit}>
                    <h2>Submit a New Application</h2>
                    <p className="form-subtitle">Fill the following details to submit an application for Leave Approval.</p>
                    
                    <div className="form-group">
                        <label htmlFor="title">mis</label>
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
export default NightOutForm


