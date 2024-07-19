import React, { useState } from "react";
import { Card, Tooltip } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import laptop from "../../images/laptop.png";
import { Link } from "react-router-dom";
import ShowAverage from "../../functions/Rating";
import _ from "lodash";
import { useDispatch } from "react-redux";

const { Meta } = Card;

const ProductCard = ({ product }) => {
  const [tooltip, setTooltip] = useState("Click to add");
  const dispatch = useDispatch();

  const handleRemove = () => {};

  const handleAddToCart = () => {
    // create cart array
    let cart = [];
    if (typeof window !== "undefined") {
      // if cart is in local storage, then get it
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      // push new product to cart
      cart.push({
        ...product,
        count: 1,
      });
      // remove duplicates
      let unique = _.uniqWith(cart, _.isEqual);
      // save to localstorage
      localStorage.setItem("cart", JSON.stringify(unique));
      // show tooltip
      setTooltip("added");

      // add to redux state
      dispatch({ type: "ADD_TO_CART", payload: unique });
      // show cart items inside of drawer
      dispatch({ type: "SET_VISIBLE", payload: true });
    }
  };

  return (
    <>
      {product && product.ratings && product.ratings.length > 0 ? (
        ShowAverage(product)
      ) : (
        <div className="text-center pt-1 pb-3">No rating yet</div>
      )}

      <Card
        cover={
          <img
            style={{
              width: "200px",
              height: "150px",
              objectFit: "cover",
              margin: "0 auto",
            }}
            alt="computer"
            src={product?.images?.length ? product.images[0].url : laptop}
          />
        }
        actions={[
          <Link to={`/product/${product.slug}`}>
            <EyeOutlined className="text-warning" /> <br />
            View Product
          </Link>,
          <Tooltip title={tooltip}>
            <a
              href="#"
              onClick={handleAddToCart}
              disabled={product.quantity < 1}
            >
              <ShoppingCartOutlined
                onClick={() => handleRemove(product.slug)}
                className="text-danger"
              />
              <br />
              {product.quantity < 1 ? "Out of stock" : "Add to Cart"}
            </a>
          </Tooltip>,
        ]}
      >
        <Meta
          title={`${product.title}-$${product.price}`}
          description={`${product.description?.substring(0, 40)}...`}
        />
      </Card>
    </>
  );
};

export default ProductCard;
