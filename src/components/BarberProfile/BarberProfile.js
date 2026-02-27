// BarberProfile.js
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBarberById } from "../../redux/actions/barberAction";
import "./BarberProfile.css";


function BarberProfile() {
  const { barberId } = useParams();
  const dispatch = useDispatch();

  const barberData = useSelector(
    (state) => state.barber?.selectedBarber
  );

  useEffect(() => {
    if (barberId) {
      dispatch(getBarberById(barberId));
    }
  }, [dispatch, barberId]);

  if (!barberData) return <p>Loading...</p>;

  return (
    <div className="container">
      <div className="profile-card">
        <h2>{barberData.name}</h2>
        <p>Email: {barberData.email}</p>
        <p>Phone: {barberData.phone}</p>
        <p>Experience: {barberData.experience_years} years</p>
        {barberData.specialties && (
          <p className="specialties">
            Specialties: {barberData.specialties.join(", ")}
          </p>
        )}
      </div>
    </div>
  );
}

export default BarberProfile;