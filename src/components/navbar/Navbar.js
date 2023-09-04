import React from 'react'
import './Navbar.css'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { login, loginRequest, loginSuccess, loginFailure, setIsLogin } from '../../redux/actions/authActions';


function Navbar() {
  const isLogin=useSelector((state)=>state.auth.isLogin)
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
  const dispatch=useDispatch()
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
        {
          !isLogin?
          <li className="nav-item">
          <NavLink className="nav-link" style={({isActive})=>{
           return isActive?activeLink:inActiveLink
          }} to="/login">Login</NavLink>
        </li>:
         <li className="nav-item">
         <NavLink className="nav-link" style={({isActive})=>{
          return isActive?activeLink:inActiveLink
         }} to="/" onClick={()=>{
          localStorage.clear();
          dispatch(setIsLogin(false))
         }}>Logout</NavLink>
       </li>
        }

        {!isLogin&&
         <li className="nav-item">
         <NavLink className="nav-link" style={({isActive})=>{
          return isActive?activeLink:inActiveLink
         }} to="/signup">Signup</NavLink>
       </li>}
       {
        isLogin&&
        <li className='nav-item'>
          <NavLink className="nav-link" style={({isActive})=>{
            return isActive?activeLink:inActiveLink
          }} to="/myprofile">
            <svg width="30px" height="30px" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.4" d="M12.1207 12.78C12.0507 12.77 11.9607 12.77 11.8807 12.78C10.1207 12.72 8.7207 11.28 8.7207 9.50998C8.7207 7.69998 10.1807 6.22998 12.0007 6.22998C13.8107 6.22998 15.2807 7.69998 15.2807 9.50998C15.2707 11.28 13.8807 12.72 12.1207 12.78Z" stroke="#d3ab5e" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path opacity="0.34" d="M18.7398 19.3801C16.9598 21.0101 14.5998 22.0001 11.9998 22.0001C9.39977 22.0001 7.03977 21.0101 5.25977 19.3801C5.35977 18.4401 5.95977 17.5201 7.02977 16.8001C9.76977 14.9801 14.2498 14.9801 16.9698 16.8001C18.0398 17.5201 18.6398 18.4401 18.7398 19.3801Z" stroke="#d3ab5e" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#d3ab5e" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
          </NavLink>
        </li>
       }
        
      </ul>
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar