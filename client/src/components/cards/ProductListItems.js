import React from "react";
import { Link } from "react-router-dom";

const ProductListItems = ({ product }) => {
  const { price, category, subs, shipping, color, brand, sold, quantity } =
    product;

  return (
    <ul className="list-group">
      <li className="list-group-item">
        Price{" "}
        <span className="label label-default label-pill float-end">
          $ {price}
        </span>
      </li>
      {category && (
        <li className="list-group-item">
          Category{" "}
          <Link
            to={`/category/${category.slug}`}
            className="label label-default label-pill float-end"
          >
            {category.name}
          </Link>
        </li>
      )}
      {subs && (
        <li className="list-group-item">
          Sub Categories{" "}
          {subs.map((sub, index) => (
            <Link
              key={index}
              to={`/sub/${sub.slug}`}
              className="label label-default label-pill float-end"
            >
              {sub.name}
            </Link>
          ))}
        </li>
      )}
      <li className="list-group-item">
        Shipping{" "}
        <span className="label label-default label-pill float-end">
          {shipping}
        </span>
      </li>
      <li className="list-group-item">
        Color{" "}
        <span className="label label-default label-pill float-end">
          {color}
        </span>
      </li>
      <li className="list-group-item">
        Brand{" "}
        <span className="label label-default label-pill float-end">
          {brand}
        </span>
      </li>
      <li className="list-group-item">
        Available{" "}
        <span className="label label-default label-pill float-end">
          {quantity}
        </span>
      </li>
      <li className="list-group-item">
        Sold{" "}
        <span className="label label-default label-pill float-end">{sold}</span>
      </li>
    </ul>
  );
};

export default ProductListItems;
