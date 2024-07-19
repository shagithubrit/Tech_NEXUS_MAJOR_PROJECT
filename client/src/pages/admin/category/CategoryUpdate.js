import React, { useCallback, useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategory, updateCategory } from "../../../functions/category";
import CategoryForm from "../../../components/forms/CategoryForm";

const CategoryUpdate = ({ history, match }) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.user);

  const slug = match.params.slug;

  const loadCategory = useCallback(async () => {
    try {
      const res = await getCategory(slug);
      setName(res.data.name);
    } catch (err) {
      console.log(err);
    }
  }, [slug]);

  useEffect(() => {
    loadCategory();
  }, [loadCategory]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await updateCategory(slug, name, user.token);
      setLoading(false);
      setName("");
      toast.success(`"${res.data.name}" is updated`);
      history.push("/admin/category");
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
        <div className="col pt-2">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>Update Category</h4>
          )}
          <CategoryForm
            name={name}
            setName={setName}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryUpdate;
