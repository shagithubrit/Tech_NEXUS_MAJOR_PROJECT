import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";

const Search = () => {
  const dispatch = useDispatch();
  const { search } = useSelector((state) => state);
  const { text } = search;

  const history = useHistory();

  //  after user changed  the search and typed something on that we want to push that detail from search bar to the redux store 
  const handleChange = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: e.target.value },
    });
  };

  // when the user clicked the search bar then it will automaticall push them to 

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/shop?${text}`);
  };


    //  in this we are showing the search form 
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
      />
      <SearchOutlined onClick={handleSubmit} style={{ cursor: "pointer" }} />
    </form>
  );
};

export default Search;
