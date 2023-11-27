import React, { useState } from 'react';
import PlainModal from '../Modal/PlainModal';
import BarberShopDetail from '../BarberShopDetail/BarberShopDetail';
import { FaAngleUp, FaAngleDown } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { bookAppointment } from '../../redux/actions/bookingActions';
import './Shops.css';

function Shops() {
  const dispatch = useDispatch();
  const userId=useSelector((state)=>state.auth.userId);
  const isLogin = useSelector((state) => state.auth.isLogin);
  const navigate = useNavigate();
  const [selectedBarberShop, setSelectedBarberShop] = useState(null);
  const [selectedServices,setSelectedServices]=useState()
  const [selectedBarberId, setSelectedBarberId] = useState();
  const [selectedTime,setSelectedTime]=useState()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAllShops, setShowAllShops] = useState(false);

  let generateStarRating = (rating) => {
    const maxRating = 5;
    const starRating = [];
    const roundedRating = Math.round(rating * 2) / 2; // Round to the nearest half star

    for (let i = 1; i <= maxRating; i++) {
      if (i <= roundedRating) {
        starRating.push(<FaStar key={i} />);
      } else if (i === roundedRating + 0.5) {
        starRating.push(<FaStarHalfAlt key={i} />);
      } else {
        starRating.push(<FaRegStar key={i} />);
      }
    }
    return starRating;
  };

  const handleBarberShopSelect = (barberShop) => {
    if (!isLogin) {
      navigate('/login');
    }
    setSelectedBarberShop(barberShop);
    setIsModalOpen(true);
  };

  const barberShops = [ {barberId:'1',barberName:"xyz", name: 'Barber Shop 1',rating:4.7, location: '123 Main St', contact: '555-1234', services: [ { name: 'Haircut', price: 20 }, { name: 'Shave', price: 15,time:15 }, { name: 'Shave', price: 15,time:15 }, { name: 'Shave', price: 15,time:15 }, { name: 'Shave', price: 15,time:15 }, { name: 'Shave', price: 15,time:15 }, { name: 'Shave', price: 15,time:15 }, ], }, 
  {barberId:'2', barberName:"xyz1",name: 'Barber Shop 2',rating:4, location: '123 Main St', contact: '555-1234', services: [ { name: 'Haircut', price: 20,time:15 }, { name: 'Shave', price: 15 ,time:15}, { name: 'Shave', price: 15 ,time:15}, { name: 'Shave', price: 15,time:15 }, { name: 'Shave', price: 15 ,time:15}, { name: 'Shave', price: 15,time:15 }, { name: 'Shave', price: 15 ,time:15}, ], }, 
  {barberId:'3', barberName:"xyz2",name: 'Barber Shop 3',rating:4.8, location: '123 Main St', contact: '555-1234', services: [ { name: 'Haircut', price: 20 ,time:15}, { name: 'Shave', price: 15 ,time:15}, { name: 'Shave', price: 15,time:15 }, { name: 'Shave', price: 15 ,time:15}, { name: 'Shave', price: 15 ,time:15}, { name: 'Shave', price: 15,time:15 }, { name: 'Shave', price: 15 ,time:15}, ], }, 
  {barberId:'4', barberName:"xyz3",name: 'Barber Shop 4',rating:5, location: '123 Main St', contact: '555-1234', services: [ { name: 'Haircut', price: 20,time:15 }, { name: 'Shave', price: 15,time:15 }, { name: 'Shave', price: 15 ,time:15}, { name: 'Shave', price: 15,time:15 }, { name: 'Shave', price: 15 ,time:15}, { name: 'Shave', price: 15,time:15 }, { name: 'Shave', price: 15 ,time:15}, ], }, 
  {barberId:'5', barberName:"xyz4",name: 'Barber Shop 5',rating:3, location: '123 Main St', contact: '555-1234', services: [ { name: 'Haircut', price: 20 ,time:15}, { name: 'Shave', price: 15,time:15 }, { name: 'Shave', price: 15,time:15 }, { name: 'Shave', price: 15,time:15 }, { name: 'Shave', price: 15,time:15 }, { name: 'Shave', price: 15,time:15 }, { name: 'Shave', price: 15 ,time:15}, ], }, 
];

  // Function to check the availability of selected services at a given time
  const checkAvailability = (selectedServices, startTime, barberId) => {
    const totalTimeNeeded = selectedServices.reduce((total, service) => {
      return total + service.time;
    }, 0);
    const shopSchedule = getShopSchedule(barberId); // Fetch the shop schedule based on the barberId
  
    // Check if the calculated end time (totalTimeNeeded + startTime) is within the available time slots
    const endTime = addMinutes(startTime, totalTimeNeeded);
  
    // Iterate through the time slots to check availability
    for (let currentTime = startTime; currentTime < endTime; currentTime = addMinutes(currentTime, 15)) {
      if (!shopSchedule[currentTime] || shopSchedule[currentTime].length === 0) {
        return false; // One or more time slots are not available
      }
    }
  
    return true; // All time slots within the range are available
  };
  const getShopSchedule = (barberId) => {
    // Find the barber shop based on the provided barberId
    const barberShop = barberShops.find((shop) => shop.barberId === barberId);
    if (barberShop) {
      const shopSchedule = {};
      
      // Iterate through the available services and build the schedule
      for (const service of barberShop.services) {
        const { name, time } = service;
        if (!shopSchedule[time]) {
          shopSchedule[time] = [];
        }
        shopSchedule[time].push(name);
      }
      return shopSchedule;
    } else {
      // Barber shop with the provided barberId was not found
      return {};
    }
  };
  const addMinutes = (time, minutes) => {
    const newTime = new Date(time);
    newTime.setMinutes(newTime.getMinutes() + minutes);
    return newTime;
  };
  const handleTimeSlotSelect = (selectedServices, selectedTime, barberId) => {
    setSelectedServices(selectedServices);
    setSelectedTime(selectedTime.toISOString())
    setSelectedBarberId(barberId)
  };

  const handleBookedSlot=()=>{
   dispatch(bookAppointment(userId,selectedBarberShop.barberId,selectedTime,selectedServices));
   handleCloseModal();
  }

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
            <div className="card card-shops">
              <div className="card-body">
                <h3>{shop.name}</h3>
                <NavLink
                  state={{ barberId: shop.barberId }}
                  style={{
                    fontSize: 18,
                    fontWeight: 'normal',
                    color: '#d3ab5e',
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                  to={`/barber-profile/${shop.barberName}`}
                >
                  {shop.barberName}
                </NavLink>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 'bold',
                    color: '#d3ab5e',
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >
                  {shop.rating} {generateStarRating(shop.rating)}
                </div>
                <button
                  className="btn"
                  onClick={() => handleBarberShopSelect(shop)}
                  style={{
                    float: 'right',
                    fontWeight: 'bold',
                    backgroundColor: '#285167',
                    color: '#d3ab5e',
                  }}
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
            style={{ display: 'block', margin: 'auto' }}
            className="btn"
            onClick={toggleShowAllShops}
          >
            {showAllShops ? (
              <FaAngleUp fontSize={40} style={{ color: '#285067' }} />
            ) : (
              <FaAngleDown fontSize={40} style={{ color: '#285067' }} />
            )}
          </button>
        </div>
      )}
      {isModalOpen && (
        <PlainModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          body={<BarberShopDetail barberShop={selectedBarberShop} onTimeSlotSelect={handleTimeSlotSelect} />}
          onSave={handleBookedSlot}
        />
      )}
    </div>
  );
}

export default Shops;