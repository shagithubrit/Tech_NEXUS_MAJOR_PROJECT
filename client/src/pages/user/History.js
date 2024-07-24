import React, { useState, useEffect } from "react";
import UserNav from "../../components/nav/UserNav";
import { getUserOrders } from "../../functions/user";
import { useSelector } from "react-redux";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { useCallback } from "react";
import ShowPaymentInfo from "../../components/cards/ShowPaymentInfo";
import Invoice from "../../components/order/Invoice";
import { PDFDownloadLink } from "@react-pdf/renderer";

const History = () => {
  const [orders, setOrders] = useState([]);
 const { user } = useSelector((state) => ({ ...state }));

  const loadUserOrders = useCallback(
    () =>
      getUserOrders(user.token).then((res) => {
        setOrders(res.data.data);
      }),
    [user.token]
  );

  useEffect(() => {
    loadUserOrders();
  }, [loadUserOrders]);

  const showOrderInTable = (order) => (
    <table className="table table-bordered">
      <thead className="table-light">
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Brand</th>
          <th scope="col">Color</th>
          <th scope="col">Count</th>
          <th scope="col">Shipping</th>
        </tr>
      </thead>
      <tbody>
        {order.products.map((p, i) => (
          <tr key={i}>
            <td>
              <b>{p.product.title}</b>
            </td>
            <td>${p.product.price}</td>
            <td>{p.product.brand}</td>
            <td>{p.product.color}</td>
            <td>{p.count}</td>
            <td>
              {p.product.shipping === "Yes" ? (
                <CheckCircleOutlined style={{ color: "green" }} />
              ) : (
                <CloseCircleOutlined style={{ color: "red" }} />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const showDownloadLink = (order) => (
    <PDFDownloadLink
      document={<Invoice order={order} />}
      className="btn btn-sm btn-block btn-outline-primary"
      fileName="invoice.pdf"
    >
      Download PDF
    </PDFDownloadLink>
  );

  const showEachOrder = () =>
    orders.reverse().map((order, i) => (
      <div key={i} className="m-5 p-3 card">
        <ShowPaymentInfo order={order} />
        {showOrderInTable(order)}
        <div className="row">
          <div className="col">{showDownloadLink(order)}</div>
        </div>
      </div>
    ));

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col text-center pt-3">
          <h4>
            {orders.length > 0 ? "User purchase orders" : "No purchase orders"}
          </h4>
          {showEachOrder()}
        </div>
      </div>
    </div>
  );
};

export default History;
