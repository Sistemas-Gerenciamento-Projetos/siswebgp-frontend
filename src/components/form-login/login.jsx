import React, { useEffect, useState } from "react";
import { Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
// import "./login.scss";
import { useUserDetails } from "../../context/usercontext";
import { LOGIN_ENDOPOINT } from "../../constants/urls";
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
    <Form className="form-cont" onSubmit={submitHandler}>
      <Form.Group controlId="email">
        <Form.Control
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-item"
        />
      </Form.Group>

      <Form.Group className="senha" controlId="password">
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
          className="form-item"
        />
      </Form.Group>
      <div className="d-grid">
        <Button type="submit" variant="primary" disabled={false}>
          Entrar
        </Button>
      </div>
    </Form>
  );
}

export default Login;
