import React, { useState } from "react";
import FormLogin from "../../components/form-login/login";
import CompUfba from "../../Assets/comp-ufba.png";
import LogoSGP from "../../Assets/logo.png";

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
    <Container className="auth-main">
      <Row className="justify-content-md-center">
        <Col className="col-left" sm={6} xl={5}>
          <img className="logo" src={LogoSGP} alt="Computação Ufba" />{" "}
          <img className="logo-ufba" src={CompUfba} alt="Computação Ufba" />{" "}
        </Col>
        <Col className="col-right pl-2" sm={6} xl={5}>
          {isRegistered && (
            <>
              <h2>{info[1]}</h2>
              <FormLogin />
              <div className="d-grid mt-3 ">
                <p>
                  Ainda não possui cadastro?{" "}
                  <Link onClick={handleRegister}>Registre-se</Link>
                </p>
              </div>
            </>
          )}
          {!isRegistered && (
            <>
              <h2>{info[2]}</h2>
              <FormRegister handleRegister={handleRegister} />
              <p className="mt-3">
                Já possui cadastro? <Link onClick={handleRegister}>Login</Link>
              </p>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Authentication;
