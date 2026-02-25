import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { bookAppointment } from "../../redux/actions/bookingActions";

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    userId,
    barberId,
    selectedTime,
    selectedServices,
    totalCost,
  } = location.state || {};

  const handlePayment = async () => {

    const bookingData = {
      selectedTime,
      selectedServices,
      payment_status: "PAID",
      status: "CONFIRMED",
    };
  
    const success = await dispatch(
      bookAppointment(bookingData, userId)
    );
  
    if (success) {
      navigate("/myprofile");
    }
  };


  return (
    <div className="container mt-5">
      <h2>Payment Page</h2>

      <h4>Total Amount: ₹{totalCost}</h4>

      <button
        className="btn btn-success mt-3"
        onClick={handlePayment}
      >
        Pay Now
      </button>
    </div>
  );
}

export default Payment;