import React from 'react'
import { useState } from 'react';
import DatePicker from 'react-datepicker';


function DateTimePicker(props) {
  const [hours,setHours]=useState();
  const [minutes,setMinutes]=useState();
  const [startDate, setStartDate] = useState(
   new Date()
  );
  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const startDate = new Date(time);

    return currentDate.getTime() < startDate.getTime();
  };
  const filterPassedDate = (time) => {
    const currentDate = new Date();
    const startDate = new Date(time);

    return currentDate.getTime() < startDate.getTime();
  };
    console.log("selected date is ",startDate)

  return (
      <DatePicker
      selected={startDate}
      filterDate={filterPassedDate}
      onChange={(date) => setStartDate(date)}
      showTimeSelect
      filterTime={filterPassedTime}
      dateFormat="MMMM d, yyyy h:mm aa"
      timeIntervals={15}
    />
  )
}

export default DateTimePicker