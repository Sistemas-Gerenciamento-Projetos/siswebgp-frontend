import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { useUserDetails } from "../../context/usercontext";
import { sigin } from "../../utils/login";

function Login() {
  const [userDetails, updateUserDetails] = useUserDetails();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLogged, setIsLogged] = useState(false);

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (
      !email ||
      email === " " ||
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
    ) {
      newErrors.email = "Verifique seu email.";
    }
    if (!password || password === " " || password.length < 8) {
      newErrors.password = "Verifique seus dados.";
    }
    return newErrors;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else if (sigin(email, password, userDetails, updateUserDetails)) {
      setErrors("");
    }
  };

  useEffect(() => {
    if (isLogged) {
      <Navigate replace to="/" />;
    }
  }, [isLogged, setIsLogged]);

  return (
    <Form className="form-cont" autoComplete="off" onSubmit={submitHandler}>
      <Form.Group controlId="email">
        <Form.Control
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-item"
          isInvalid={!!errors.email}
        />
        <Form.Control.Feedback type="invalid">
          {errors.email}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="senha" controlId="password">
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
          className="form-item"
          isInvalid={!!errors.password}
        />
      </Form.Group>

      <div className="d-grid">
        <Button
          type="submit"
          onClick={submitHandler}
          variant="primary"
          disabled={false}>
          Entrar
        </Button>
      </div>
    </Form>
  );
}

export default Login;
