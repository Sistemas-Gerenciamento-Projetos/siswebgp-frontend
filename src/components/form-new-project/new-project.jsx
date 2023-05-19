import React, { useState, useEffect } from "react";
import { Container, Row, Form, Button } from "react-bootstrap";
import "./new-project.scss";

const Registration = ({ handleCadastro }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [beginDate, setBeginDate] = useState("");
  const [endDate, setEndDate] = useState("");

  return (
    <Form className="main-novo-projeto">
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
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </Form.Group>
      <div className="d-grid mt-4">
        <Button type="submit" onClick={handleCadastro}>
          Cadastrar
        </Button>
      </div>
    </Form>
  );
};

export default Registration;
