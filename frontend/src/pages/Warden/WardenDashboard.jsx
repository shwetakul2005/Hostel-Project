import React from 'react';
import { Link } from 'react-router-dom';
import './WardenDashboard.css'; // We will create this CSS file next

function WardenDashboard() {
  return (
    <div className="warden-dashboard">
      
      {/* Announcement Bar */}
      <div className="announcements-bar">
        <h3>Important Announcements</h3>
        <p>
          - All students must update their profile information by the end of this week.
        </p>
        <p>
          - Mess timings will be revised from next Monday. Check the log for details.
        </p>
      </div>

      {/* Dashboard Card Grid */}
      <div className="dashboard-grid">
        <Link to="/warden/night-out" className="dashboard-card">
          <h4>Pending Approvals</h4>
          <p>Review and approve/reject night out requests.</p>
        </Link>
        
        <Link to="/warden/add-announcement" className="dashboard-card">
          <h4>Add Announcements</h4>
          <p>Post new announcements for students and staff.</p>
        </Link>
        
        <Link to="/warden/announcement-log" className="dashboard-card">
          <h4>Announcement Log</h4>
          <p>View, edit, or delete past announcements.</p>
        </Link>
        
        <Link to="/warden/order-mess" className="dashboard-card">
          <h4>Order from Mess</h4>
          <p>Place food orders for events or personal use.</p>
        </Link>
      </div>

    </div>
  );
}

export default WardenDashboard;
