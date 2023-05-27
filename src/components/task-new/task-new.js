import React, { useState, useEffect  } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Taskstatus from '../task-status/task-status';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios"
import { TASKS_CREATE_ENDPOINT } from "../../constants/urls"
import { useUserDetails } from '../../context/usercontext';

const Newtask = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [beginDate, setBeginDate] = useState('');
  const [deadlineDate, setDeadlineDate] = useState('');
  const [status, setStatus] = useState('');
  const [project, setProject] = useState('');
  const [user, setUser] = useState('');

  const [validated, setValidated] = useState(false)
  const [userDetails, updateUserDetails] = useUserDetails();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const submitHandler = (event) => {
    console.log("verificar")
    event.preventDefault()
    event.stopPropagation()

    const form = event.currentTarget
    if (form.checkValidity() === false) {
      setValidated(true)
      return
    }
    creatNewTask(userDetails, title, description,  deadlineDate)

  };

  

  function creatNewTask( userDetails, title, description,  deadlineDate) {
    const parsedTitle = title.trim()
    console.log("criar")
    const header = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userDetails.accessToken}`
      }
    }

    axios.post(
      TASKS_CREATE_ENDPOINT,
      {

        title: parsedTitle,
        description: description,
        deadline_date: deadlineDate,
        status: "TODO",
        user: userDetails.id

       },
      header
    ).then((response) => {
      if (response.status === 201) {
        console.log(response)
        
      } else {
        alert(response.message)
      }
    }).catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data)
        console.log(error.response.status)
        console.log(error.response.headers)
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request)
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message)
      }
      // retornar alert com mensagem generica de erro
      alert("Erro inesperado, tente novamente.")
    })
  }
  

  return (
    <div >
    <Button variant="primary" onClick={handleShow}>
      Nova Tarefa
    </Button>

    <Modal show={show} onHide={handleClose} size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>Cadastro de nova tarefa</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={submitHandler}> 
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Nome da tarefa</Form.Label>
            <Form.Control
              type='text' 
              placeholder= 'Digite o nome da tarefa' 
              value={title}
              onChange={(e) => [setTitle(e.target.value)]}
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Responsável</Form.Label>
            <Form.Select aria-label="Default select example"
              onChange={(e) => [setUser(e.target.value)]}
            >
              <option>Abra o menu de seleção</option>
              <option value="1">Eduardo</option>
              <option value="2">Bruno</option>
              <option value="3">Alberto</option>
              <option value="4">Rebeca</option>
            </Form.Select>
          </Form.Group>
            <Row>
              <Col xs={6} md={4}>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>Data início</Form.Label>
                  <Form.Control 
                    type="date"
                    autoFocus
                    value={beginDate}
                    onChange={(e) => [setBeginDate(e.target.value)]}
                  />
                </Form.Group>
              </Col>
              <Col xs={6} md={4}>
                <Form.Group  controlId="exampleForm.ControlInput1">
                  <Form.Label>Data fim</Form.Label>
                  <Form.Control
                    type="date"
                    autoFocus
                    value={deadlineDate}
                    onChange={(e) => [setDeadlineDate(e.target.value)]}
                  />
                </Form.Group>
              </Col>
              <Col xs={6} md={4}>
                <Form.Group>
                  <Form.Label>Status</Form.Label>
                  <Taskstatus />
                </Form.Group>
              </Col>
            </Row>
          <Form.Group className="mb-3" controlId="description" style={{ marginTop: "1rem" }}>
            <Form.Label>Descrição</Form.Label>
            <Form.Control 
              as = "textarea" 
              rows={2} 
              value={description}
              onChange={(e) => [setDescription(e.target.value)]}
            />
          </Form.Group>
          <Button variant="primary" type="submit">Criar tarefa</Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={ handleClose }>
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  </div>
)
}

export default Newtask