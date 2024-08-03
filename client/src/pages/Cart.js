import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProductCardInCheckout from "../components/cards/ProductCardInCheckout";
import { userCart } from "../functions/user";

const Cart = ({ history }) => {
  const { cart, user } = useSelector((state) => state);
  const dispatch = useDispatch();

  const getTotal = () => {
    return cart.reduce((curValue, nextValue) => {
      return curValue + nextValue.count * nextValue.price;
    }, 0);
  };

  // const saveOrderToDB = () => {
  //   // save item in backend
  //   userCart(cart, user.token)
  //     .then((res) => {
  //       // redirect user to checkout page
  //       if (res.data.status === "success") history.push("/checkout");
  //     })
  //     .catch((err) => console.log("cart save to DB error: ", err));
  // };

      const saveOrderToDB = () => {
        userCart(cart, user.token)
          .then((res) => {
            console.log("CART POST RES", res);
            if (res.data.ok) history.push("/checkout");
          })
          .catch((err) => {
            console.log("cart save err", err);
          });
      };


  const saveCashOrderToDB = () => {
    // save item in backend
    dispatch({ type: "COD", payload: true });
    userCart(cart, user.token)
      .then((res) => {
        // redirect user to checkout page
        if (res.data.status === "success") history.push("/checkout");
      })
      .catch((err) => console.log("cart save to DB error: ", err));
  };

  const showCartItems = () => {
    return (
      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th scope="col">Image</th>
            <th scope="col">Title</th>
            <th scope="col">Price</th>
            <th scope="col">Brand</th>
            <th scope="col">Color</th>
            <th scope="col">Count</th>
            <th scope="col">Shipping</th>
            <th scope="col">Remove</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((prod, i) => (
            <ProductCardInCheckout key={prod._id} product={prod} />
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8">
          <h4>cart / {cart.length} Product</h4>

          {!cart.length ? (
            <p>
              No products in cart. <Link to="/shop">Continue shopping</Link>
            </p>
          ) : (
            showCartItems()
          )}
        </div>
        <div className="col-md-4">
          <h4>Order summary</h4>
          <hr />
          <p>Products</p>
          {cart.map((c, i) => (
            <div key={i}>
              <p>
                {c.title} x {c.count} = ${c.price * c.count}
              </p>
            </div>
          ))}
          <hr />
          Total: <b>${getTotal()}</b>
          <hr />
          {user ? (
            <>
              <button
                className="btn btn-sm btn-primary mt-2"
                onClick={saveOrderToDB}
                disabled={!cart.length}
              >
                Proceed to checkout
              </button>
              <br />
              <button
                className="btn btn-sm btn-warning mt-2"
                onClick={saveCashOrderToDB}
                disabled={!cart.length}
              >
                Pay cash on delivery
              </button>
            </>
          ) : (
            <button className="btn btn-sm btn-primary mt-2">
              <Link
                to={{
                  pathname: "/login",
                  state: { from: "cart" },
                }}
                style={{ color: "white" }}
              >
                Login to checkout
              </Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
