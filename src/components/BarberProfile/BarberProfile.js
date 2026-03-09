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

  if (!barberData) return <p className="loading">Loading...</p>;

  return (
    <div className="profile-wrapper">
      <div className="profile-card">

        <div className="avatar">
          {barberData.name?.charAt(0).toUpperCase()}
        </div>

        <h2>{barberData.name}</h2>

        <div className="info">
          <p>
            <span>Email</span>
            {barberData.user.email}
          </p>

          <p>
            <span>Phone</span>
            {barberData.user.phone}
          </p>

          <p>
            <span>Experience</span>
            {barberData.experience_years} years
          </p>

          {barberData.specialties && (
            <p>
              <span>Specialties</span>
              {barberData.specialties.join(", ")}
            </p>
          )}
        </div>

      </div>
    </div>
  );
}

export default BarberProfile;