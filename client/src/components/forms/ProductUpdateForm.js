import React from "react";
import { Select } from "antd";

const { Option } = Select;

const ProductUpdateForm = ({
  handleChange,
  handleSubmit,
  values,
  setValues,
  handleCategoryChange,
  categories,
  subOptions,
  arrayOfSubIds,
  setArrayOfSubIds,
  selectedCategory,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          name="title"
          className="form-control mt-2 mb-2"
          value={values.title}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <input
          type="text"
          name="description"
          className="form-control mt-2 mb-2"
          value={values.description}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Price</label>
        <input
          type="number"
          name="price"
          className="form-control mt-2 mb-2"
          value={values.price}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Shipping</label>
        <select
          value={values.shipping === "Yes" ? "Yes" : "No"}
          name="shipping"
          className="form-control  mt-2 mb-2"
          onChange={handleChange}
        >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group">
        <label>Quantity</label>
        <input
          type="number"
          name="quantity"
          className="form-control mt-2 mb-2"
          value={values.quantity}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Colors</label>
        <select
          name="color"
          value={values.color}
          className="form-control mt-2 mb-2"
          onChange={handleChange}
        >
          {values.colors.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Brands</label>
        <select
          name="brand"
          value={values.brand}
          className="form-control mt-2 mb-2"
          onChange={handleChange}
        >
          {values.brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Categories</label>
        <select
          name="category"
          value={selectedCategory ? selectedCategory : values.category._id}
          className="form-control mt-2 mb-2"
          onChange={handleCategoryChange}
        >
          {categories.length > 0 &&
            categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
        </select>
      </div>
      <div>
        <label>Sub Categories</label>
        <Select
          mode="multiple"
          allowClear
          style={{ width: "100%" }}
          placeholder="Please select"
          value={arrayOfSubIds}
          onChange={(value) => setArrayOfSubIds(value)}
        >
          {subOptions.length &&
            subOptions.map((sub) => (
              <Option key={sub._id} value={sub._id}>
                {sub.name}
              </Option>
            ))}
        </Select>
      </div>

      <button type="submit" className="btn btn-outline-info mt-3">
        Update
      </button>
    </form>
  );
};

export default ProductUpdateForm;
