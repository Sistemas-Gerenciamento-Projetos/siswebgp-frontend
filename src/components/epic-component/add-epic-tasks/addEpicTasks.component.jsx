import React from 'react';
import { Modal, Tab, Tabs } from 'react-bootstrap';
import BindTask from './bind-task/bindTask.component';

export default function AddEpicTasks({ show, setShow, epicId }) {
  function handleClose() {
    setShow(!show);
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Visualizar tarefas</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tabs
          defaultActiveKey="tasks"
          id="uncontrolled-tab-example"
          className="mb-6"
        >
          <Tab eventKey="visualize" title="Tarefas"></Tab>
          <Tab eventKey="add-task" title="Vincular tarefa">
            <BindTask epicId={epicId} />
          </Tab>
        </Tabs>
      </Modal.Body>
    </Modal>
  );
}
