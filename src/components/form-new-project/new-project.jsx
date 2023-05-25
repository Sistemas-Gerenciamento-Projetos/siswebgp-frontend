import React, { useState } from "react"
import { Form, Button, InputGroup, Badge, } from "react-bootstrap"
import "./new-project.scss"

const Registration = ({ handleRegisterProject }) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [beginDate, setBeginDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [validated, setValidated] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    event.stopPropagation()

    const form = event.currentTarget
    if (form.checkValidity() === false) {
      setValidated(true)
      return
    }

    handleRegisterProject(title, description, beginDate, endDate);
  }

  return (
    <Form className="main-form-new-project" noValidate validated={validated} onSubmit={handleSubmit}>

      {/* Tem um bug visual na validação de string com espaços em branco, o form nega o seguimento mas o feedback visual é de correto */}
      <Form.Group controlId="title">
        <Form.Label>Título:</Form.Label>
        <InputGroup hasValidation>
          <Form.Control
            type="text"
            className="form-item"
            required
            isInvalid={title.trim() === ""}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Título inválido.
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>

      <Form.Group controlId="description">
        <Form.Label>Descrição:</Form.Label>
          <Form.Control
            as="textarea"
            maxLength={200}
            rows={3}
            type="text"
            className="form-item"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Badge 
            className='form-item' 
            bg={`${description.length > 200 ? 'danger' : 'primary'}`}>
              {description.length}/{200}
          </Badge>
      </Form.Group>

      <Form.Group>
        <Form.Label>Data de Início:</Form.Label>
        <Form.Control
          type="date"
          required
          className="form-item"
          value={beginDate}
          onChange={(e) => setBeginDate(e.target.value)}
        />
        <Form.Control.Feedback type="invalid">
            Preencha a data de início.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="endDate">
        <Form.Label>Data de Fim:</Form.Label>

        <InputGroup hasValidation>
          <Form.Control
            type="date"
            isValid={Date.parse(beginDate) < Date.parse(endDate)}
            min={beginDate === "" ? new Date().toISOString().split('T')[0] : beginDate}
            disabled={beginDate === ""}
            className="form-item"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            A data de fim não pode ser anterior a data de início.
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
      <div className="d-grid mt-4">
        <Button type="submit">
          Cadastrar
        </Button>
      </div>
    </Form>
  );
};

export default Registration
