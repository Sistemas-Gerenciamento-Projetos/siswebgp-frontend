import React from "react";
import Toolbar from "../../components/toolbar/toolbar.component";
import Board from "../../components/board/board.component";
import { Navigate } from "react-router-dom";
import { useUserDetails } from "../../context/usercontext";
import { useProjectDetails } from "../../context/projectContext";
import { ToastContainer } from "react-toastify";

const Painel = () => {
  const [userDetails] = useUserDetails();
  const [projectDetails] = useProjectDetails();

  if (!userDetails.accessToken) {
    return <Navigate replace to="/" />;
  }

  return (
    <>
      <Toolbar title={projectDetails.projectName} />
      <Board />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="colored"
      />
    </>
  );
};

export default Painel;
