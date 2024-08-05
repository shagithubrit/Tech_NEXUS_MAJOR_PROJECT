import React from "react";
import { Table } from "antd";
import moment from "moment";

const ShowPaymentInfo = ({ order, showStatus = true }) => {
  const columns = [
    {
      title: "Order Id",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Currency",
      dataIndex: "currency",
      key: "currency",
    },
    {
      title: "Method",
      dataIndex: "method",
      key: "method",
    },
    {
      title: "Payment",
      dataIndex: "payment",
      key: "payment",
    },
    {
      title: "Ordered on",
      dataIndex: "orderedOn",
      key: "orderedOn",
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      render: (text) =>
        showStatus && (
          <span className="badge bg-primary text-white">{text}</span>
        ),
    },
  ];

  const data = [
    {
      key: "1",
      orderId: order.paymentIntent.id,
      amount: order.paymentIntent.amount.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      }),
      currency: order.paymentIntent.currency.toUpperCase(),
      method: order.paymentIntent.payment_method_types.join(", "),
      payment: order.paymentIntent.status.toUpperCase(),
      orderedOn: moment(order.paymentIntent.created * 1000).format(
        "DD/MM/YYYY, HH:mm:ss"
      ),
      status: order.orderStatus,
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
      size="small"
    />
  );
};

export default ShowPaymentInfo;
