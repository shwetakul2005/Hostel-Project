import { useState } from 'react'
import './App.css'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import LandingPage from './pages/LandingPage'
import { Navigate, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/home"/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/signup" element={<SignupPage/>}/>
          <Route path="/home" element={<LandingPage/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App
