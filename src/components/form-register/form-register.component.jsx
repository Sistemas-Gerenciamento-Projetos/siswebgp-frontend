import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { checkPasswordComplexity } from "../../utils/index";
import { REGISTRATION_ENDPOINT } from "../../constants/urls";
import { useUserDetails } from "../../context/usercontext";
import axios from "axios";
import { Navigate } from "react-router-dom";

const Registration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [userDetails, updateUserDetails] = useUserDetails();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [show, setShow] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
  };

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
          REGISTRATION_ENDPOINT,
          {
            name: name,
            email: email,
            password: password,
          },
          req_config
        )
        .then((response) => {
          localStorage.setItem("userDetails", JSON.stringify(response.data));
          updateUserDetails(response.data.access, response.data.refresh);
          setLoading(false);
          setError(false);
          setShow(true);
          redirectPage();
        })
        .catch((error) => {
          setLoading(false);
          setError(true);
          console.log("error register - ");
        });
    }
  }, [confirmPassword, name, email, password, loading]);

  // const registerButtonEnabled = name && email && password && confirmPassword;

  const [passwordGood, setPasswordGood] = useState(false);

  // useEffect(() => {
  //   if (checkPasswordComplexity(password, confirmPassword).length === 0) {
  //     setPasswordGood(true);
  //   } else {
  //     setPasswordGood(false);
  //   }
  // }, [name, email, password, confirmPassword, passwordGood]);

  const redirectPage = () => {
    //chamar a função login para acesso ao sistema
    <Navigate replace to="/" />;
  };

  useEffect(() => {
    console.log("teste show");
  }, [show, setShow]);

  return (
    <Form className="form-cont" onSubmit={submitHandler}>
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
        <Button type="submit">Cadastrar</Button>
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
