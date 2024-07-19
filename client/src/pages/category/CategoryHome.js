import React, { useState, useEffect } from "react";
import { getCategory } from "../../functions/category";
import ProductCard from "../../components/cards/ProductCard";

const CategoryHome = ({ match }) => {
  const [category, setCategory] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { slug } = match.params;

  useEffect(() => {
    setLoading(true);
    getCategory(slug)
      .then((res) => {
        setCategory(res.data.category);
        setProducts(res.data.products);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [slug]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          {loading ? (
            <h4
              style={{ backgroundColor: "hsl(0, 0%, 94%)" }}
              className="text-center p-3 mt-5 mb-5 display-5 shadow-4 rounded-3"
            >
              Loading...
            </h4>
          ) : (
            <h4
              style={{ backgroundColor: "hsl(0, 0%, 94%)" }}
              className="text-center p-3 mt-5 mb-5 display-5 shadow-4 rounded-3"
            >
              {products.length} products in '{category.name}' category
            </h4>
          )}
        </div>
      </div>
      <div className="row">
        {products.map((product) => (
          <div className="col-md-4" key={product._id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryHome;
