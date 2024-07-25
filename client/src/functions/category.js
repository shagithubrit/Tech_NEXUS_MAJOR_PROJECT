import axios from "axios";


// to get the full list of categories
export const getCategories = async () =>
  await axios.get(`${process.env.REACT_APP_API}/categories`);


// to get the single categories
export const getCategory = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/category/${slug}`);


// to remove the single category depending on slug value
export const removeCategory = async (slug, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/category/${slug}`, {
    headers: {
      authtoken,
    },
  });


  // to update the category with the updated name 
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
