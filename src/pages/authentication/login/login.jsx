import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import CompUfba from "../../../assets/comp-ufba.png";
import "./login.scss";
import { useUserDetails } from "../../../context/usercontext";
import { LOGIN_ENDOPOINT } from "../../../constants/urls";
import axios from "axios";

function Login({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitButtonEnabled, setSubmitButtonEnabled] = useState(false);

  const [userDetails, updateUserDetails] = useUserDetails();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setSubmitButtonEnabled(password && email ? true : false);
  }, [email, password, submitButtonEnabled]);

  useEffect(() => {
    if (loading) {
      const req_config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userDetails.accessToken}`,
        },
      };
      axios
        .post(
          LOGIN_ENDOPOINT,
          {
            email: email,
            password: password,
          },
          req_config
        )
        .then((response) => {
          localStorage.setItem("UserDetails", JSON.stringify(response.data));
          console.log("Login Sucessful");
          updateUserDetails(response.data.access, response.data.refresh);
          setLoading(false);
          setError(false);
          history.push("/");
        })
        .catch((error) => {
          setLoading(false);
          setError(true);
        });
    }
  }, [loading, email, password, updateUserDetails]);

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
  };

  return (
    <Container fluid className="cont-login">
      <Row>
        <Col className="col-left" sm={3} />

        <Col className="col-center" sm={9}>
          <h1>Sistema de Gestão de Projetos</h1>
          <Row className="row-form-login">
            <Col xl={6}>
              <h2>Login</h2>
              <Form className="form-login" onSubmit={submitHandler}>
                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="email-placeholder"
                  />
                </Form.Group>

                <Form.Group className="senha" controlId="password">
                  <Form.Label>Senha</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Senha"
                    className="place-holder-text"
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button
                    className="mt-3"
                    type="submit"
                    value={submitButtonEnabled}
                    disabled={!setSubmitButtonEnabled}
                    variant="primary">
                    Entrar
                  </Button>
                </div>
                <Col className="cadastre-esqueci-senha">
                  <Link className="register" to="/register/">
                    Cadastre-se
                  </Link>
                  <Link className="esqueci-senha" to="#">
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
