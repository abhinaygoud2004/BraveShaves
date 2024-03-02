import React, { useState, useEffect } from "react";
import "./MyProfile.css";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../redux/actions/userAction";
import { getAllBarbers } from "../../redux/actions/barberAction";
import { fetchAppointments } from "../../redux/actions/bookingActions";

function MyProfile() {
  const dispatch = useDispatch();
  const appointments = useSelector((state) => state.booking.appointments);
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [previousBookings, setPreviousBookings] = useState([]);
  const [missedBookings, setMissedBookings] = useState([]);
  const userId = useSelector((state) => state.auth.userId);
  const barberData = useSelector((state) => state.barber.barberData);

  const getBarberNameById = (barberId) => {
    // Check if barberData is an array
    if (Array.isArray(barberData)) {
      const foundBarber = barberData.find((barber) => barber.barberId === barberId);
      return foundBarber ? foundBarber.barberName : "Unknown Barber";
    } else {
      return "Unknown Barber";
    }
  };
  

  useEffect(() => {
    dispatch(fetchAppointments(userId));
    dispatch(getUserData(userId));
    dispatch(getAllBarbers());
  }, [barberData]);

  useEffect(() => {
    const currentDateTime = new Date();
    const missed = appointments?.filter(
      (booking) =>
        booking.status === "pending" &&
        new Date(booking.appointment_date) < currentDateTime
    );

    // Filter previous bookings with a booked date less than the current date
    const previous = appointments?.filter(
      (booking) =>
        booking.status === "finished" &&
        new Date(booking.appointment_date) < currentDateTime
    );

    // Filter upcoming bookings with a booked date greater than or equal to the current date
    const upcoming = appointments?.filter(
      (booking) =>
        booking.status === "pending" &&
        new Date(booking.appointment_date) >= currentDateTime
    );

    // Set the state variables accordingly
    setUpcomingBookings(upcoming);
    setPreviousBookings(previous);
    setMissedBookings(missed);
  }, [appointments]);

  const userData = useSelector((state) => state.user.userData);

  return (
    <div className="container head">
      <h2 className="display-5 mb-4">My Profile</h2>
      <div className="mb-4">
        <h3 className="mb-2">Personal Information</h3>
        <div className="card p-3">
          <p className="mb-2">Name: {userData?.username}</p>
          <p className="mb-2">Email: {userData?.email}</p>
        </div>
      </div>

      <h3 className="mb-2">Upcoming Bookings</h3>
      {upcomingBookings?.length > 0 ? (
        <ul className="list-group">
          {upcomingBookings?.map((booking) => (
            <li key={booking?.barber_id} className="list-group-item">
              <h6>Shop Name:{getBarberNameById(booking.barber_id)}</h6>
              <h6>Services:</h6>
              <ul>
                {booking?.services?.map((service, index) => (
                  <li key={index}>{service.name}</li>
                ))}
              </ul>
              <p>
                Date: {new Date(booking?.appointment_date).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No upcoming bookings found.</p>
      )}

      <h3 className="mb-2">Missed Bookings</h3>
      {missedBookings?.length > 0 ? (
        <ul className="list-group">
          {missedBookings?.map((booking) => (
            <li key={booking?.barber_id} className="list-group-item">
              <h6>Shop Name:{getBarberNameById(booking.barber_id)}</h6>
              <h6>Services:</h6>
              <ul>
                {booking?.services?.map((service, index) => (
                  <li key={index}>{service.name}</li>
                ))}
              </ul>
              <p>
                Date: {new Date(booking?.appointment_date).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No missed bookings found.</p>
      )}

      <h3 className="mb-2">Previous Bookings</h3>
      {previousBookings?.length > 0 ? (
        <ul className="list-group">
          {previousBookings?.map((booking) => (
            <li key={booking.barber_id} className="list-group-item">
              <h6>Services:</h6>
              <ul>
                {booking.services?.map((service, index) => (
                  <li key={index}>{service.name}</li>
                ))}
              </ul>
              <p>Date: {new Date(booking.appointment_date).toLocaleString()}</p>
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
