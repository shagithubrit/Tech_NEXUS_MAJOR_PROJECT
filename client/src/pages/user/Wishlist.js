import React, { useState, useEffect } from "react";
import UserNav from "../../components/nav/UserNav";
import { getWishlist, removeWishlist } from "../../functions/user";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useCallback } from "react";
import { DeleteOutlined } from "@ant-design/icons";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const { user } = useSelector((state) => state);

  const loadWishlist = useCallback(
    () =>
      getWishlist(user.token).then((res) => {
        setWishlist(res.data.data.wishlist);
        console.log(res.data.data.wishlist);
      }),
    [user.token]
  );

  useEffect(() => {
    loadWishlist();
  }, [loadWishlist]);

  const handleRemove = (productId) =>
    removeWishlist(productId, user.token).then((res) => {
      loadWishlist();
    });

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col">
          <h4>Wishlist</h4>
          {wishlist.map((product) => (
            <div key={product._id} className="alert alert-secondary">
              <Link to={`/product/${product.slug}`}>{product.title}</Link>
              <span
                className="btn btn-sm float-end"
                onClick={() => handleRemove(product._id)}
              >
                <DeleteOutlined className="text-danger" />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
