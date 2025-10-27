import React from 'react';
import WardenNavbar from './Warden/WardenNavbar';
import StudentNavbar from './Student/StudentNavbar';
import MessNavbar from './Mess/MessNavbar';


function AppNavbar() {
    const role = localStorage.getItem('role');

    switch (role) {
        case 'warden':
            return <WardenNavbar />;
        case 'student':
            return <StudentNavbar />;
        case 'mess':
            return <MessNavbar />;
        default:
            
            return null;
    }
}

export default AppNavbar;