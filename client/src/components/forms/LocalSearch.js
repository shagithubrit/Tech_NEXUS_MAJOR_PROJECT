import React from "react";

const LocalSearch = ({ keyword, setKeyword }) => {
  const handleSearch = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  return (
    <input
      type="search"
      placeholder="Filter"
      value={keyword}
      onChange={handleSearch}
      className="form-control mt-4 mb-2"
    />
  );
};

export default LocalSearch;
