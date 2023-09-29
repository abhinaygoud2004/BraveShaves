import React, { useState, useEffect } from 'react';
import './MyProfile.css'

function MyProfile() {
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    address: '123 Main St',
    phoneNumber: '555-1234',
    // Add more user details here
  });

  const [previousBookings, setPreviousBookings] = useState([
    {
      id: 1,
      serviceName: 'Haircut',
      date: '2023-09-15',
      // Add more booking details here
    },
    {
      id: 2,
      serviceName: 'Shave',
      date: '2023-09-10',
      // Add more booking details here
    },
    // Add more previous bookings here
  ]);

  return (
    <div className="container head">
      <h2 className="display-5 mb-4">My Profile</h2>
      <div className="mb-4">
        <h3 className="mb-2">Personal Information</h3>
        <div className="card p-3">
          <p className="mb-2">Name: {userData.name}</p>
          <p className="mb-2">Email: {userData.email}</p>
          <p className="mb-2">Address: {userData.address}</p>
          <p className="mb-2">Phone Number: {userData.phoneNumber}</p>
          {/* Add more user details as needed */}
        </div>
      </div>

      <h3 className="mb-2">Previous Bookings</h3>
      {previousBookings.length > 0 ? (
        <ul className="list-group">
          {previousBookings.map((booking) => (
            <li key={booking.id} className="list-group-item">
              <p className="mb-2">Booking ID: {booking.id}</p>
              <p className="mb-2">Service: {booking.serviceName}</p>
              <p className="mb-2">Date: {booking.date}</p>
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
