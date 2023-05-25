import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { useUserDetails } from "../../context/usercontext";
import { sigin } from "../../utils/login";

function Login() {
  const [userDetails, updateUserDetails] = useUserDetails();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (
      !email ||
      email === " " ||
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email) ||
      !password ||
      password === " " ||
      password.length < 8
    )
      newErrors.email = "Verifique seus dados.";
    return newErrors;
  };

  useEffect(() => {
    if (loading) {
      setIsLogged(sigin(email, password, userDetails, updateUserDetails));
    }
  }, [loading, email]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formErrors = validateForm();

    if (
      Object.keys(formErrors).length > 0 &&
      !sigin(email, password, userDetails, updateUserDetails)
    ) {
      setErrors(formErrors);
      setLoading(false);
    } else {
      setLoading(true);
    }
  };

  useEffect(() => {
    if (isLogged) {
      <Navigate replace to="/" />;
    }
  }, [isLogged, setIsLogged]);

  return (
    <Form className="form-cont">
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
          isInvalid={!!errors.email}
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
