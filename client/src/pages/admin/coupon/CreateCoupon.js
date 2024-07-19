import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import AdminNav from "../../../components/nav/AdminNav";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import {
  getCoupons,
  removeCoupon,
  createCoupon,
} from "../../../functions/coupon";
import { DeleteOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";

const CreateCoupon = () => {
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [discount, setDiscount] = useState("");
  const [loading, setLoading] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const { user } = useSelector((state) => state);

  const loadAllCoupons = () => {
    getCoupons().then((res) => setCoupons(res.data.data));
  };
  useEffect(() => {
    loadAllCoupons();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createCoupon({ name, expiry, discount }, user.token)
      .then((res) => {
        if (res.data.error) {
          toast.error(res.data.error);
          setLoading(false);
        } else {
          loadAllCoupons();
          setLoading(false);
          setName("");
          setExpiry("");
          setDiscount("");
          toast.success(`'${res.data.data.name}' is created`);
        }
      })
      .catch((err) => console.error("Create coupon error: ", err));
  };

  const handleRemove = (couponId) => {
    if (window.confirm("Are you sure you want to delete this coupon ?")) {
      setLoading(true);
      removeCoupon(couponId, user.token)
        .then((res) => {
          loadAllCoupons();
          setLoading(false);
          toast.success(`Coupon has been deleted successfuly`);
        })
        .catch((err) => console.log("Deleting coupon error: ", err));
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          <h4>Coupon</h4>

          <form action="" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="text-muted">Name</label>
              <input
                className="form-control"
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                autoFocus
                required
              ></input>
            </div>
            <div className="form-group">
              <label className="text-muted">Discount %</label>
              <input
                className="form-control"
                type="text"
                onChange={(e) => setDiscount(e.target.value)}
                value={discount}
                required
              ></input>
            </div>
            <div className="form-group">
              <label className="text-muted">Expiry</label>
              <DatePicker
                className="form-control"
                selected={expiry}
                required
                onChange={(date) => setExpiry(date)}
              />
              <button className="btn btn-outlined-primary mt-2">Save</button>
            </div>
          </form>

          <br />

          <h4>{loading ? "Loading ..." : ""}</h4>

          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Expiry</th>
                <th scope="col">Discount</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((coupon) => (
                <tr key={coupon._id}>
                  <td>{coupon.name}</td>
                  <td>{new Date(coupon.expiry).toLocaleDateString("en-GB")}</td>
                  <td className="text-center">{coupon.discount}%</td>
                  <td className="text-center">
                    <DeleteOutlined
                      className="text-danger pointer"
                      onClick={() => handleRemove(coupon._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CreateCoupon;
