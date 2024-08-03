import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getProduct, updateProduct } from "../../../functions/product";
import { getCategories, getCategorySubs } from "../../../functions/category";
import FileUpload from "../../../components/forms/FileUpload";
import { Avatar, Badge } from "antd";
import axios from "axios";
import { Spin } from "antd";
import ProductUpdateForm from "../../../components/forms/ProductUpdateForm";
// import { useParams } from "react-router-dom";

const initialState = {
  title: "",
  description: "",
  price: "",
  category: "",
  subs: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "Asus"],
  color: "",
  brand: "",
};

const ProductCreate = ({ match, history }) => {
  const authtoken = useSelector((state) => state.user.token);
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [arrayOfSubIds, setArrayOfSubIds] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);

  //   let { slug } = useParams();
  const { slug } = match.params;
  let isMounted = useRef(true);

  const loadProduct = useCallback(() => {
    getProduct(slug)
      .then((product) => {
        if (isMounted.current) {
          setValues({ ...values, ...product.data });

          getCategorySubs(product.data.category._id).then((res) => {
            setSubOptions(res.data);
          });

          // for the array of subs in product update  for the particular category id 
          let arr = [];
          product.data.subs.forEach((sub) => arr.push(sub._id));
          setArrayOfSubIds((prev) => arr);
        }
      })
      .catch((err) => console.log(err));
  }, [slug, values]);

  //   const loadProduct = useCallback(async () => {
  //     const product = await getProduct(slug);
  //     setValues({ ...values, ...product.data });
  //     const subs = await getCategorySubs(product._id);
  //     setSubOptions(subs.data);
  //   }, [slug]);

  const loadCategories = useCallback(async () => {
    try {
      const categories = await getCategories();
      if (isMounted.current) setCategories(categories.data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    loadProduct();
    loadCategories();

    return () => {
      isMounted.current = false;
    };
  }, [loadProduct, loadCategories]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    values.subs = arrayOfSubIds;
    values.category = selectedCategory ? selectedCategory : values.category;

    try {
      const res = await updateProduct(slug, values, authtoken);
      setLoading(false);
      toast.success(`"${res.data.title}" is updated`);
      history.push("/admin/products");
    } catch (err) {
      setLoading(false);
      console.log(err);
      toast.error(err.response.data.err);
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = async (e) => {
    e.preventDefault();

    setValues({ ...values, subs: [] });
    setSelectedCategory(e.target.value);

    try {
      const res = await getCategorySubs(e.target.value);
      setSubOptions(res.data);
      setArrayOfSubIds([]);

      // if user changes then returns to his original category, then repopulate the subs
      if (values.category._id === e.target.value) {
        isMounted.current = true;
        loadProduct();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemove = async (imageId) => {
    setLoading(true);
    try {
      await axios.post(
        `${process.env.REACT_APP_API}/removeimage`,
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
          <h4>Product Update</h4>
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
                    size={120}
                    className="m-2"
                    shape="square"
                  />
                </Badge>
              ))}
            </div>
          )}
          <ProductUpdateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            setValues={setValues}
            values={values}
            handleCategoryChange={handleCategoryChange}
            categories={categories}
            subOptions={subOptions}
            arrayOfSubIds={arrayOfSubIds}
            setArrayOfSubIds={setArrayOfSubIds}
            selectedCategory={selectedCategory}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
