import axios from "axios";

export const getCategories = async () =>
  await axios.get(`${process.env.REACT_APP_API}/categories`);

export const getCategory = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/category/${slug}`);

export const removeCategory = async (slug, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/category/${slug}`, {
    headers: {
      authtoken,
    },
  });

export const updateCategory = async (slug, newCategory, authtoken) =>
  await axios.put(
    `${process.env.REACT_APP_API}/category/${slug}`,
    { name: newCategory },
    {
      headers: {
        authtoken,
      },
    }
  );

export const createCategory = async (category, authtoken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/category`,
    { name: category },
    {
      headers: {
        authtoken,
      },
    }
  );

export const getCategorySubs = async (id) =>
  await axios.get(`${process.env.REACT_APP_API}/category/subs/${id}`);
