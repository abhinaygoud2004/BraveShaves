import React from 'react'
import Navbar from './navbar/Navbar'
import Footer from './footer/Footer'
import Home from './Home/Home'
import { Route, Routes } from 'react-router-dom';
import Login from './Login/Login'
import SignUp from './SignUp/SignUp'
import MyProfile from './myprofile/MyProfile';
import BarberProfile from './BarberProfile/BarberProfile';
import Shops from './Shops/Shops';
import PrivateRoute from './PrivateRoute/PrivateRoute';

function RootLayout() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/myprofile"
          element={<PrivateRoute element={<MyProfile />} />}
        />
        <Route
          path="/barber-profile/:barberName"
          element={<PrivateRoute element={<BarberProfile />} />}
        />
        <Route path="/shops" element={<Shops />} />
      </Routes>
      <Footer />
    </div>
  )
}
export default RootLayout