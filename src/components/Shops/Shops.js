import React from 'react'
import PlainModal from '../Modal/PlainModal'
import BarberShopDetail from '../BarberShopDetail/BarberShopDetail'
import { useState } from 'react'

function Shops() {

  const [selectedBarberShop, setSelectedBarberShop] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const barberShops = [
      {
        name: 'Barber Shop 1',
        location: '123 Main St',
        contact: '555-1234',
        services: [
          { name: 'Haircut', price: 20 },
          { name: 'Shave', price: 15 },
          { name: 'Shave', price: 15 },
          { name: 'Shave', price: 15 },
          { name: 'Shave', price: 15 },
          { name: 'Shave', price: 15 },
          { name: 'Shave', price: 15 },
        ],
      },
      // Add more barber shops here...
    ];

    const handleBarberShopSelect = (barberShop) => {
      setSelectedBarberShop(barberShop);
    };
  
    const handleTimeSlotSelect = (service) => {
      setSelectedService(service);
      // Here, you can implement the logic to proceed with the booking.
    };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="mt-5 container">
        <h2 className=''>
          Shops Near You
        </h2>
        <div className="row row-cols-sm-2 row-cols-md-3 mt-3 g-4">
          {
            barberShops.map((shop,index)=>(
              <div key={index} className="col">
              <div className="card">
                <div className="card-body">
                 {shop.name}
                  <button className='btn btn-success' onClick={()=>{
                    handleOpenModal();
                    handleBarberShopSelect(shop)}}  
                    style={{ float: "right" }}>Book Slot</button>
                </div>
              </div>
            </div>
            ))
          }
          <PlainModal isOpen={isModalOpen} onClose={handleCloseModal} body={<BarberShopDetail barberShop={selectedBarberShop}
          onTimeSlotSelect={handleTimeSlotSelect}/>}/>
        </div>
      </div>
  )
}

export default Shops