import React from "react";
import { Button } from "reactstrap";
import styles from "./toolbarStyles.component";
import { useUserDetails } from "../../context/usercontext";
import { useNavigate } from "react-router-dom";

function isProjectsPage(title) {
  return title === "Meus projetos";
}

const Toolbar = ({ title, novoProjeto }) => {
  const [userDetails, updateUserDetails] = useUserDetails();
  const nav = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("userDetails");
    localStorage.removeItem("projectId");
    localStorage.removeItem("projectName");
    updateUserDetails(false, false, false);
    nav("/");
  };

  return (
    <div style={styles.root}>
      <div style={styles.titleDiv}>
        <h3 style={styles.title}>{title}</h3>
        {isProjectsPage(title) && (
          <Button color="primary" onClick={() => novoProjeto(false)}>
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
