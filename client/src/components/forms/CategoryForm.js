import React from "react";

const CategoryForm = ({
  placeholder = "Add category",
  name,
  setName,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          name="name"
          type="text"
          className="form-control mt-2 mb-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
          required
          placeholder={placeholder}
        />
        <button className="btn btn-outline-primary">Save</button>
      </div>
    </form>
  );
};

export default CategoryForm;
