import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import ShowPaymentInfo from "../cards/ShowPaymentInfo";

const Orders = ({ orders, handleStatusChange }) => {
  const statuses = [
    "Not processed",
    "Processing",
    "Dispatched",
    "Canceled",
    "Completed",
    "Cash On Delivery",
  ];

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

  return (
    <>
      {orders.map((order) => {
        return (
          <div key={order._id} className="row pb-5">
            <div className="btn btn-block bg-light">
              <ShowPaymentInfo order={order} showStatus={false} />
              <div className="row">
                <div className="col-md-4">Delivary status</div>
                <div className="col-md-8">
                  <select
                    name="status"
                    className="form-control"
                    defaultValue={order.orderStatus}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            {showOrderInTable(order)}
          </div>
        );
      })}
    </>
  );
};

export default Orders;
