import React, { useState } from 'react';
import './PendingApplicationCard.css';

function PendingApplicationCard(props) {
    const [showRemarkInput, setShowRemarkInput] = useState(false); //shows the remark input only when reject button is clicked
    const [wardenRemark, setWardenRemark] = useState('');

    const formatDate = (dateString) => {
        if (!dateString) return "";
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    };

    const handleApprove = () => {
        props.changeStatusAndRemark(props.id, 'Approved', '');
        setShowRemarkInput(false); 
    };

    const handleRejectClick = () => {
        setShowRemarkInput(true); 
    };

    const handleSubmitRejection = () => {
        if (wardenRemark.trim() === "") {
            alert("Please provide a reason for rejection.");
            return;
        }
        props.changeStatusAndRemark(props.id, 'Rejected', wardenRemark);
        setShowRemarkInput(false);
        setWardenRemark('');
    };

    const handleCancelRejection = () => {
        setShowRemarkInput(false);
        setWardenRemark('');
    };

    return (
        <>
            <div className="pending-card">
                <div className="pending-card-header">
                    <h4>{props.name}</h4>
                    <span className="pending-card-room">Room: {props.room}</span>
                </div>

                <div className="pending-card-body">
                    <div className="pending-card-row">
                        <div className="pending-card-item">
                            <strong>Leave Dates:</strong>
                            <p>{formatDate(props.fromDate)} to {formatDate(props.toDate)}</p>
                        </div>
                        <div className="pending-card-item">
                            <strong>MIS / Mobile:</strong>
                            <p>{props.mis} / {props.mobile}</p>
                        </div>
                    </div>
                    
                    <div className="pending-card-row">
                         <div className="pending-card-item">
                            <strong>Parent Name:</strong>
                            <p>{props.parentName}</p>
                        </div>
                        <div className="pending-card-item">
                            <strong>Parent Mobile:</strong>
                            <p>{props.parentMobile}</p>
                        </div>
                    </div>

                    <div className="pending-card-item">
                        <strong>Travel Address:</strong>
                        <p>{props.address}</p>
                    </div>
                </div>

                <div className="pending-card-actions">
                    <button 
                        className="btn-reject" 
                        onClick={handleRejectClick}
                    >
                        Reject
                    </button>
                    <button 
                        className="btn-approve" 
                        onClick={handleApprove}
                    >
                        Approve
                    </button>
                </div>

                {/* Conditionally rendered remark input */}
                {showRemarkInput && (
                    <div className="pending-card-remark">
                        <label htmlFor={`remark-${props.id}`}>Reason for Rejection:</label>
                        <textarea
                            id={`remark-${props.id}`}
                            rows="3"
                            value={wardenRemark}
                            onChange={(e) => setWardenRemark(e.target.value)}
                            placeholder="e.g., Application submitted too late."
                        />
                        <div className="remark-actions">
                            <button className="btn-cancel" onClick={handleCancelRejection}>Cancel</button>
                            <button className="btn-submit-rejection" onClick={handleSubmitRejection}>Submit Rejection</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default PendingApplicationCard;

