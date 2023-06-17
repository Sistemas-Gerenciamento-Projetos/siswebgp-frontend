import React from "react";
import { Button } from "reactstrap";
import styles from "./toolbarStyles.component";
import { useUserDetails } from "../../context/usercontext";
import { useNavigate } from "react-router-dom";
import { useProjectDetails } from "../../context/projectContext";

function isProjectsPage(title) {
  return title === "Meus projetos";
}

const Toolbar = ({ title, setIndex }) => {
  const [userDetails, updateUserDetails] = useUserDetails();
  const [projectDetails, updateProjectDetails] = useProjectDetails();
  const nav = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("userDetails");
    localStorage.removeItem("projectId");
    localStorage.removeItem("projectName");
    updateUserDetails(false, false, false);
    updateProjectDetails("", "")
    nav("/");
  };

  return (
    <div style={styles.root}>
      <div style={styles.titleDiv}>
        <h3 style={styles.title}>{title}</h3>
        {isProjectsPage(title) && (
          <Button color="primary" onClick={() => setIndex(1)}>
            Novo projeto
          </Button>
        )}
      </div>
      <Button color="primary" onClick={logoutHandler}>
        Sair
      </Button>
    </div>
  );
};

export default Toolbar;
