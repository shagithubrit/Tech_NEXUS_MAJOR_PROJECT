import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";

const Search = () => {
  const dispatch = useDispatch();
  const { search } = useSelector((state) => state);
  const { text } = search;

  const history = useHistory();

  const handleChange = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: e.target.value },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/shop?${text}`);
  };

  return (
    <form
      className="form-inline my-2 my-lg-0"
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "5px",
      }}
    >
      <input
        onChange={handleChange}
        type="search"
        value={text}
        className="form-control mr-sm-2"
        placeholder="Search"
        style={{
          // Increased height to make the search bar thicker
          height: "2.5rem",
          // Adjusted font size for better readability
          fontSize: "1rem",
          // Added padding for better text alignment within the input
          padding: "0.375rem 0.75rem",
          // Added border radius for a softer look
          borderRadius: "0.25rem",
          // Added a subtle border
          border: "1px solid #ced4da",
          // Made the width responsive: min 150px, max 300px, 30% of viewport width between these
          width: "clamp(150px, 30vw, 300px)",
        }}
      />
      <SearchOutlined
        onClick={handleSubmit}
        style={{
          cursor: "pointer",
          // Increased icon size to match the thicker search bar
          fontSize: "1.5rem",
          // Added padding to make the icon easier to click
          padding: "0.375rem",
        }}
      />
    </form>
  );
};

export default Search;
