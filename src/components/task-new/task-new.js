import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
//import "./task-new.css";


const Newtask = () => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [idtask, setIdtask] = useState('');
  const [taskName, setTaskName] = useState('');
  const [managerName, setManagerName] = useState('');
  const [status, setStatus] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [taskdesc, setTaskdesc] = useState('');
  const [error, setError] = useState('');
  const handleCreate = () => {
   
    if (!idtask | !taskName | !managerName | !startDate | !endDate | !taskdesc) {
      setError("Preencha todos os campos");
      return;
    } 

    /*const res = addTask (idtask, nametask, namedev, dataini, datafim, taskdesc);
      if (res) {
      setError(res);
      return;
    }*/

    alert("Tarefa criada com sucesso!");

  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Nova Tarefa
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cadastro de nova tarefa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Id</Form.Label>
              <Form.Control
                type='number' 
                placeholder= 'Digite o id'   
                value={idtask}
                onChange={(e) => [setIdtask(e.target.value), setError("")]} 
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nome da tarefa</Form.Label>
              <Form.Control
                type='name' 
                placeholder= 'Digite o nome da tarefa' 
                value={taskName}
                onChange={(e) => [setTaskName(e.target.value), setError("")]}
                autoFocus
              />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Responsável</Form.Label>
              <Form.Select aria-label="Default select example"
              
              onChange={(e) => [setManagerName(e.target.value), setError("")]}
              >
                <option>Abra o menu de seleção</option>
                <option value="1">Eduardo</option>
                <option value="2">Bruno</option>
                <option value="3">Alberto</option>
                <option value="4">Rebeca</option>
              </Form.Select>
            </Form.Group>

            <div className='prazo'>
                <Form.Group  controlId="exampleForm.ControlInput1">
                  <Form.Label>Data início</Form.Label>
                  <Form.Control
                    type="date"
                    autoFocus
                    value={startDate}
                    onChange={(e) => [setStartDate(e.target.value), setError("")]}
                  />
                </Form.Group>
                <Form.Group  controlId="exampleForm.ControlInput1">
                  <Form.Label>Data fim</Form.Label>
                  <Form.Control
                    type="date"
                    autoFocus
                    value={endDate}
                    onChange={(e) => [setEndDate(e.target.value), setError("")]}
                  />
                </Form.Group>
            </div>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Descrição</Form.Label>
              <Form.Control 
                as = "textarea" 
                rows={3} 
                value={taskdesc}
                onChange={(e) => [setTaskdesc(e.target.value), setError("")]}
              />
              <Form.Label className='labelError'>{error}</Form.Label>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={ handleCreate }>
            Criar tarefa
          </Button>
          <Button variant="primary" onClick={ handleClose }>
            Sair
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Newtask