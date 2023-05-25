import React, { useState } from "react";
import { useEffect } from "react";
import FormLogin from "../../components/form-login/login";
import CompUfba from "../../Assets/comp-ufba.png"

import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import FormRegister from "../../components/form-register/form-register.component";
import "./authentication.scss";

const Authentication = () => {
  const info = {
    1: "Login",
    2: "Registre-se",
  };

  const [isRegistered, setIsRegistered] = useState(true);

  const handleRegister = () => {
    setIsRegistered(!isRegistered);
  };

  return (
    <Container fluid className="authentication">
      <Row>
        <Col className="col-left" sm={3} />

        <Col className="col-center" sm={9}>
          <h1>Sistema de Gestão de Projetos</h1>
          <Row className="row-form">
            <Col xl={6}>
              {isRegistered && (
                <>
                  <h2>{info[1]}</h2>
                  <FormLogin />
                  <div className="d-grid mt-3 ">
                    <p>
                      Ainda não possui cadastro?{" "}
                      <Link onClick={handleRegister}>Cadastre-se</Link>
                    </p>
                  </div>
                </>
              )}
              {!isRegistered && (
                <>
                  <h2>{info[2]}</h2>
                  <FormRegister handleRegister={handleRegister} />
                  <p className="mt-3">
                    Já possui cadastro?{" "}
                    <Link onClick={handleRegister}>Login</Link>
                  </p>
                </>
              )}
            </Col>
            <Col className="col-right" sm={4}>
              <img src={CompUfba} alt="Computação Ufba" />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Authentication;
