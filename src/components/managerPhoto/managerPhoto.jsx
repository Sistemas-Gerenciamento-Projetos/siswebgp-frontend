import React from "react";
import styles from "./managerPhotoStyles";
import { UserOutlined } from "@ant-design/icons";

const ManagerPhoto = (props) => {
  const { name } = props;
  return (
    <div style={styles.root} onClick={() => console.log("reponsavel")}>
      <div style={styles.iconDiv}>
        <UserOutlined style={styles.icon} />
      </div>
      <span style={styles.name}>{name}</span>
    </div>
  );
};

export default ManagerPhoto;
