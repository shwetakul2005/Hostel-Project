import React from 'react';
import { Link } from 'react-router-dom';
import './StudentDashboard.css'; // We'll create this CSS file next
import ViewAnnouncements from '../Warden/ViewAnnouncements.jsx';

function StudentDashboard() {
  return (
    <div className="student-dashboard">
      <div className="announcements-bar">
        <ViewAnnouncements />
      </div>

      <div className="dashboard-grid">
        
        <Link to="/student/nightout-form" className="dashboard-card">
          <h4>Night Out Form</h4>
          <p>Apply for overnight leave and weekend night outs.</p>
        </Link>
        
        <Link to="/student/applications" className="dashboard-card">
          <h4>View Applications</h4>
          <p>Check the status of your pending or past leave applications.</p>
        </Link>
        
        <Link to="/student/order-from-mess" className="dashboard-card">
          <h4>Order from Mess</h4>
          <p>Order special items or extra food from the mess.</p>
        </Link>

      </div>
    </div>
  );
}

export default StudentDashboard;
