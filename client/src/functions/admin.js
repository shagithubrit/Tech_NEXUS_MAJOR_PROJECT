import axios from "axios";

export const getOrders = async (authToken) =>
  await axios.get(`${process.env.REACT_APP_API}/admin/orders`, {
    headers: { authToken },
  });

export const changeStatus = async (orderId, orderStatus, authToken) =>
  await axios.put(
    `${process.env.REACT_APP_API}/admin/order-status`,
    { orderId, orderStatus },
    {
      headers: { authToken },
    }
  );
