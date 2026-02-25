// BarberShopDetail.js

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DateTimePicker from "../DateTimePicker/DateTimePicker";
import { getServicesByBarber } from "../../redux/actions/serviceActions";

const BarberShopDetail = ({ barberShop, onTimeSlotSelect }) => {
  const dispatch = useDispatch();
  const { services, loading } = useSelector(
    (state) => state.service
  );


  const [selectedServices, setSelectedServices] = useState([]);
  const [showTimePicker, setShowTimePicker] = useState(false);

  // 🔥 Fetch services for this barber
  useEffect(() => {
    if (barberShop?.barber_id) {
      dispatch(getServicesByBarber(barberShop.barber_id));
    }
  }, [barberShop, dispatch]);

  const handleServiceSelect = (service) => {
    const exists = selectedServices.find(
      (s) => s.id === service.id
    );

    if (exists) {
      setSelectedServices(
        selectedServices.filter((s) => s.id !== service.id)
      );
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const handleTimeSelect = (time) => {
    onTimeSlotSelect(selectedServices, time, barberShop.barber_id);
  };

  if (loading) return <p>Loading services...</p>;

  return (
    <div>
      <h2>{barberShop.shop_name}</h2>
      <p>Address: {barberShop.address}</p>
      <p>
        Timings: {barberShop.open_time} - {barberShop.close_time}
      </p>

      <h3>Services:</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {services?.map((service) => (
          <li key={service.id} style={{ marginBottom: 10 }}>
            <label>
              <input
                type="checkbox"
                onChange={() => handleServiceSelect(service)}
              />
              {service.name} - ₹{service.price} (
              {service.duration_minutes} mins)
            </label>
          </li>
        ))}
      </ul>

      {selectedServices.length > 0 && (
        <button onClick={() => setShowTimePicker(true)}>
          Select Time
        </button>
      )}

      {showTimePicker && (
        <DateTimePicker
          barberId={barberShop.barber_id}
          onTimeSelect={handleTimeSelect}
          onCancel={() => setShowTimePicker(false)}
        />
      )}
    </div>
  );
};

export default BarberShopDetail;