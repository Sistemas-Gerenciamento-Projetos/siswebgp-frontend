import React, { useState } from "react";
import { useEffect } from "react";
import FormLogin from "../../components/form-login/login";
import FormRegister from "../../components/form-register/register";
import "./authentication.scss";
import CompUfba from "../../assets/comp-ufba.png";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Authentication = () => {
  const info = {
    1: "Login",
    2: "Cadastro",
  };
  const [isLogged, setIsLogged] = useState(false);

  const handleCadastro = () => {
    setIsLogged(!isLogged);
  };

  return (
    <Container fluid className="authentication">
      <Row>
        <Col className="col-left" sm={3} />

        <Col className="col-center" sm={9}>
          <h1>Sistema de Gestão de Projetos</h1>
          <Row className="row-form">
            <Col xl={6}>
              {isLogged && (
                <>
                  <h2>{info[1]}</h2>
                  <FormLogin />
                  <div className="d-grid mt-3 ">
                    <p>
                      Ainda não possui cadastro?{" "}
                      <Link onClick={handleCadastro}>Cadastre-se</Link>
                    </p>
                  </div>
                </>
              )}
              {!isLogged && (
                <>
                  <h2>{info[2]}</h2>
                  <FormRegister handleCadastro={handleCadastro} />
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
