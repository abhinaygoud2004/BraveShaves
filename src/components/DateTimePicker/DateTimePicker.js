import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useDispatch, useSelector } from 'react-redux';
import { getBarberData } from '../../redux/actions/barberAction';

function DateTimePicker(props) {
  const dispatch = useDispatch();
  const barberData = useSelector((state) => state.barber.barberData);
  const [startDate, setStartDate] = useState(new Date());
  const [reservedTimes, setReservedTimes] = useState([]);

  useEffect(() => {
    dispatch(getBarberData(props.barberId));
  }, [ props.barberId]);

  // Update the reserved times when the barberData changes
  useEffect(() => {
    if (barberData && barberData.reservedTimes) {
      setReservedTimes(barberData.reservedTimes);
    }
  }, [barberData]);

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const startDate = new Date(time);
  
    // Convert reserved times strings to Date objects
    const reservedTimes = barberData?.reservedTimes?.map((reservedTime) => new Date(reservedTime));
  
    // Block if the selected time is in the reservedTimes array
    if (reservedTimes?.some((reservedTime) => reservedTime.getTime() === startDate.getTime())) {
      return false;
    }
    return currentDate.getTime() < startDate.getTime();
  };
  

  const filterPassedDate = (time) => {
    const currentDate = new Date();
    const startDate = new Date(time);
    return currentDate.getTime() < startDate.getTime();
  };

  const handleDateChange = (date) => {
    setStartDate(date);
    // Call the function from props to send the selected date to the parent
    props.onTimeSelect(date);
  };

  return (
    <DatePicker
      selected={startDate}
      filterDate={filterPassedDate}
      onChange={handleDateChange}
      showTimeSelect
      filterTime={filterPassedTime}
      dateFormat="MMMM d, yyyy h:mm aa"
      timeIntervals={15}
    />
  );
}

export default DateTimePicker;
