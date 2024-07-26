import React from "react";
import Resizer from "react-image-file-resizer";
import { useSelector } from "react-redux";
import axios from "axios";
import { Avatar } from "antd";

const FileUpload = ({ values, setValues, setLoading }) => {
  // steps for file upload
  //1). resize the image -->  using the react resizer
  //2). send back to server to upload to cloudinary
  //3). set url to images[] in the parent component ---> ProductCreate

  const user = useSelector((state) => state.user);

  const fileUploadAndResize = (e) => {
    const files = e.target.files;
    const allUploadedFiles = values.images;

    // step-1 --> sending  files to cloudinary image resizer from the client side

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

          //   step-2 -->  now with the help of that url we'll be sending file to the server at this endpoint  `${process.env.REACT_APP_API}/uploadimages`,
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
    <>
      {/* <div className="row">
      {values.images &&
        values.images.map((image) => (
          <Avatar key={image.public_id} src={image.url} size={100} />
        ))}
    </div> */}
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
    </>
  );
};

export default FileUpload;
