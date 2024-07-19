import React from "react";
import { Card } from "antd";
import laptop from "../../images/laptop.png";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Meta } = Card;

const AdminComponentCard = ({ product, handleRemove }) => {
  const { title, description, images, slug } = product;

  return (
    <Card
      hoverable
      className="p-1"
      style={{ width: 250 }}
      cover={
        <img
          style={{
            width: "200px",
            height: "150px",
            objectFit: "cover",
            margin: "0 auto",
          }}
          alt="computer"
          src={images?.length ? images[0].url : laptop}
        />
      }
      actions={[
        <Link to={`/admin/product/${slug}`}>
          <EditOutlined className="text-warning" />
        </Link>,
        <DeleteOutlined
          onClick={() => handleRemove(slug)}
          className="text-danger"
        />,
      ]}
    >
      <Meta title={title} description={`${description?.substring(0, 40)}...`} />
    </Card>
  );
};

export default AdminComponentCard;
