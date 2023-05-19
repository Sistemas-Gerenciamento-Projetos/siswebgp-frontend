import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { checkPasswordComplexity } from "../../utils/index";

const Registration = ({ handleCadastro }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const registerButtonEnabled = name && email && password && confirmPassword;

  const [passwordGood, setPasswordGood] = useState(false);

  useEffect(() => {
    if (checkPasswordComplexity(password, confirmPassword).length === 0) {
      setPasswordGood(true);
    } else {
      setPasswordGood(false);
    }
  }, [name, email, password, confirmPassword, passwordGood]);

  return (
    <Form className="form-cont">
      <Form.Group controlId="name">
        <Form.Control
          type="name"
          placeholder="Nome completo"
          className="form-item"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="email">
        <Form.Control
          type="email"
          placeholder="Email"
          className="form-item"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="Password">
        <Form.Control
          type="password"
          placeholder="Senha"
          className="form-item"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="ConfirmPassword">
        <Form.Control
          type="password"
          placeholder="Confirmar senha"
          className="form-item"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </Form.Group>
      <div className="d-grid mt-3 ">
        <Button type="submit" onClick={handleCadastro}>
          Cadastrar
        </Button>
      </div>

      {/* Falta estilizar corretamente {passwordGood ? (
              <div>Senha forte o suficiente</div>
            ) : (
              <Alert>
                {checkPasswordComplexity(password, confirmPassword).map((e) => {
                  if (e) {
                    console.log(e);
                    return <p key={e}>{e}</p>;
                  } else <div></div>;
                })}
              </Alert>
            )} */}
    </Form>
  );
};

export default Registration;
