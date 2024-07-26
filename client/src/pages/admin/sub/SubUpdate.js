import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getSub, updateSub } from "../../../functions/sub";
import { getCategories } from "../../../functions/category";
import CategoryForm from "../../../components/forms/CategoryForm";

const CategoryCreate = ({ match, history }) => {
  const user = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [parent, setParent] = useState("");

  const slug = match.params.slug;

  let isMounted = useRef(true);
  const loadCategories = async () => {
    try {
      const categories = await getCategories();
      if (isMounted.current) setCategories(categories.data);
    } catch (err) {
      console.log(err);
    }
  };
  const loadSub = useCallback(async () => {
    try {
      const sub = await getSub(slug);
      if (isMounted.current) {
        setName(sub.data.name);
        setParent(sub.data.parent);
      }
    } catch (err) {
      console.log(err);
    }
  }, [slug]);

  useEffect(() => {
    loadCategories();
    loadSub();
    return () => {
      isMounted.current = false;
    };
  }, [loadSub]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await updateSub(slug, name, parent, user.token);
      setLoading(false);
      setName("");
      toast.success(`"${res.data.name}" is created`);
      history.push("/admin/sub");
    } catch (err) {
      console.log(err);
      err.response.status === 400 && toast.error(err.response.data.message);
      setLoading(false);
    }
  };

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
              onChange={(e) => setParent(e.target.value)}
              value={parent}
            >
              <option>Please select</option>
              {categories.length > 0 &&
                categories.map((cat) => (
                  <option
                    key={cat._id}
                    value={cat._id}
                    selected={cat._id === parent}
                  >
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
        </div>
      </div>
    </div>
  );
};

export default CategoryCreate;
