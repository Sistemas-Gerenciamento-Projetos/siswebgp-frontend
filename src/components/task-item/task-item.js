import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Taskstatus from '../task-status/task-status.component';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const Taskitem = () => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [taskName, setTaskName] = useState('');
  const [managerName, setManagerName] = useState('');
  const [status, setStatus] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [taskdesc, setTaskdesc] = useState('');

  return (
    <div >
      {/*
      <Button variant="primary" onClick={handleShow}>
        Nova Tarefa
      </Button>*/}

      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Cadastro de nova tarefa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nome da tarefa</Form.Label>
              <Form.Control
                type='name' 
                placeholder= 'Digite o nome da tarefa' 
                value={taskName}
                onChange={(e) => [setTaskName(e.target.value)]}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Responsável</Form.Label>
              <Form.Select aria-label="Default select example"
              onChange={(e) => [setManagerName(e.target.value)]}
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
                    value={startDate}
                    onChange={(e) => [setStartDate(e.target.value)]}
                  />
                </Form.Group>
              </Col>
              <Col xs={6} md={4}>
                <Form.Group  controlId="exampleForm.ControlInput1">
                  <Form.Label>Data fim</Form.Label>
                  <Form.Control
                    type="date"
                    autoFocus
                    value={endDate}
                    onChange={(e) => [setEndDate(e.target.value)]}
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
            
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Descrição</Form.Label>
              <Form.Control 
                as = "textarea" 
                rows={3} 
                value={taskdesc}
                onChange={(e) => [setTaskdesc(e.target.value)]}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary">
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

export default Taskitem