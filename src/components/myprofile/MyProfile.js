// MyProfile.js

import React, { useEffect, useState } from "react";
import "./MyProfile.css";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../redux/actions/userAction";
import { getUserAppointments } from "../../redux/actions/appointmentActions";
import { getAllBarbers } from "../../redux/actions/barberAction";
import { Link } from "react-router-dom";


function MyProfile() {
  const dispatch = useDispatch();

  // ✅ New Redux states
  const appointmentState = useSelector(
    (state) => state.appointment
  );

  const appointments = appointmentState?.appointments || [];

  const userData = useSelector(
    (state) => state.user?.userData
  );

  const barberData = useSelector(
    (state) => state.barber?.barberData
  );

  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [previousBookings, setPreviousBookings] = useState([]);
  const [missedBookings, setMissedBookings] = useState([]);

  const userId = useSelector(
    (state) => Number(state.auth?.userId)
  );
 
  // 🔹 Fetch Data
  useEffect(() => {
    if (userId) {
      dispatch(getUserAppointments());
      dispatch(getUserData());
      dispatch(getAllBarbers());
    }
  }, [dispatch, userId]);


  // 🔹 Categorize Bookings
  useEffect(() => {
    console.log("appointments in profile",appointmentState.appointments)

    const now = new Date();

    const upcoming = [];
    const previous = [];
    const missed = [];

    appointments.forEach((booking) => {
      const startTime = new Date(booking.start_time);

      if (booking.status === "CONFIRMED" && startTime >= now) {
        upcoming.push(booking);
      } else if (
        booking.status === "CONFIRMED" &&
        startTime < now
      ) {
        missed.push(booking);
      } else if (booking.status === "COMPLETED") {
        previous.push(booking);
      }
    });

    setUpcomingBookings(upcoming);
    setPreviousBookings(previous);
    setMissedBookings(missed);
  }, [appointments]);

  const barberMap = React.useMemo(() => {
    if (!Array.isArray(barberData)) return {};
  
    return barberData.reduce((acc, barber) => {
      acc[barber.id] = barber.name; // use barber_id if aliased
      return acc;
    }, {});
  }, [barberData]);


  return (
    <div className="container head">
      <h2 className="display-5 mb-4">My Profile</h2>

      {/* Personal Info */}
      <div className="mb-4">
        <h3 className="mb-2">Personal Information</h3>
        <div className="card p-3">
          <p>Name: {userData?.name}</p>
          <p>Email: {userData?.email}</p>
        </div>
      </div>

      {/* Upcoming */}
      <BookingSection
        title="Upcoming Bookings"
        bookings={upcomingBookings}
        barberMap={barberMap}
      />

      {/* Missed */}
      <BookingSection
        title="Missed Bookings"
        bookings={missedBookings}
        barberMap={barberMap}
      />

      {/* Previous */}
      <BookingSection
        title="Previous Bookings"
        bookings={previousBookings}
        barberMap={barberMap}
      />
    </div>
  );
}

// 🔥 Reusable Component
function BookingSection({ title, bookings ,barberMap}) {
  return (
    <>
      <h3 className="mb-2">{title}</h3>
      {bookings.length > 0 ? (
        <ul className="list-group mb-4">
          {bookings.map((booking) => (
            <li key={booking.id} className="list-group-item">
            <h6>
              Barber:{" "}
              {booking.barber_id ? (
                <Link to={`/barber/${booking.barber_id}`}>
                  {barberMap[booking.barber_id] || "Unknown Barber"}
                </Link>
              ) : (
                "Unknown Barber"
              )}
            </h6>

              {/* Services */}
              <h6>Services:</h6>
              <ul>
                {booking.services?.map((service) => (
                  <li key={service.id}>
                    {service.name} (₹{service.price})
                  </li>
                ))}
              </ul>

              <p>
                Date:{" "}
                {new Date(
                  booking.start_time
                ).toLocaleString()}
              </p>

              <p>Status: {booking.status}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookings found.</p>
      )}
    </>
  );
}

export default MyProfile;