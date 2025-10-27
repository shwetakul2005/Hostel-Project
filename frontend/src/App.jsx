
import { useState } from 'react'
import './App.css'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import LandingPage from './pages/LandingPage'
import { Navigate, Route, Routes, Outlet } from 'react-router-dom' // Import Outlet
import StudentDashboard from './pages/Student/StudentDashboard'
import MessDashboard from './pages/Mess/MessDashboard'
import WardenDashboard from './pages/Warden/WardenDashboard'
import AppNavbar from './pages/AppNavbar'
import AddAnnouncement from './pages/Warden/AddAnnouncements'

// 1. Create a layout for pages that NEED the AppNavbar
function ProtectedLayout() {
  return (
    <>
      <AppNavbar />
      <main className="app-content">
        <Outlet /> {/* This will render the matched child route (e.g., WardenDashboard) */}
      </main>
    </>
  );
}

// 2. Create a layout for pages that DON'T need any navbar
// (like login/signup) or have their own (like LandingPage)
function PublicLayout() {
  return (
    <main className="app-content">
      <Outlet />
    </main>
  );
}

function App() {

  return (
    <>
      {/* 3. Remove the global <AppNavbar/> from here */}
      <div className="App">
        <Routes>
          {/* Routes WITHOUT the AppNavbar */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/home" element={<LandingPage />} />
          </Route>

          {/* Routes WITH the AppNavbar */}
          <Route element={<ProtectedLayout />}>
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="/warden/dashboard" element={<WardenDashboard />} />
            <Route path="/mess/dashboard" element={<MessDashboard />} />

            <Route path="/warden/add-announcements" element={<AddAnnouncement/>} />
            
            {/* Add all your other protected routes here 
              (e.g., the ones from your navbar):
            */}
            {/* <Route path="/warden/night-out" element={<YourNightOutPage />} /> */}
            {/* <Route path="/warden/add-announcement" element={<YourAddAnnouncementPage />} /> */}
            {/* <Route path="/warden/announcement-log" element={<YourAnnLogPage />} /> */}
            {/* <Route path="/warden/order-mess" element={<YourOrderMessPage />} /> */}
          </Route>

        </Routes>
      </div>
    </>
  )
}

export default App