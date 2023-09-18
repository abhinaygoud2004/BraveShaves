import React from 'react'
import { useLocation } from 'react-router-dom';


function BarberProfile(barber) {
  const location = useLocation();
  const { barberId } = location.state || {};
  return (
    <div className='mt-5'>
      <h2 className='display-1'>
        Bbbbbb
        {barberId}
      </h2>
    </div>
  )
}

export default BarberProfile