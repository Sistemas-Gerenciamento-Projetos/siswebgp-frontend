import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Taskstatus from '../task-status/task-status.component';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useUserDetails } from "../../context/usercontext";
import { TASKS_CREATE_ENDPOINT } from "../../constants/urls"
import axios from "axios"
import { Navigate } from "react-router-dom";

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
  const [epic, setEpic] = useState('');
  
  const [userDetails, updateUserDetails] = useUserDetails();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

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
          TASKS_CREATE_ENDPOINT,
          {
            project: project,
            title: title,
            description: description,
            creation_date: beginDate,
            deadline_date: deadlineDate,
            status: status,
          },
          req_config
        )
        .then((response) => {
          localStorage.setItem("userDetails", JSON.stringify(response.data));
          console.log("Login Sucessful" + userDetails);
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
  }, [loading, title, description, beginDate, deadlineDate, updateUserDetails]);

  const redirectPage = () => {
    //chamar a função login para acesso ao sistema
    <Navigate replace to="/backlog/" />;
  };

  useEffect(() => {
    console.log("teste show");
  }, [show, setShow]);

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
          <Form onSubmit={submitHandler}> 
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
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit" >
            Criar tarefa
          </Button>
          <Button variant="primary" onClick={ handleClose }>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Newtask