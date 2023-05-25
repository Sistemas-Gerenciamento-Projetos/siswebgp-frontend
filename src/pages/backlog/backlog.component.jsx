import React from "react";
import Sidebar from "../../components/sidebar/sidebar.component";
import Taskitem from "../../components/taskitem/taskitem";
import { Button } from "reactstrap";
import Toolbar from "../../components/toolbar/toolbar.component";
import "./backlog.styles.scss";
import { Navigate } from "react-router-dom";
import { useUserDetails } from "../../context/usercontext";

const Backlog = () => {
  const [userDetails] = useUserDetails();

  if (!userDetails.accessToken) {
    return <Navigate replace to="/" />;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#ebebeb",
        height: "100vh",
      }}>
      <div style={{ width: "20%", backgroundColor: "#ffffff", margin: "20px" }}>
        <Sidebar menuItem={1} />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "80%",
          backgroundColor: "#ebebeb",
          marginRight: "20px",
        }}>
        <Toolbar title={"Projeto 1 - xxx"} />

        <div
          style={{
            height: "100%",
            backgroundColor: "#ffffff",
            marginTop: "20px",
            marginBottom: "20px",
            padding: "15px",
          }}>
          <Button color="primary">Nova Tarefa</Button>
          <Taskitem />
        </div>
      </div>
    </div>
  );
};

export default Backlog;
