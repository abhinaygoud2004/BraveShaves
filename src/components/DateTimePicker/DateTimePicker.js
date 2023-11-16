import React, { useEffect } from 'react'
import { useState } from 'react';
import DatePicker from 'react-datepicker';


function DateTimePicker(props) {
  // const [hours,setHours]=useState();
  // const [minutes,setMinutes]=useState();
  const [startDate, setStartDate] = useState(
   new Date()
  );
  // useEffect(()=>{
  //   props.onTimeSelect(startDate)
  // },[])
  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const startDate = new Date(time);
    const reservedTimes = [
      new Date('2023-11-10T10:00:00'), // Example: November 10, 2023, 10:00 AM
      new Date('2023-11-10T23:30:00'), // Example: November 10, 2023, 2:30 PM
    ];

    // Block if the selected time is in the reservedTimes array
    if (reservedTimes.some((reservedTime) => reservedTime.getTime() === startDate.getTime())) {
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
      // shouldCloseOnSelect={false}
      selected={startDate}
      filterDate={filterPassedDate}
      onChange={handleDateChange}
      showTimeSelect
      filterTime={filterPassedTime}
      dateFormat="MMMM d, yyyy h:mm aa"
      timeIntervals={15}
    />
  )
}

export default DateTimePicker