import React, { useState, useEffect } from "react";
import { getProductByCount, fetchProductsByFilter } from "../functions/product";
import { getCategories } from "../functions/category";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/cards/ProductCard";
import { Menu, Slider, Checkbox, Radio } from "antd";
import {
  DollarOutlined,
  DownSquareOutlined,
  StarOutlined,
} from "@ant-design/icons";
import Star from "../components/forms/Star";
import { getSubs } from "../functions/sub";

const { SubMenu } = Menu;

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [star, setStar] = useState("");
  const [subs, setSubs] = useState([]);
  const [sub, setSub] = useState("");
  const brands = ["Apple", "Samsung", "Microsoft", "Lenovo", "Asus"];
  const [brand, setBrand] = useState("");
  const colors = ["Black", "Brown", "Silver", "White", "Blue"];
  const [color, setColor] = useState("");
  const [shipping, setShipping] = useState("");

  const dispatch = useDispatch();
  const { search } = useSelector((state) => state);
  const { text } = search;



  // reset all values
  const resetAllFilters = () => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setCategoryIds([]);
    setPrice([0, 0]);
    setBrand("");
    setColor("");
    setShipping("");
  };

  // 1. load products by default on page load
  const loadAllProducts = () => {
    getProductByCount(12).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    loadAllProducts();
    // fetch categories
    getCategories().then((res) => setCategories(res.data));
    // fetch sub categories
    getSubs().then((res) => setSubs(res.data));
  }, []);

  // 2. load products on user search input
  const fetchProducts = (arg) => {
    fetchProductsByFilter(arg).then((res) => {
      setProducts(res.data);
    });
  };

  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts({ query: text });
    }, 300);

    //  we want this slight delay beacuse we don't want much api request

    return () => clearTimeout(delayed);
  }, [text]);

  // 3. load products based on price range
  const handleSlider = (value) => {
    //we ca also dispatch empty text of query in the redux store so as to get the new filter states
    resetAllFilters();
    setPrice(value);
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  useEffect(() => {
    fetchProducts({ price });
  }, [ok]);

  // 4. load products based on categories
  // show categories in a list of checkboxes
  const showCategories = () =>
    categories.map((cat) => (
      <div key={cat._id}>
        <Checkbox
          className="pb-2 pl-4 pr-4"
          // this needs to be done so as to get only checked categories it(cat._id) should contain under the categoryIds array
          checked={categoryIds.includes(cat._id)}
          value={cat._id}
          name="category"
          onChange={handleCheck}
        >
          {cat.name}
        </Checkbox>
        <br />
      </div>
    ));

  // handle check for categories
  //  as the user click the check boxes on the above function it will  keep on pushing the id on the in inTheState state without any duplicates
  function handleCheck(e) {
    // here's the explaination  of 1st three lines of the  function
    //let inTheState = [...categoryIds];

    // This creates a new array that is a copy of the current categoryIds state.
    // Using the spread operator (...) ensures we're working with a new array instead of modifying the original state directly, which is a best practice in React.

    // let justChecked = e.target.value;

    // This captures the value of the checkbox that was just clicked.
    // e.target.value contains the ID of the category associated with the checkbox.

    // let foundInTheState = inTheState.indexOf(justChecked);

    // This checks if the category ID of the checkbox that was just clicked is already in the inTheState array.
    // indexOf returns the index of the element if it's found, or -1 if it's not in the array.
    let inTheState = [...categoryIds];
    let justChecked = e.target.value;
    let foundInTheState = inTheState.indexOf(justChecked);

    // if ===-1 it means that it is not present
    if (foundInTheState === -1) {
      inTheState.push(justChecked);
    } else {
      // it means it is clicked twice so we need to remove that category from the array
      inTheState.splice(foundInTheState, 1);
    }
    resetAllFilters();
    setCategoryIds(inTheState);
    fetchProducts({ category: inTheState });
  }

  // 5.show products by star rating
  function handleStarClick(event_num) {
    resetAllFilters();
    setStar(event_num);
    fetchProducts({ stars: star });
  }

  const showStars = () => {
    return (
      <>
        <div className="pr-4 pl-4 pb-2">
          <Star starClick={handleStarClick} numberOfStars={5} />
        </div>
        <div className="pr-4 pl-4 pb-2">
          <Star starClick={handleStarClick} numberOfStars={4} />
        </div>
        <div className="pr-4 pl-4 pb-2">
          <Star starClick={handleStarClick} numberOfStars={3} />
        </div>
        <div className="pr-4 pl-4 pb-2">
          <Star starClick={handleStarClick} numberOfStars={2} />
        </div>
        <div className="pr-4 pl-4 pb-2">
          <Star starClick={handleStarClick} numberOfStars={1} />
        </div>
      </>
    );
  };

  // 6. products by sub category
  const handleSub = (event_sub) => {
    resetAllFilters();
    setSub(event_sub);
    fetchProducts({ sub });
  };

  const showSubs = () =>
    subs.map((sub) => (
      <div
        key={sub._id}
        onClick={() => handleSub(sub)}
        className="p-1 m-1 badge badge-primary"
        style={{ cursor: "pointer" }}
      >
        {sub.name}
      </div>
    ));

  // 7. show products based on brand name
  const handleBrand = (e) => {
    resetAllFilters();
    setBrand(e.target.value);
    fetchProducts({ brand: e.target.value });
  };

  const showBrands = () =>
    brands.map((b, i) => (
      <Radio
        key={`${b}${i}`}
        value={b}
        name={b}
        checked={b === brand}
        onChange={handleBrand}
        className="pb-1 pl-4 pr-4"
      >
        {b}
      </Radio>
    ));

  // 8. show products based on color name
  const handleColor = (e) => {
    setColor(e.target.value);
    fetchProducts({ color: e.target.value });
    setBrand("");
  };

  const showColors = () =>
    colors.map((c, i) => (
      <Radio
        key={`${c}${i}`}
        value={c}
        name={c}
        checked={c === color}
        onChange={handleColor}
        className="pb-1 pl-4 pr-4"
      >
        {c}
      </Radio>
    ));

  // 9. show products based on their shipping availability
  const handleShippingCHange = (e) => {
    resetAllFilters();
    setShipping(e.target.value);
    fetchProducts({ shipping: e.target.value });
  };

  const showShipping = () => (
    <>
      <Checkbox
        className="pb-2 pl-4 pr-4"
        onChange={handleShippingCHange}
        value="Yes"
        checked={shipping === "Yes"}
      >
        Yes
      </Checkbox>
      <Checkbox
        className="pb-2 pl-4 pr-4"
        onChange={handleShippingCHange}
        value="No"
        checked={shipping === "No"}
      >
        No
      </Checkbox>
    </>
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <h4 className="pt-3">Search/Filter</h4>
          <hr />
          <Menu
            defaultOpenKeys={["1", "2", "3", "4", "5", "6", "7"]}
            mode="inline"
          >
            {/* price */}
            <SubMenu
              key="1"
              title={
                <span className="h6">
                  <DollarOutlined style={{ marginRight: "5px" }} />
                  Price
                </span>
              }
            >
              <div>
                <Slider
                  className="ml-4 mr-4"
                  tipFormatter={(value) => `$${value}`}
                  range
                  value={price}
                  onChange={handleSlider}
                  max="4999"
                />
              </div>
            </SubMenu>
            {/* category */}
            <SubMenu
              key="2"
              title={
                <span className="h6">
                  <DownSquareOutlined style={{ marginRight: "5px" }} />
                  Categories
                </span>
              }
            >
              <div>{showCategories()}</div>
            </SubMenu>
            {/* stars */}
            <SubMenu
              key="3"
              title={
                <span className="h6">
                  <StarOutlined style={{ marginRight: "5px" }} /> Rating
                </span>
              }
            >
              <div>{showStars()}</div>
            </SubMenu>

            {/* sub category */}
            <SubMenu
              key="4"
              title={
                <span className="h6">
                  <DownSquareOutlined style={{ marginRight: "5px" }} />
                  Sub Categories
                </span>
              }
            >
              <div>{showSubs()}</div>
            </SubMenu>

            {/* brands */}
            <SubMenu
              key="5"
              title={
                <span className="h6">
                  <DownSquareOutlined style={{ marginRight: "5px" }} /> Brands
                </span>
              }
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                {showBrands()}
              </div>
            </SubMenu>

            {/* colors */}
            <SubMenu
              key="6"
              title={
                <span className="h6">
                  <DownSquareOutlined style={{ marginRight: "5px" }} />
                  Colors
                </span>
              }
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                {showColors()}
              </div>
            </SubMenu>

            {/* shipping */}
            <SubMenu
              key="7"
              title={
                <span className="h6">
                  <DownSquareOutlined style={{ marginRight: "5px" }} />
                  Shipping
                </span>
              }
            >
              <div>{showShipping()}</div>
            </SubMenu>
          </Menu>
        </div>

        <div className="col-md-9">
          {loading ? (
            <h4 className="tex-danger pt-3">Loading...</h4>
          ) : (
            <h4 className="text-danger pt-3">Products</h4>
          )}

          {products.length < 1 && <p>No products found</p>}
          <div className="row pb-5">
            {products.map((product) => (
              <div key={product._id} className="col-md-4 mt-3">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
