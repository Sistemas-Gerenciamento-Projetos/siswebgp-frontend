import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useUserDetails } from "../../context/usercontext";
import { PROJECTS_CREATE_ENDPOINT } from "../../constants/urls";
import axios from "axios";

import "./new-project.scss";

const Registration = ({ history }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [beginDate, setBeginDate] = useState("");
  const [deadlineDate, setDeadlineDate] = useState("");

  const [userDetails, updateUserDetails] = useUserDetails();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
  };

  // const [submitButtonEnabled, setSubmitButtonEnabled] = useState(false);

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
          PROJECTS_CREATE_ENDPOINT,
          {
            manager: userDetails.name,
            project_name: title,
            description: description,
            creation_date: beginDate,
            deadline_date: deadlineDate,
          },
          req_config
        )
        .then((response) => {
          localStorage.setItem("UserDetails", JSON.stringify(response.data));
          console.log("Login Sucessful" + userDetails);
          updateUserDetails(response.data.access, response.data.refresh);
          setLoading(false);
          setError(false);
          history.push("/projetos/");
        })
        .catch((error) => {
          setLoading(false);
          setError(true);
        });
    }
  }, [loading, title, description, beginDate, deadlineDate, updateUserDetails]);

  return (
    <Form className="main-novo-projeto" onSubmit={submitHandler}>
      <Form.Label htmlFor="text">Título:</Form.Label>
      <Form.Group controlId="text">
        <Form.Control
          type="text"
          className="form-item"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="description">
        <Form.Label htmlFor="text">Descrição:</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          type="text"
          className="form-item"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="text">
        <Form.Label htmlFor="text">Data de Início:</Form.Label>

        <Form.Control
          type="date"
          className="form-item"
          value={beginDate}
          onChange={(e) => setBeginDate(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="ConfirmPassword">
        <Form.Label htmlFor="text">Data de Fim:</Form.Label>

        <Form.Control
          type="date"
          className="form-item"
          value={deadlineDate}
          onChange={(e) => setDeadlineDate(e.target.value)}
        />
      </Form.Group>
      <div className="d-grid mt-4">
        <Button type="submit">Cadastrar</Button>
      </div>
    </Form>
  );
};

export default Registration;
