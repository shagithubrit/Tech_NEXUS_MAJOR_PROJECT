import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct } from "../../../functions/product";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import { getCategories, getCategorySubs } from "../../../functions/category";
import FileUpload from "../../../components/forms/FileUpload";
import { Avatar, Badge } from "antd";
import axios from "axios";
import { Spin } from "antd";

// const initialState = {
//   title: "",
//   description: "",
//   price: 0,
//   categories: [],
//   category: "",
//   subs: [],
//   shipping: "",
//   quantity: 0,
//   images: [],
//   colors: ["Black", "Brown", "Silver", "White", "Blue"],
//   brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "Asus"],
//   color: "",
//   brand: "",
// };

const initialState = {
  title: "",
  description: "",
  price: 2000,
  categories: [],
  category: "",
  subs: [],
  shipping: "Yes",
  quantity: 100,
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "Asus"],
  color: "Silver",
  brand: "Apple",
};

const ProductCreate = () => {
  const authtoken = useSelector((state) => state.user.token);
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [showSub, setShowSub] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));

  let isMounted = useRef(true);
  const loadCategories = useCallback(async () => {
    try {
      const categories = await getCategories();
      if (isMounted.current)
        setValues({ ...values, categories: categories.data });
    } catch (err) {
      console.log(err);
    }
  }, [values]);

  useEffect(() => {
    loadCategories();
    return () => {
      isMounted.current = false;
    };
  }, [loadCategories]);

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(values, user.token)
      .then((res) => {
        console.log(res);
        window.alert(`${res.data.title} is created`);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        // if (err.response.status === 400)
        //     toast.error(err.response.data);
        toast.error(err.response.data.err);
      });
  };
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleCategoryChange = async (e) => {
    e.preventDefault();

    if (e.target.value === "select") {
      setValues({ ...values, category: "" });
      setShowSub(false);
    } else {
      setValues({ ...values, subs: [], category: e.target.value });
      try {
        const res = await getCategorySubs(e.target.value);
        setSubOptions(res.data);
      } catch (err) {
        console.log(err);
      }
      setShowSub(true);
    }
  };

  const handleRemove = async (imageId) => {
    setLoading(true);
    try {
      await axios.post(
        `${process.env.REACT_APP_API}/removeimages`,
        { public_id: imageId },
        {
          headers: {
            authtoken,
          },
        }
      );
      const filteredImages = values.images.filter(
        (img) => img.public_id !== imageId
      );
      setValues({ ...values, images: filteredImages });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log("Error removing image:", err);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10 pt-2">
          <h4>Product Create</h4>
          <div className="p-2">
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />
          </div>
          {loading ? (
            <div className="text-center">
              <Spin size="large" />
            </div>
          ) : (
            <div className="text-center">
              {values.images?.map((img) => (
                <Badge
                  key={img.public_id}
                  count="X"
                  size="large"
                  style={{ backgroundColor: "#108ee9", cursor: "pointer" }}
                  offset={[-10, 10]}
                  onClick={() => handleRemove(img.public_id)}
                >
                  <Avatar
                    src={img.url}
                    size={60}
                    className="m-2"
                    shape="round"
                  />
                </Badge>
              ))}
            </div>
          )}
          <ProductCreateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            handleCategoryChange={handleCategoryChange}
            values={values}
            setValues={setValues}
            subOptions={subOptions}
            showSub={showSub}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
