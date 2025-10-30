import React from 'react';
import './Card.css'; 

function Card(props) {
    //to formate the date
    const formatDate = (dateString) => {
        if (!dateString) return "";
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    };
    
    const getStatusBtnClass = (status) => {
        if (status === 'Approved') return 'btn-success'; //bootstrap classes
        if (status === 'Rejected') return 'btn-danger';  
        return 'btn-warning'; 
    };

    const getRemarkBorderClass = (status) => {
        if (status === 'Approved') return 'approved';
        if (status === 'Rejected') return 'rejected';
        return 'pending';
    }
    
    const statusBtnClass = getStatusBtnClass(props.status);
    const remarkBorderClass = getRemarkBorderClass(props.status);

    return (
        <div className={`application-card ${remarkBorderClass}`}> 
            
            <div className={`status-badge btn ${statusBtnClass}`}>
                {props.status}
            </div>

            <div className="card-header">
                <h3 className="card-title">
                    Leave: {formatDate(props.fromDate)} to {formatDate(props.toDate)}
                </h3>
            </div>
            <div className="card-body">
                <p className="submission-date">
                    Submitted on: {formatDate(props.createdAt)}
                </p>
                
                { props.wardenRemark && (
                    <div className={`warden-remark ${remarkBorderClass}`}>
                        <strong>Warden's Remark:</strong>
                        <p>{props.wardenRemark}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Card;

