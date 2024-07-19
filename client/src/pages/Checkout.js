import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  emptyUserCart,
  getUserCart,
  saveUserAddress,
  applyCoupon,
  createCashOrderForUser,
} from "../functions/user";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

const Checkout = ({ history }) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);
  const [coupon, setCoupon] = useState("");
  // discount price
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [discountError, setDiscountError] = useState("");

  const dispatch = useDispatch();
  const { user, COD, coupon: couponFromRedux } = useSelector((state) => state);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getUserCart(user.token).then((res) => {
        setProducts(res.data.data.products);
        setTotal(res.data.data.cartTotal);
      });
    }
    return () => {
      isMounted = false;
    };
  }, [user.token]);

  const emptyCart = () => {
    // remove from locals storage
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }
    // remove from redux
    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });
    // remove from DB
    emptyUserCart(user.token).then((res) => {
      setProducts([]);
      setTotal(0);
      setTotalAfterDiscount(0);
      setCoupon("");
      toast.success("Cart is empty. Continue shopping.");
    });
  };

  const saveAddressToDB = () => {
    saveUserAddress(address, user.token).then((res) => {
      if (res.data.status === "success") {
        setAddressSaved(true);
        toast.success("Address saved successfully");
      }
    });
  };

  const applyDiscountCoupon = () => {
    applyCoupon(coupon, user.token).then((res) => {
      if (res.data.error) {
        setDiscountError(res.data.error);
        // update redux coupon applied true/false
        // dispatch({ type: "COUPON_APPLIED", payload: false });
      }

      if (res.data.data) {
        setTotalAfterDiscount(res.data.data);
        // update redux coupon applied true/false
        dispatch({ type: "COUPON_APPLIED", payload: true });
      }
    });
  };

  const Address = () => (
    <>
      <ReactQuill theme="snow" value={address} onChange={setAddress} />
      <button className="btn btnprimary mt-2" onClick={saveAddressToDB}>
        Save
      </button>
    </>
  );

  const ProductSummary = () => {
    return (
      <>
        {products.map((p, i) => (
          <div key={p._id}>
            <p>
              {p.product.title} ({p.color}) x {p.count} ={" "}
              {p.product.price * p.count}
            </p>
          </div>
        ))}
      </>
    );
  };

  const ApplyCoupon = () => (
    <>
      <input
        onChange={(e) => {
          setCoupon(e.target.value);
          setDiscountError("");
        }}
        value={coupon}
        type="text"
        className="form-control"
      />
      <button className="btn btn-primary mt-2" onClick={applyDiscountCoupon}>
        Apply
      </button>
    </>
  );

  const createCashOrder = () => {
    createCashOrderForUser(couponFromRedux, COD, user.token).then((res) => {
      // empty cart from redux snd loval storage, reset coupon, reset COD, then redirect
      if (res.data.status === "success") {
        // empty local storage
        if (typeof window !== "undefined") localStorage.removeItem("cart");
        // empty redux cart
        dispatch({ type: "ADD_TO_CART", payload: [] });
        // empty redux coupon
        dispatch({ type: "COUPON_APPLIED", payload: false });
        // empty redux COD
        dispatch({ type: "COD", payload: false });
        // empty cart from backend
        emptyUserCart(user.token);
        // redirect
        setTimeout(() => {
          history.push("/user/history");
        }, 1000);
      }
    });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6 mt-3">
          <h4>Delivary Address</h4>
          <hr />
          <hr />
          {Address()}
          <hr />
          <h4>Got coupon ?</h4>
          {ApplyCoupon()}
          {discountError && (
            <p className="bg-danger mt-2 mb-2 p-1 text-white">
              {discountError}
            </p>
          )}
          <hr />
          Coupon input and apply button
        </div>
        <div className="col-md-6 mt-3">
          <h4>Order Summary</h4>
          <hr />
          <p>Products: {products.length}</p>
          <hr />
          {ProductSummary()}
          <hr />
          <p>Cart total: ${total}</p>

          {totalAfterDiscount > 0 && (
            <p className="bg-success mt-2 mb-2 p-1 text-white">
              Discount applied- Total payable: ${totalAfterDiscount}
            </p>
          )}

          <div className="row">
            <div className="col-md-6">
              {COD ? (
                <button
                  className="btn btn-primary"
                  disabled={!addressSaved || !products.length}
                  onClick={createCashOrder}
                >
                  Place order
                </button>
              ) : (
                <button
                  className="btn btn-primary"
                  disabled={!addressSaved || !products.length}
                  onClick={() => history.push("/payment")}
                >
                  Place order
                </button>
              )}
            </div>
            <div className="col-md-6">
              <button
                className="btn btn-primary"
                onClick={emptyCart}
                disabled={!products.length}
              >
                Empty cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
