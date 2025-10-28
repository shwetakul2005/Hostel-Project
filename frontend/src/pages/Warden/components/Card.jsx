import React from 'react';
import './Card.css'; 

function Card(props) {
    // Formats a full ISO date string to a simple "Day Month, Year"
    const formatDate = (dateString) => {
        if (!dateString) return "";
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    };

    return (
        <div className="announcement-card-view">
            <div className="card-view-header">
                <h3 className="card-view-title">{props.title}</h3>

                <span className="card-view-author">
                    Posted by: <strong>{props.author || 'Warden'}</strong>
                </span>

            </div>
            <p className="card-view-content">{props.content}</p>
            <div className="card-view-footer">
                <span className="card-view-date">
                    {formatDate(props.date)}
                </span>
            </div>
        </div>
    );
}

export default Card;

