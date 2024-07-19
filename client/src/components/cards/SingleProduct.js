import React, { useState } from "react";
import { Card, Tabs, Tooltip } from "antd";
import { useHistory } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import ProductListItems from "./ProductListItems";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Laptop from "../../images/laptop.png";
import StarRating from "react-star-ratings";
import RatingModal from "../modal/RatingModal";
import ShowAverage from "../../functions/Rating";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { addToWishlist } from "../../functions/user";
import { toast } from "react-toastify";

const { TabPane } = Tabs;

// This is a child component of pages/Product page
const SingleProduct = ({ product, onStarClick, star }) => {
  const [tooltip, setTooltip] = useState("Click to add");

  const { user } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();

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
      // add item to drawer
      dispatch({ type: "SET_VISIBLE", payload: true });
    }
  };

  const { title, images, description, _id } = product;

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    addToWishlist(_id, user.token).then((res) => {
      toast.success("Added to wishlist");
      history.push("/user/wishlist");
    });
  };

  return (
    <>
      <div className="col-md-7">
        {images && images.length ? (
          <Carousel showArrows={true} autoPlay infiniteLoop>
            {images &&
              images.map((image) => (
                <img src={image.url} alt={image} key={image.public_id} />
              ))}
          </Carousel>
        ) : (
          <Card
            cover={
              <img className="mb-3 card-image" alt="computer" src={Laptop} />
            }
          ></Card>
        )}

        <Tabs type="card">
          <TabPane tab="Description" key="1">
            {description && description}
          </TabPane>
          <TabPane tab="More" key="2">
            Call is on xxx xxx xxxxx to learn more about this product
          </TabPane>
        </Tabs>
      </div>

      <div className="col-md-5">
        <h1 className="bg-info p-3">{title}</h1>
        {product && product.ratings && product.ratings.length > 0 ? (
          ShowAverage(product)
        ) : (
          <div className="text-center pt-1 pb-3">No rating yet</div>
        )}
        <Card
          actions={[
            <Tooltip title={tooltip}>
              <a href="#" onClick={handleAddToCart}>
                <ShoppingCartOutlined className="text-success" /> <br /> Add to
                Cart
              </a>
            </Tooltip>,
            <a href="#" onClick={handleAddToWishlist}>
              <HeartOutlined className="text-info" /> <br />
              Add to Wishlist
            </a>,
            <RatingModal>
              <StarRating
                name={_id}
                numberOfStars={5}
                rating={star}
                changeRating={onStarClick}
                isSelectable={true}
                starRatedColor="red"
              />
            </RatingModal>,
          ]}
        >
          <ProductListItems product={product} />
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;
