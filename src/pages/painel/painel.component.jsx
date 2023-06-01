import React from "react";
import Sidebar from "../../components/sidebar/sidebar.component";
import Toolbar from "../../components/toolbar/toolbar.component";
import Board from "../../components/board/board.component";
import { Navigate } from "react-router-dom";
import { useUserDetails } from "../../context/usercontext";
import { useProjectDetails } from "../../context/projectContext";

const Painel = () => {
  const [userDetails] = useUserDetails();
  const [projectDetails] = useProjectDetails();

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
        <Sidebar menuItem={2} />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "80%",
          backgroundColor: "#ebebeb",
          marginRight: "20px",
        }}>
        <Toolbar title={projectDetails.projectName} />

        <div
          style={{
            height: "100%",
            backgroundColor: "#ffffff",
            marginTop: "20px",
            marginBottom: "20px",
            padding: "15px",
          }}>
          <Board />
        </div>
      </div>
    </div>
  );
};

export default Painel;
