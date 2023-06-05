import React, { useEffect, useState } from "react";
import Authentication from "../authentication/authentication";
import Projetos from "../projetos/projetos.component";
import { useUserDetails } from "../../context/usercontext";
import Sidebar from "../../components/sidebar/sidebar.component";
import { Container, Row, Col } from "reactstrap";
import "./home.styles.scss";
import Backlog from "../backlog/backlog.component";
import Painel from "../painel/painel.component";
import Roteiro from "../roteiro/roteiro.component";
import { useProjectDetails } from "../../context/projectContext";

const Home = () => {
  const [userDetails] = useUserDetails();
  const [projectDetails] = useProjectDetails();

  const [menuItem, setMenuItem] = useState(0);

  return (
    <div className="home">
      {userDetails.accessToken ? (
        <div className="container-home">
          <Row>
            <Col className="sidebar" sm={2}>
              <Sidebar menuItem={menuItem} setMenuItem={setMenuItem} />
            </Col>
            <Col className="body-home">
              {menuItem === 0 && <Projetos />}
              {menuItem === 1 && <Backlog />}
              {menuItem === 2 && <Painel />}
              {menuItem === 3 && <Roteiro />}
            </Col>
          </Row>
        </div>
      ) : (
        <Authentication />
      )}
    </div>
  );
};

export default Home;

//
