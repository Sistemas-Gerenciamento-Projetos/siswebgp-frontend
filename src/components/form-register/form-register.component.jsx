import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useUserDetails } from "../../context/usercontext";
import { Navigate, useSubmit } from "react-router-dom";
import { sigin } from "../../services/authorization/login";
import { registerUser } from "../../services/authorization/register-user";

const Registration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_password] = useState("");

  const [userDetails, updateUserDetails] = useUserDetails();

  const [loading, setLoading] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  const [errors, setErrors] = useState({});
  const validateForm = () => {
    const newErrors = {};
    if (!name || name === " ") newErrors.name = "Por favor, insira seu nome.";
    if (
      !email ||
      email === " " ||
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
    )
      newErrors.email = "Por favor, insira seu email corretamente.";
    if (!password || password === " ")
      newErrors.password = "Por favor, insira sua senha.";
    if (password.length < 8)
      newErrors.password = "A senha deve conter 8 digitos.";
    if (password !== confirm_password || confirm_password === " ")
      newErrors.confirm_password = "Confirme sua senha.";

    return newErrors;
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      setLoading(true);
    }

    console.log(formErrors);
  };

  useEffect(() => {
    async function register() {
      if (loading)
        setIsLogged(
          await registerUser(name, email, password, updateUserDetails)
        );
    }
    register();
    setLoading(false);
  }, [loading]);

  useEffect(() => {
    if (isLogged) {
      if (sigin(email, password, userDetails, updateUserDetails)) {
        <Navigate replace to="/" />;
      }
    }
  }, [isLogged]);

  useEffect(() => {
    validateForm();
  }, [errors]);

  return (
    <Form className="form-cont" autoComplete="off">
      <Form.Group controlId="name">
        <Form.Control
          type="name"
          placeholder="Nome completo"
          className="form-item"
          value={name}
          onChange={(e) => setName(e.target.value)}
          isInvalid={!!errors.name}
        />
        {/* <Form.Control.Feedback type="invalid">
          {errors.name}
        </Form.Control.Feedback> */}
      </Form.Group>

      <Form.Group controlId="email">
        <Form.Control
          type="email"
          placeholder="Email"
          className="form-item"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          isInvalid={!!errors.email}
        />
        {/* <Form.Control.Feedback type="invalid">
          {errors.email}
        </Form.Control.Feedback> */}
      </Form.Group>

      <Form.Group controlId="password">
        <Form.Control
          type="password"
          placeholder="Senha"
          className="form-item"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          isInvalid={!!errors.password}
        />
        {/* <Form.Control.Feedback type="invalid">
          {errors.password}
        </Form.Control.Feedback> */}
      </Form.Group>

      <Form.Group controlId="password">
        <Form.Control
          type="password"
          placeholder="Confirmar senha"
          className="form-item"
          value={confirm_password}
          onChange={(e) => setConfirm_password(e.target.value)}
          isInvalid={!!errors.confirm_password}
        />
        {/* <Form.Control.Feedback type="invalid">
          {errors.confirm_password}
        </Form.Control.Feedback> */}
      </Form.Group>
      <div className="d-grid mt-3 ">
        <Button type="submit" onClick={submitHandler}>
          Cadastrar
        </Button>
      </div>
    </Form>
  );
};

export default Registration;
