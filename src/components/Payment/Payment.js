import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { bookAppointment } from "../../redux/actions/bookingActions";

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    userId,
    email,
    barberId,
    selectedTime,
    selectedServices,
    totalCost,
  } = location.state || {};

  const handlePayment = async () => {
    setLoading(true);
    setErrorMessage("");

    const bookingData = {
      email,
      selectedTime,
      selectedServices,
      payment_status: "PAID",
      status: "CONFIRMED",
    };

    try {
      const success = await dispatch(
        bookAppointment(bookingData, userId)
      );

      if (success) {
        navigate("/myprofile");
      } else {
        setErrorMessage(
          "⚠️ This time slot is no longer available. Please choose another slot."
        );
      }
    } catch (err) {
      setErrorMessage(
        "⚠️ Something went wrong while booking. Please try again."
      );
    }

    setLoading(false);
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <div className="card shadow p-4">
        <h3 className="mb-3 text-center">Payment</h3>

        <div className="mb-3">
          <strong>Total Amount:</strong>
          <h4 className="text-success">
            ₹{Number(totalCost).toLocaleString("en-IN")}
          </h4>
        </div>

        {selectedTime && (
          <p>
            <strong>Selected Time:</strong>{" "}
            {new Date(selectedTime).toLocaleString()}
          </p>
        )}

        {/* Error Prompt */}
        {errorMessage && (
          <div className="alert alert-danger mt-3">
            {errorMessage}
            <div className="mt-3">
              <button
                className="btn btn-outline-primary btn-sm"
                onClick={() => navigate(-1)}
              >
                Choose Another Slot
              </button>
            </div>
          </div>
        )}

        <button
          className="btn btn-success w-100 mt-3"
          onClick={handlePayment}
          disabled={loading}
        >
          {loading ? "Processing Payment..." : "Pay Now"}
        </button>

        <button
          className="btn btn-outline-secondary w-100 mt-2"
          onClick={() => navigate(-1)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default Payment;