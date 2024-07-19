import React, { useEffect, useRef, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createSub, getSubs, removeSub } from "../../../functions/sub";
import { getCategories } from "../../../functions/category";
import { Link } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";

const CategoryCreate = () => {
  const user = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [subs, setSubs] = useState([]);

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
  const loadSubs = async () => {
    try {
      const subs = await getSubs();
      if (isMounted.current) setSubs(subs.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadCategories();
    loadSubs();
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await createSub(name, category, user.token);
      loadSubs();
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
        const res = await removeSub(slug, user.token);
        loadSubs();
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
        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>Create Sub Category</h4>
          )}

          <div className="form-group">
            <label className="mb-2">Parent Category</label>
            <select
              name="category"
              className="form-control mb-2"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Please select</option>
              {categories.length > 0 &&
                categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
            </select>
          </div>

          <CategoryForm
            placeholder="Add sub category"
            name={name}
            setName={setName}
            handleSubmit={handleSubmit}
          />
          <LocalSearch keyword={keyword} setKeyword={setKeyword} />
          <hr />
          {subs.filter(searched(keyword)).map((sub) => (
            <div className="alert alert-primary" key={sub._id}>
              {sub.name}{" "}
              <span
                className="btn btn-sm float-end"
                onClick={() => handleRemove(sub.slug)}
              >
                <DeleteOutlined className="text-danger" />
              </span>{" "}
              <Link to={`/admin/sub/${sub.slug}`}>
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
