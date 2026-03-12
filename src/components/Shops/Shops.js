import React, { useEffect, useState } from 'react';
import PlainModal from '../Modal/PlainModal';
import BarberShopDetail from '../BarberShopDetail/BarberShopDetail';
import { FaAngleUp, FaAngleDown } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { bookAppointment } from '../../redux/actions/bookingActions';
import { getUserData } from '../../redux/actions/userAction';
import { getAllBarbers } from "../../redux/actions/barberAction";
import {getShops} from "../../redux/actions/shopAction";

import './Shops.css';

function Shops() {
  const dispatch = useDispatch();
  const barberData = useSelector((state) => state.barber.barberData);
  const userId = useSelector((state) => state.auth.userId);
  const email = useSelector((state)=>state.user?.userData?.email)
  const isLogin = useSelector((state) => state.auth.isLogin);
  const allShops = useSelector((state)=>state.shop.shops)
  const navigate = useNavigate();
  const [selectedBarberShop, setSelectedBarberShop] = useState(null);
  const [selectedServices, setSelectedServices] = useState();
  const [selectedBarberId, setSelectedBarberId] = useState();
  const [selectedTime, setSelectedTime] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAllShops, setShowAllShops] = useState(false);
  const [barberShops, setBarberShops] = useState([]);
  const [shopsToDisplay, setShopsToDisplay] = useState([]);
  const [reservedTimes, setReservedTimes] = useState([]);

  useEffect(() => {
    dispatch(getAllBarbers());
    dispatch(getShops());
    dispatch(getUserData());
  }, []);
  
  console.log(barberData,"in shops.js", Array.isArray(barberData))

  useEffect(() => {
    if (barberData && barberData.reservedTimes) {
      setReservedTimes(barberData.reservedTimes);
    }
  }, [barberData]);

  useEffect(() => {
    
    if (Array.isArray(barberShops)) setShopsToDisplay(showAllShops ? allShops : allShops?.slice(0, Math.min(4, allShops?.length)));
  }, [allShops, showAllShops]);

  useEffect(() => {
  }, [barberData]);


  useEffect(() => {
    if (Array.isArray(barberData)) {
      setBarberShops(barberData);
    }
  }, [barberData]);
  

  let generateStarRating = (rating) => {
    const maxRating = 5;
    const starRating = [];
    const roundedRating = Math.round(rating * 2) / 2;

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
    const startTime = new Date(selectedStartTime);

    if (isNaN(startTime.getTime())) {
      console.error('Invalid Date:', selectedStartTime);
      return false;
    }

    const endTime = new Date(startTime);
    const totalDuration = selectedServices?.reduce((total, service) => total + 15, 0);
    console.log("Total duration", totalDuration)
    endTime.setMinutes(endTime.getMinutes() + totalDuration);

    for (let i = new Date(startTime); i < endTime; i.setMinutes(i.getMinutes() + 15)) {
      const isAvailable = !(reservedTimes || []).some((reservedTime) => {
        const startReservedTime = new Date(reservedTime);
        const endReservedTime = new Date(startReservedTime.getTime() + 15 * 60000);

        return (i >= startReservedTime && i < endReservedTime) || (endTime > startReservedTime && endTime <= endReservedTime);
      });

      if (!isAvailable) {
        console.log('Reservation Found:', i);
        return false;
      }
    }

    console.log('No reservation found within the selected time slot');
    return true;
  };

  const handleBookedSlot = () => {
    const totalCost = selectedServices?.reduce(
      (acc, service) => acc + Number(service.price || 0),
      0
    );

    console.log(selectedServices,totalCost)
  
    const isContinuousTime = checkContinuousTime(
      selectedTime,
      selectedServices
    );
  
    if (isContinuousTime) {
      navigate("/payment", {
        state: {
          userId,
          email,
          barberId: selectedBarberShop.barberId,
          selectedTime,
          selectedServices,
          totalCost,
        },
      });
  
      handleCloseModal();
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const toggleShowAllShops = () => {
    setShowAllShops(!showAllShops);
  };

  return (
    <div className="mt-5 container">
      <h2 className="display-5 bold">Shops Near You</h2>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 mt-3 g-2">
        {Array.isArray(shopsToDisplay) && shopsToDisplay?.map((shop, index) => (
          <div key={index} className="col">
            <div className="card card-shops">
              <div className="card-body">
                <h3>{shop.shop_name}</h3>
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
