import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import CompUfba from "../../../Assets/qmgqqq5s.png";
import "./login.scss";

function Login() {
  return (
    <Container className="container-login">
      <Row>
        <Col className="col-left" sm={3} />

        <Col className="col-center" sm={9}>
          <h1>Sistema de Gestão de Projetos</h1>
          <Row className="row-form-login">
            <Col xl={8} xxl={6}>
              <h2>Login</h2>
              <Form className="form-login">
                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    className="email-placeholder"
                  />
                </Form.Group>

                <Form.Group className="senha" controlId="password">
                  <Form.Label>Senha</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Senha"
                    className="place-holder-text"
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button className="mt-3" type="submit" variant="primary">
                    Entrar <faBeer />
                  </Button>
                </div>
                <Col className="cadastre-esqueci-senha">
                  <Link className="register" to="/register/">
                    Cadastre-se
                  </Link>
                  <Link className="esqueci" to="#">
                    Esqueci a Senha
                  </Link>
                </Col>
              </Form>
            </Col>
            <Col className="col-right" sm={4}>
              <img src={CompUfba} alt="Computação Ufba" />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
