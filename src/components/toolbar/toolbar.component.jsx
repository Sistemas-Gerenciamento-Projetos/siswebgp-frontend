import React from "react";
import { Button } from "reactstrap";
import styles from "./toolbarStyles.component";
import { useUserDetails } from "../../context/usercontext";

function isProjectsPage(title) {
  return title === "Meus projetos";
}

const Toolbar = ({ title, novoProjeto }) => {
  const [userDetails, updateUserDetails] = useUserDetails();

  const logoutHandler = () => {
    localStorage.removeItem("userDetails");
    updateUserDetails(false, false);
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
