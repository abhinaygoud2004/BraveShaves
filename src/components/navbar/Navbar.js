import React from 'react'
import './Navbar.css'
import { NavLink } from 'react-router-dom'

function Navbar() {
  let activeLink={
    color:"#beafb5",
    fontSize:"20px",
    fontWeight:"bold"
  }
  let inActiveLink={
    color:"#d3ac5e",
    fontSize:"18px",
    fontWeight:"semi-bold"
  }
  return (
    <div>
        <nav className="navbar navbar-expand-lg ">
  <div className="container-fluid ms-5">
    <NavLink className="navbar-brand" style={({isActive})=>{
           return isActive?activeLink:inActiveLink
          }} to="/">Brave Shaves</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="navbar-collapse collapse navRight" id="navbarNavDropdown">
      <ul className="navbar-nav ms-5 gap-5">
        <li className="nav-item">
          <NavLink className="nav-link active " style={({isActive})=>{
           return isActive?activeLink:inActiveLink
          }
          } aria-current="page" to="/">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" style={({isActive})=>{
           return isActive?activeLink:inActiveLink
          }} to="/login">Login</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" style={({isActive})=>{
           return isActive?activeLink:inActiveLink
          }} to="/signup">Signup</NavLink>
        </li>
      </ul>
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar