import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { useUserDetails } from "../../context/usercontext";
import { sigin } from "../../utils/login";

function Login() {
  const [userDetails, updateUserDetails] = useUserDetails();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isError, setIsError] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (
      !email ||
      email === " " ||
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
    )
      newErrors.password = "Verifique seu email.";
    if (!password || password === " " || password.length < 8)
      newErrors.error = "Verifique seus dados.";

    return newErrors;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      if (sigin(email, password, userDetails, updateUserDetails))
        <Navigate replace to="/" />;
      else {
        console.log("error");
        formErrors.error = "Verifique seus dados.";
      }
    }
  };

  useEffect(() => {}, isError);

  return (
    <Form className="form-cont" autoComplete="off">
      <Form.Group controlId="email">
        <Form.Control
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-item"
          isInvalid={!!isError}
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
          isInvalid={!!isError}
        />
      </Form.Group>
      <Form.Control.Feedback type="invalid">
        {errors.password}
      </Form.Control.Feedback>

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
