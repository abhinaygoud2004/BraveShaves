import React, { useState } from 'react';
import PlainModal from '../Modal/PlainModal';
import BarberShopDetail from '../BarberShopDetail/BarberShopDetail';
import {FaAngleUp} from 'react-icons/fa'
import {FaAngleDown} from 'react-icons/fa'
import { NavLink, useNavigate } from 'react-router-dom';
import { FaStar, FaStarHalfAlt,FaRegStar } from 'react-icons/fa';
import { useSelector } from 'react-redux';


function Shops() {
  const isLogin = useSelector((state) => state.auth.isLogin);
  const navigate=useNavigate();
  const [selectedBarberShop, setSelectedBarberShop] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAllShops, setShowAllShops] = useState(false);

  let generateStarRating=(rating)=>{
    const maxRating = 5;
    const starRating = [];
    const roundedRating = Math.round(rating * 2) / 2; // Round to the nearest half star
  
    for (let i = 1; i <= maxRating; i++) {
      if (i <= roundedRating) {
        starRating.push(<FaStar  key={i} />);
      } else if (i === roundedRating + 0.5) {
        starRating.push(<FaStarHalfAlt  key={i} />);
      } else {
        starRating.push(<FaRegStar  key={i}  />);
      }
    }
  
    return starRating;
  }  

  let handleBarberShopSelect = (barberShop) => {
    if(!isLogin){
      navigate('/login');
    }
    setSelectedBarberShop(barberShop);
    setIsModalOpen(true);
  };

  const barberShops = [ {barberId:'1',barberName:"xyz", name: 'Barber Shop 1',rating:4.7, location: '123 Main St', contact: '555-1234', services: [ { name: 'Haircut', price: 20 }, { name: 'Shave', price: 15 }, { name: 'Shave', price: 15 }, { name: 'Shave', price: 15 }, { name: 'Shave', price: 15 }, { name: 'Shave', price: 15 }, { name: 'Shave', price: 15 }, ], }, 
  {barberId:'2', barberName:"xyz",name: 'Barber Shop 1',rating:4, location: '123 Main St', contact: '555-1234', services: [ { name: 'Haircut', price: 20 }, { name: 'Shave', price: 15 }, { name: 'Shave', price: 15 }, { name: 'Shave', price: 15 }, { name: 'Shave', price: 15 }, { name: 'Shave', price: 15 }, { name: 'Shave', price: 15 }, ], }, 
  {barberId:'3', barberName:"xyz",name: 'Barber Shop 1',rating:4.8, location: '123 Main St', contact: '555-1234', services: [ { name: 'Haircut', price: 20 }, { name: 'Shave', price: 15 }, { name: 'Shave', price: 15 }, { name: 'Shave', price: 15 }, { name: 'Shave', price: 15 }, { name: 'Shave', price: 15 }, { name: 'Shave', price: 15 }, ], }, 
  {barberId:'4', barberName:"xyz",name: 'Barber Shop 1',rating:5, location: '123 Main St', contact: '555-1234', services: [ { name: 'Haircut', price: 20 }, { name: 'Shave', price: 15 }, { name: 'Shave', price: 15 }, { name: 'Shave', price: 15 }, { name: 'Shave', price: 15 }, { name: 'Shave', price: 15 }, { name: 'Shave', price: 15 }, ], }, 
  {barberId:'5', barberName:"xyz",name: 'Barber Shop 1',rating:3, location: '123 Main St', contact: '555-1234', services: [ { name: 'Haircut', price: 20 }, { name: 'Shave', price: 15 }, { name: 'Shave', price: 15 }, { name: 'Shave', price: 15 }, { name: 'Shave', price: 15 }, { name: 'Shave', price: 15 }, { name: 'Shave', price: 15 }, ], }, 
  {barberId:'6', barberName:"xyz",name: 'Barber Shop 1',rating:3.5, location: '123 Main St', contact: '555-1234', services: [ { name: 'Haircut', price: 20 }, { name: 'Shave', price: 15 }, { name: 'Shave', price: 15 }, { name: 'Shave', price: 15 }, { name: 'Shave', price: 15 }, { name: 'Shave', price: 15 }, { name: 'Shave', price: 15 }, ], }, 
];

  

  const handleTimeSlotSelect = (service) => {
    setSelectedService(service);
    // Implement booking logic here...
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const toggleShowAllShops = () => {
    setShowAllShops(!showAllShops);
  };

  const shopsToDisplay = showAllShops ? barberShops : barberShops.slice(0, 4);

  return (
    <div className="mt-5 container">
      <h2 className="display-5 bold">Shops Near You</h2>
      <div className="row row-cols-sm-3 row-cols-md-4 mt-3 g-2">
        {shopsToDisplay.map((shop, index) => (
          <div key={index} className="col">
            <div className="card">
              <div className="card-body">
                <h3  className="">
                {shop.name}
                </h3>
                <NavLink
                state={{ barberId: shop.barberId }}
                 style={{fontSize:18,fontWeight:"normal",color:"#d3ab5e",
                textDecoration: 'none', color: 'inherit' }} to={`/barber-profile/${shop.barberName}`}>
                    {shop.barberName}
                  </NavLink>
                <div 
                style={{fontSize:14,fontWeight:"bold",color:"#d3ab5e",
                textDecoration: 'none', color: 'inherit' }} >{shop.rating} {generateStarRating(shop.rating)} </div>
                <button
                  className="btn"
                  onClick={() => handleBarberShopSelect(shop)}
                  style={{ float: "right" , fontWeight:"bold",backgroundColor:"#285167",color:"#d3ab5e"}}
                >
                  Book Slot
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {barberShops.length > 4 && (
        <div className="mt-3">
          <button
            style={{display:"block",margin:'auto'}}
            className="btn"
            onClick={toggleShowAllShops}
          >
            {showAllShops ?  <FaAngleUp fontSize={40}  style={{color:"#285067"}}/> : <FaAngleDown fontSize={40}  style={{color:"#285067"}}/> }
          </button>
        </div>
      )}
      {isModalOpen && (
        <PlainModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          body={<BarberShopDetail barberShop={selectedBarberShop} onTimeSlotSelect={handleTimeSlotSelect} />}
        />
      )}
    </div>
  );
}

export default Shops;
