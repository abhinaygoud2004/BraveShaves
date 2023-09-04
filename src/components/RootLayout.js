import React from 'react'
import Navbar from './navbar/Navbar'
import Footer from './footer/Footer'
import Home from './Home/Home'
import { Route, Routes } from 'react-router-dom';
import Login from './Login/Login'
import SignUp from './SignUp/SignUp'
import MyProfile from './myprofile/MyProfile';


function RootLayout() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/myprofile" element={<MyProfile/>}/>
      </Routes>
      <Footer />
    </div>
  )
}

export default RootLayout