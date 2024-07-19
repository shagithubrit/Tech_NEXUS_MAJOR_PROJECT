import React, { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import AdminComponentCard from "../../../components/cards/AdminProductCard";
import AdminNav from "../../../components/nav/AdminNav";
import { getProductByCount } from "../../../functions/product";
import { removeProduct } from "../../../functions/product";
import { useSelector } from "react-redux";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.user);

  const isMounted = useRef(true);
  const loadAllProdcuts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getProductByCount(100);
      if (isMounted.current) {
        setProducts(res.data);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAllProdcuts();

    return () => {
      isMounted.current = false;
    };
  }, [loadAllProdcuts]);

  const handleRemove = async (slug) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const res = await removeProduct(slug, user.token);
        loadAllProdcuts();
        toast.error(`${res.data.title} is deleted`);
      } catch (err) {
        console.log(err);
        if (err.response.status === 400) toast.error(err.response.data);
      }
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col mt-3">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>All Products</h4>
          )}
          <div className="row">
            {products.map((product) => (
              <div key={product._id} className="col-md-4 pb-3">
                <AdminComponentCard
                  product={product}
                  handleRemove={handleRemove}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
