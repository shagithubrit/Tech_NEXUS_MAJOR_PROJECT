import axios from "axios";

export const createPaymentIntent = (coupon, authToken) =>
  axios.post(
    `${process.env.REACT_APP_API}/create-payment-intent`,
    { couponApplied: coupon },
    {
      headers: { authToken },
    }
  );
