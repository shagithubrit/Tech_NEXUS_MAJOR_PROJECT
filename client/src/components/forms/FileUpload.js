import React from "react";
import Resizer from "react-image-file-resizer";
import { useSelector } from "react-redux";
import axios from "axios";

const FileUpload = ({ values, setValues, setLoading }) => {
  const user = useSelector((state) => state.user);

  const fileUploadAndResize = (e) => {
    const files = e.target.files;
    const allUploadedFiles = values.images;

    if (files) {
      setLoading(true);
      Array.from(files).map((file) =>
        Resizer.imageFileResizer(
          file,
          720,
          720,
          "JPEG",
          100,
          0,
          async (uri) => {
            try {
              const res = await axios.post(
                `${process.env.REACT_APP_API}/uploadimages`,
                {
                  image: uri,
                },
                {
                  headers: {
                    authtoken: user ? user.token : "",
                  },
                }
              );
              setLoading(false);
              allUploadedFiles.push(res.data);
              setValues({ ...values, images: allUploadedFiles });
            } catch (err) {
              console.log("Cloudinary upload error: ", err);
              setLoading(false);
            }
          },
          "base64"
        )
      );
    }
  };

  return (
    <div className="row">
      <label className="btn btn-primary w-auto">
        Choose Images
        <input
          type="file"
          multiple
          accept="images/*"
          onChange={fileUploadAndResize}
          hidden
        />
      </label>
    </div>
  );
};

export default FileUpload;
