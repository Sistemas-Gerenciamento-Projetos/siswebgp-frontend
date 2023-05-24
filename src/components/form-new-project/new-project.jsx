import React, { useState } from "react"
import { Form, Button, InputGroup, Badge, } from "react-bootstrap"
import "./new-project.scss"
import axios from "axios"
import { Navigate } from "react-router-dom"

const jsonExample = {
  "manager": "bbf36179-6550-452c-8322-dc12abd27a52",
  "project_name": "Sistema de Gerência de Projetos",
  "description": "Projeto para o software de sistema de gerenciamento de projetos",
  "deadline_date": "2023-07-31",
  "users": [
    "2d9dcff9-6448-4b02-b603-786408c62035",
    "bbf36179-6550-452c-8322-dc12abd27a52"
  ]
}

function handleRegisterProject(managerId, title, description, beginDate, endDate) {
  console.log(title)
  console.log(description)
  console.log(endDate)
  const parsedTitle = title.trim()
  const parsedDate = endDate == "" ? null : endDate.toISOString().split('T')[0]

  const header = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg0OTUyMjA2LCJpYXQiOjE2ODQ5NTE5MDYsImp0aSI6IjBiYzY4ZjVkNmI0ZjRmZDFhZjMwMzA3NGViN2ZjYTA2IiwidXNlcl9pZCI6IjBiMzA1OGE2LTU0ZjYtNDQzOS04NWJmLTE2MWUxMmY2NDUxNiJ9.sPvqt4bRtFkSV2OXC9Qmt4Ayo3tSKkZ2X5anYVkP874`
    }
  }

  axios.post(
    "http://127.0.0.1:8000/api/projects/", // Colocar no arquivo de constants
    {
      manager: "0b3058a6-54f6-4439-85bf-161e12f64516", // trocar pelo que vem no context
      project_name: parsedTitle,
      description: description,
      deadline_date: parsedDate,
      users: ["0b3058a6-54f6-4439-85bf-161e12f64516"] // trocar pelo que vem no context
    },
    header
  ).then((response) => {
    if (response.status == 201) {
      console.log(response)
      redirectPage()
    } else {
      // Montar feedback caso ocorra algum erro na requisição
    }
  }).catch((error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    // retornar alert com mensagem generica de erro
    alert(error)
  })
}

const redirectPage = () => {
  <Navigate replace to="/projetos/" />;
};

const Registration = ({ handleCadastro }) => {
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

    handleRegisterProject("", title, description, beginDate, endDate);
  }

  return (
    <Form className="main-novo-projeto" noValidate validated={validated} onSubmit={handleSubmit}>

      {/* Tem um bug na validação de string com espaços em branco, o form nega o seguimento mas o feedback visual é de correto */}
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
