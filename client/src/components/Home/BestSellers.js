import { Pagination } from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { getProducts, getProductsCount } from "../../functions/product";
import ProductCard from "../cards/ProductCard";
import LoadingCard from "../cards/LoadingCard";

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productsCount, setProductsCount] = useState(0);
  const [page, setPage] = useState(1);

  const sort = "sold";
  const order = "desc";
  const numProductsToFetch = 3;

  const loadAllProducts = useCallback(async () => {
    setLoading(true);
    try {
      // sort, order, page
      const res = await getProducts(sort, order, page);
      setProducts(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    const getCount = async () => {
      const res = await getProductsCount();
      setProductsCount(res.data);
    };

    getCount();
  }, []);

  useEffect(() => {
    loadAllProducts();
  }, [loadAllProducts, page]);

  const onChangePage = (page) => {
    setPage(page);
  };

  return (
    <>
      <div className="container mt-4">
        {loading ? (
          <LoadingCard count={numProductsToFetch} />
        ) : (
          <div className="row">
            {products.map((product) => (
              <div key={product._id} className="col-md-4">
                <ProductCard product={product} loading={loading} />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="row">
        <nav className="col-md-4 offset-md-4 text-center pt-5 p3">
          <Pagination
            current={page}
            onChange={onChangePage}
            total={Math.ceil(productsCount / 3) * 10}
          />
        </nav>
      </div>
    </>
  );
};

export default BestSellers;
