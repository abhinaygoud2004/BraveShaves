import React, { useState, useEffect } from 'react';
import './MyProfile.css'
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from '../../redux/actions/userAction';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { fetchAppointments } from '../../redux/actions/bookingActions';

function MyProfile() {
  const dispatch = useDispatch();
  const appointments=useSelector((state)=>state.booking.appointments);
  const [previousBookings, setPreviousBookings] = useState([]);
  console.log("appo is ",appointments,previousBookings.length)
  const userId=useSelector((state)=>state.auth.userId);
  useEffect(()=>{
   dispatch(fetchAppointments(userId))
   dispatch(getUserData(userId))
  },[])
  useEffect(() => {
    setPreviousBookings(appointments);
  }, [appointments]);
  
  
  const userData=useSelector((state)=>state.user.userData)

  return (
    <div className="container head">
      <h2 className="display-5 mb-4">My Profile</h2>
      <div className="mb-4">
        <h3 className="mb-2">Personal Information</h3>
        <div className="card p-3">
          <p className="mb-2">Name: {userId}</p>
          <p className="mb-2">Email: {userData?.email}</p>
          {/* <p className="mb-2">Address: {userData.address}</p> */}
          {/* <p className="mb-2">Phone Number: {userData.phoneNumber}</p> */}
          {/* Add more user details as needed */}
        </div>
      </div>

      <h3 className="mb-2">Previous Bookings</h3>
      {previousBookings.length > 0 ? (
        <ul className="list-group">
          {previousBookings.map((booking) => (
            <li key={booking.id} className="list-group-item">
              {/* <p className="mb-2">Booking ID: {booking.id}</p> */}
              <p className="mb-2">Services: {booking.services}</p>
              {/* <p className="mb-2">Date: {booking.date}</p> */}
              {/* Add more booking details as needed */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No previous bookings found.</p>
      )}
    </div>
  );
}

export default MyProfile;
