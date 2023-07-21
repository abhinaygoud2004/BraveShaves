import React from 'react'
import Navbar from './navbar/Navbar'
import Footer from './footer/Footer'
import Home from './Home/Home'
import { Route, Routes } from 'react-router-dom';
import Login from './Login/Login'
import SignUp from './SignUp/SignUp'


function RootLayout() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default RootLayout