import { Drawer } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import laptop from "../../images/laptop.png";

const SideDrawer = () => {
  const dispatch = useDispatch();
  const { drawer, cart } = useSelector((state) => state);

  const imageStyle = {
    width: "100%",
    height: "100px",
    objectFit: "contain",
  };

  const hideDrawer = () => {
    dispatch({ type: "SET_VISIBLE", payload: false });
  };

  return (
    <Drawer
      className="text-center"
      title={`Cart / ${cart.length} Product${cart.length > 1 ? "s" : ""}`}
      // placement="left"
      //   closable={false}
      onClose={hideDrawer}
      visible={drawer}
    >
      {cart.map((item) => (
        <div key={item._id} className="row">
          <div className="col">
            {item.images[0] ? (
              <>
                <img
                  src={item.images[0].url}
                  alt={item.name}
                  style={imageStyle}
                />
                <p className="text-center bg-secondary text-light">
                  {item.title} x {item.count}
                </p>
              </>
            ) : (
              <>
                <img src={laptop} alt={item.name} style={imageStyle} />
                <p className="text-center bg-secondary text-light">
                  {item.title} x {item.count}
                </p>
              </>
            )}
          </div>
        </div>
      ))}
      <Link to="/cart">
        <button
          className="text-center btn btn-primary btn-raised btn-block"
          onClick={hideDrawer}
        >
          Go to cart
        </button>
      </Link>
    </Drawer>
  );
};

export default SideDrawer;
