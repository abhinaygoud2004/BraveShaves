import React, { useEffect, useState } from 'react';
import PlainModal from '../Modal/PlainModal';
import BarberShopDetail from '../BarberShopDetail/BarberShopDetail';
import { FaAngleUp, FaAngleDown } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { parseISO } from 'date-fns';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { bookAppointment } from '../../redux/actions/bookingActions';
import { getAllBarbers } from "../../redux/actions/barberAction";
import { getBarberData } from '../../redux/actions/barberAction';

import './Shops.css';

function Shops() {
  const dispatch = useDispatch();
  const barberData = useSelector((state) => state.barber.barberData);
  const userId=useSelector((state)=>state.auth.userId);
  const isLogin = useSelector((state) => state.auth.isLogin);
  const navigate = useNavigate();
  const [selectedBarberShop, setSelectedBarberShop] = useState(null);
  const [selectedServices,setSelectedServices]=useState()
  const [selectedBarberId, setSelectedBarberId] = useState();
  const [selectedTime,setSelectedTime]=useState()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAllShops, setShowAllShops] = useState(false);
  const [barberShops,setBarberShops]=useState([]);
  const [shopsToDisplay,setShopsToDisplay]=useState([])
  const [reservedTimes,setReservedTimes]=useState([])

  useEffect(()=>{
    dispatch(getAllBarbers());
  },[])

  useEffect(() => {
    if (barberData && barberData.reservedTimes) {
      setReservedTimes(barberData.reservedTimes);
    }
  }, [barberData]);

    useEffect(() => {
      if(Array.isArray(barberShops)) setShopsToDisplay(showAllShops ? barberShops : barberShops?.slice(0, Math.min(4, barberShops?.length)));
    }, [barberShops, showAllShops]);    

  useEffect(()=>{
    setBarberShops(barberData);
  },[barberData])

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

  const handleTimeSlotSelect = (selectedServices, selectedTime, barberId) => {
    setSelectedServices(selectedServices);
    setSelectedTime(selectedTime.toISOString())
    setSelectedBarberId(barberId)
  };

 

  const checkContinuousTime = (selectedStartTime, selectedServices) => {
    // Parse the selectedStartTime into a JavaScript Date object
    const startTime = new Date(selectedStartTime);
  
    // Check if startTime is a valid date
    if (isNaN(startTime.getTime())) {
      console.error('Invalid Date:', selectedStartTime);
      return false;
    }
  
    // Calculate the end time based on the total duration of selected services
    let endTime = new Date(startTime);
    
    const totalDuration = selectedServices.reduce((total, service) => total + 15, 0);
    console.log(totalDuration)
    endTime.setMinutes(endTime.getMinutes() + totalDuration);
    for (let i = new Date(startTime); i < endTime; i.setMinutes(i.getMinutes() + 15)) {
      console.log('Checking:', i);
    
      // Check if the entire time slot is available
      const isAvailable = !(reservedTimes || []).some((reservedTime) => {
        const startReservedTime = new Date(reservedTime);
        const endReservedTime = new Date(startReservedTime.getTime() + 15 * 60000);
    
        // Check if there's any overlap with the reserved time
        return i < endReservedTime && endReservedTime > i;
      });
    
      if (!isAvailable) {
        console.log('Reservation Found:', i);
        return false; // There's a reservation within the selected time slot
      }
    }
    
    console.log('No reservation found within the selected time slot');
    return true; // The entire time slot is available
    
  };
  
  
  
  
  const handleBookedSlot = () => {
    // Calculate the total cost of selected services
    const totalCost = selectedServices.reduce((acc, service) => acc + service.price, 0);
  
    // Check if there is a continuous time slot
    const isContinuousTime = checkContinuousTime(selectedTime, selectedServices);
  
    if (isContinuousTime) {
      // Display the total cost
      console.log(`Total Cost: $${totalCost}`);
      // Dispatch the booking action
      dispatch(bookAppointment(userId, selectedBarberShop.barberId, selectedTime, selectedServices));
      // Close the modal
      handleCloseModal();
    } else {
      // If there is no continuous time, you can display an error message or handle it as needed
      console.log("Selected services require a continuous time slot.");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const toggleShowAllShops = () => {
    setShowAllShops(!showAllShops);
  };
  
  // const shopsToDisplay = showAllShops ? barberShops : barberShops.slice(0, 4);

  return (
    <div className="mt-5 container">
      <h2 className="display-5 bold">Shops Near You</h2>
        <div className="row row-cols-sm-3 row-cols-md-4 mt-3 g-2">
        {Array.isArray(shopsToDisplay) && shopsToDisplay?.map((shop, index) => (
            <div key={index} className="col">
              <div className="card card-shops">
                <div className="card-body">
                <h3>{shop.shopName}</h3>
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
      {barberShops?.length > 4 && (
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
          title={selectedBarberShop.shopName}
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