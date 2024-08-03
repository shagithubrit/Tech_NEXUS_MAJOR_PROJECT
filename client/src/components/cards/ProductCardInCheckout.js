import ModalImage from "react-modal-image";
import { useDispatch } from "react-redux";
import laptop from "../../images/laptop.png";
import { toast } from "react-toastify";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CloseOutlined,
} from "@ant-design/icons";

const ProductCardInCheckout = ({ product }) => {
  const colors = ["Black", "Brown", "Silver", "White", "Blue"];
  const dispatch = useDispatch();

  const updateCartInStorage = (cart) => {


    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch({ type: "ADD_TO_CART", payload: cart });
  };

  const handleColorChange = (e) => {
    let cart = [];
    if (typeof window !== "undefined") {
      // to check whether we are in the windows envioronment or not ...
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart")); // it parses it into object string 
      }

      cart.map((prod, i) => {
        if (prod._id === product._id) {
          cart[i].color = e.target.value;
        }
      });
      //  after saving it in local storage it will now update the redux store with new cart 
      updateCartInStorage(cart);
    }
  };

  // just like color you can same do for quantitiy 
  const handleQuantityChange = (e) => {
    let count = e.target.value < 1 ? 1 : e.target.value;

    if (count > product.quantity) {
      toast.error(`Max available quantity: ${product.quantity}`);
      return;
    }

    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.map((prod, i) => {
        if (prod._id === product._id) {
          cart[i].count = count;
        }
      });

      updateCartInStorage(cart);
    }
  };

  const handleRemove = () => {
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart = cart.filter((item) => item._id !== product._id);

      updateCartInStorage(cart);
    }
  };

  return (
    <tr>
      <td>
        <div style={{ width: "100px", height: "auto" }}>
          {product.images.length ? (
            <ModalImage
              small={product.images[0].url}
              large={product.images[0].url}
              alt={product.title}
            />
          ) : (
            <ModalImage small={laptop} large={laptop} alt={product.title} />
          )}
        </div>
      </td>
      <td>{product.title}</td>
      <td>${product.price}</td>
      <td>{product.brand}</td>
      <td>
        <select
          name="color"
          id="colorPicker"
          className="form-control"
          onChange={handleColorChange}
        >
          {product.color ? (
            <option key="100">{product.color}</option>
          ) : (
            <option key="200">Select</option>
          )}
          {colors
            .filter((c) => c !== product.color)
            .map((c, i) => (
              <option key={`${c}${i}`} value={c}>
                {c}
              </option>
            ))}
        </select>
      </td>
      <td className="text-center">
        <input
          type="number"
          className="form-control"
          value={product.count}
          onChange={handleQuantityChange}
          min={1}
          max={product.quantity}
        />
      </td>
      <td className="text-center">
        {product.shipping === "Yes" ? (
          <CheckCircleOutlined className="text-success" />
        ) : (
          <CloseCircleOutlined className="text-danger" />
        )}
      </td>
      <td className="text-center">
        <CloseOutlined onClick={handleRemove} className="text-danger" />
      </td>
    </tr>
  );
};

export default ProductCardInCheckout;
