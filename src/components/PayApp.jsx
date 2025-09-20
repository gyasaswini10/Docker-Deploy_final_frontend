import React, { useState, useEffect } from "react";

export default function PayApp({ price }) {
  const razorpayKey = "rzp_test_55g9TCHfIzP1DG";
  const [paymentStatus, setPaymentStatus] = useState("");

  useEffect(() => {
    if (window.Razorpay === undefined) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      document.body.appendChild(script);
    }
  }, []);

  const handlePayment = () => {
    if (window.Razorpay) {
      const options = {
        key: razorpayKey,
        amount: price * 100,
        currency: "INR",
        name: "Job Property Payment",
        description: `Paying ₹${price} for property`,
        image: "https://example.com/logo.png",
        handler: function (response) {
          setPaymentStatus("Payment Successful!");
          alert(
            "Payment Successful! Payment ID: " + response.razorpay_payment_id
          );
        },
        modal: {
          ondismiss: function () {
            setPaymentStatus("Payment Cancelled.");
            alert("Payment was cancelled.");
          },
        },
        prefill: {
          name: "User",
          email: "user@example.com",
          contact: "7013370527",
        },
        notes: {
          paymentFor: "Job Property",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } else {
      alert("Razorpay SDK not loaded");
    }
  };

  return (
    <div style={{ marginTop: "10px" }}>
      <button onClick={handlePayment}>Pay Now ₹{price}</button>
      {paymentStatus && (
        <div style={{ marginTop: "5px", color: "green" }}>{paymentStatus}</div>
      )}
    </div>
  );
}
