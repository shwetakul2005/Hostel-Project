import React from 'react';
import './CardLog.css'; 

function CardLog(props) {
    
    const formatDate = (dateString) => {
        if (!dateString) return "";
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    };
    
    const modifyContent = (content) => {
        if (!content) return "";
        const maxLength = 100; 
        
        if (content.length > maxLength) {
            let newStr = content.substring(0, maxLength) + '...';
            return newStr;
        }
        return content;
    }

    const isOnline = props.status === 'online';
    const statusBtnClass = isOnline ? 'status-btn online' : 'status-btn offline';
    const statusBtnText = isOnline ? 'Online' : 'Offline';

    const handleStatusClick = () => {
        const newStatus = isOnline ? 'offline' : 'online';
        // Call the function passed from the parent
        props.onStatusToggle(props.id, newStatus);
    };

    
    const handleDeleteClick = () => {
        // Call the function passed from the parent
        props.onDelete(props.id, props.title);
    };

    return (
        <div className="ann-card-log">
            <div className="card-log-header">
                <h3 className="card-log-title">{props.title}</h3>
                
                <div className="card-log-controls">
                    <button 
                        className={statusBtnClass}
                        onClick={handleStatusClick}
                    >
                        {statusBtnText}
                    </button>
                    <button 
                        className="delete-btn"
                        onClick={handleDeleteClick}
                    >
                        Delete
                    </button>
                </div>
            </div>
            
            <p className="card-log-content">{modifyContent(props.content)}</p>
            
            <div className="card-log-footer">
                <span className="card-log-author">
                    Posted by: <strong>{props.author || 'Warden'}</strong>
                </span>
                <span className="card-log-date">
                    {formatDate(props.date)}
                </span>
            </div>
        </div>
    );
}

export default CardLog;
