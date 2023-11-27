// BarberShopDetail.js
import React, { useState } from 'react';
import DateTimePicker from '../DateTimePicker/DateTimePicker';

const BarberShopDetail = ({ barberShop, onTimeSlotSelect }) => {
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleServiceSelect = (service) => {
    // Check if the service is already selected, and toggle its selection accordingly.
    // if (selectedServices.includes(service)) {
    //   setSelectedServices(selectedServices.filter((s) => s !== service));
    // } else {
    //   setSelectedServices([...selectedServices, service]);
    // }
    setSelectedServices([...selectedServices, service]);
  };

  const handleTimeSelect = (selectedTime) => {
    // Pass the selected services and time to a parent component for availability checking.
    onTimeSlotSelect(selectedServices, selectedTime,barberShop.barberId);
    setSelectedTime(selectedTime);
    // Close the time picker after selecting a time.
    // setShowTimePicker(false);
  };

  return (
    <div>
      <h2>{barberShop.name}</h2>
      <p>Location: {barberShop.location}</p>
      <p>Contact: {barberShop.contact}</p>

      <h3>Services Offered:</h3>
      <ul
        style={{
          listStyleType: 'none',
          paddingLeft: 0,
          maxHeight: '200px', // Set a maximum height for the list
          overflowY: barberShop.services.length > 5 ? 'scroll' : 'auto', // Add scrollbar if there are more than 5 services
        }}
      >
        {barberShop.services.map((service, index) => (
          <li key={index} style={{ marginBottom: '10px' }}>
            <label style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="checkbox"
                checked={selectedServices.includes(service)}
                onChange={() => handleServiceSelect(service)}
                style={{ marginRight: '5px' }}
              />
              {service.name} - ${service.price}
            </label>
          </li>
        ))}
      </ul>

      {selectedServices.length > 0 && (
        <div>
          <button className="button" onClick={() => setShowTimePicker(true)}>
            Select Time
          </button>
          {showTimePicker && (
            <DateTimePicker
              onTimeSelect={handleTimeSelect}
              onCancel={() => setShowTimePicker(false)}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default BarberShopDetail;
