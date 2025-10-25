import { useState } from 'react'
import './App.css'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import LandingPage from './pages/LandingPage'
import { Navigate, Route, Routes } from 'react-router-dom'
import StudentDashboard from './pages/Student/StudentDashboard'
import MessDashboard from './pages/Mess/MessDashboard'
import WardenDashboard from './pages/Warden/WardenDashboard'

function App() {

  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/home"/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/signup" element={<SignupPage/>}/>
          <Route path="/home" element={<LandingPage/>}/>
          <Route path="/home" element={<LandingPage/>}/>  
          <Route path="/student/dashboard" element={<StudentDashboard/>}/>
          <Route path="/warden/dashboard" element={<WardenDashboard/>}/>
          <Route path="/mess/dashboard" element={<MessDashboard/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App
