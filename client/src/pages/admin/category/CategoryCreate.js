import React, { useEffect, useRef, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  createCategory,
  getCategories,
  removeCategory,
} from "../../../functions/category";
import { Link } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";

const CategoryCreate = () => {
  const user = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const [keyword, setKeyword] = useState("");

  let isMounted = useRef(true);
  const loadCategories = async () => {
    try {
      const categories = await getCategories();
      if (isMounted.current) setCategories(categories.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadCategories();
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await createCategory(name, user.token);
      loadCategories();
      setLoading(false);
      setName("");
      toast.success(`"${res.data.name}" is created`);
    } catch (err) {
      console.log(err);
      err.response.status === 400 && toast.error(err.response.data.message);
      setLoading(false);
    }
  };

  const handleRemove = async (slug) => {
    if (window.confirm("Are you sure you want to delete?")) {
      setLoading(true);
      try {
        const res = await removeCategory(slug, user.token);
        loadCategories();
        setLoading(false);
        toast.error(`${res.data.name} deleted`);
      } catch (err) {
        if (err.response.status === 400) toast.error(err.response.data.message);
        setLoading(false);
      }
    }
  };

  const searched = (keyword) => (cat) =>
    cat.name.toLowerCase().includes(keyword);
  // or you can write it like this:
  // const searched = (keyword, cat) => cat.name.toLowerCase().includes(keyword);
  // categories.filter(cat => searched(keyword, cat)).map((cat) => ... on line 111

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col pt-2">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>Create Category</h4>
          )}
          <CategoryForm
            name={name}
            setName={setName}
            handleSubmit={handleSubmit}
          />
          <LocalSearch keyword={keyword} setKeyword={setKeyword} />
          <hr />
          {categories.filter(searched(keyword)).map((cat) => (
            <div className="alert alert-primary" key={cat._id}>
              {cat.name}{" "}
              <span
                className="btn btn-sm float-end"
                onClick={() => handleRemove(cat.slug)}
              >
                <DeleteOutlined className="text-danger" />
              </span>{" "}
              <Link to={`/admin/category/${cat.slug}`}>
                <span className="btn btn-sm float-end">
                  <EditOutlined className="text-danger" />
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryCreate;
