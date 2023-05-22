import React, { useState } from "react"
import Sidebar from "../../components/sidebar/sidebar.component"
import Toolbar from "../../components/toolbar/toolbar.component"
import Newtask from "../../components/task-new/task-new"
import Tasks from "../../components/task/task.component"
import { Table } from "reactstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Taskstatus from "../../components/task-status/task-status.component"
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import "./backlog.component.scss"

const Backlog = () =>{

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [taskName, setTaskName] = useState('');
  const [managerName, setManagerName] = useState('');
  const [status, setStatus] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [taskdesc, setTaskdesc] = useState('');

  const datestart1 = new Date(2023, 2, 1);
  const dateend1 = new Date(2023, 2, 24);

  const tasklist = [
    {
      taskName: "Definição da Arquitetura",
      taskstatus: "Em andamento",
      startDate: datestart1,
      endDate: dateend1,
      managerName: "Alberto Oliveira",
    },
    {
      taskName: "Criação do Banco de Dados",
      taskstatus: "Concluído",
      startDate: datestart1,
      endDate: dateend1,
      managerName: "Eduardo Ferreira",
    },
  ];

  return(
    <div 
      style={{
        display: 'flex', 
        flexDirection: 'row', 
        backgroundColor: '#ebebeb', 
        height: '100vh'
      }}>
      <div 
        style={{
          width: '20%', 
          backgroundColor: '#ffffff', 
          margin: '20px'
        }}>
        <Sidebar menuItem={1}/>
      </div>
      <div 
        style={{
          display: 'flex', 
          flexDirection: 'column', 
          width: '80%', 
          backgroundColor: '#ebebeb', 
          marginRight: '20px'
        }}>
        <Toolbar title={"Projeto 1 - xxx"}/>
          <div className="main">
            <div><Newtask />
            </div>
            <Table hover>
                <thead>
                  <tr>
                    <th>Nome da Tarefa</th>
                    <th>Status</th>
                    <th>Prazo</th>
                    <th>Responsável</th>
                  </tr>
                </thead>
                <tbody  onDoubleClick={handleShow}>
                  {tasklist.map((task) => (
                    <Tasks 
                      taskName={task.taskName}
                      taskstatus={task.taskstatus}
                      startDate={task.startDate}
                      endDate={task.endDate}
                      managerName={task.managerName}
                    />
                  ))}
                </tbody>
            </Table>
          </div>    
      </div>
        <div >
        <Modal show={show} onHide={handleClose} size='lg'>
          <Modal.Header closeButton>
            <Modal.Title>Nome da tarefa</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
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
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" style={{ marginTop: "1rem" }}>
                <Form.Label>Descrição</Form.Label>
                <Form.Control 
                  as = "textarea" 
                  rows={2} 
                  value={taskdesc}
                  onChange={(e) => [setTaskdesc(e.target.value)]}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={ handleClose } >
              Salvar alterações
            </Button>
            <Button variant="primary" onClick={ handleClose }>
              Cancelar
            </Button>
            <Button variant="danger" onClick={ handleClose }>
              Deletar tarefa
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

    </div>
  )
}

export default Backlog