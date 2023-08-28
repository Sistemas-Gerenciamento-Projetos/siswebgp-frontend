import React, { useEffect, useState } from 'react';
import { Modal, Tab, Tabs } from 'react-bootstrap';
import BindTask from './bind-task/bindTask.component';
import { getTasksWithoutEpic } from '../../../services/tasks/getTasksWithoutEpic';
import { useUserDetails } from '../../../context/usercontext';
import { useProjectDetails } from '../../../context/projectContext';

export default function AddEpicTasks({ show, setShow, epicId }) {
  const [tasks, setTasks] = useState([]);
  const [tasksFiltered, setTasksFiltered] = useState([]);
  const [update, setUpdate] = useState(false);
  const [userDetails] = useUserDetails();
  const [projectDetails] = useProjectDetails();

  useEffect(() => {
    getTasksWithoutEpic(userDetails.accessToken, projectDetails.projectId)
      .then((data) => {
        setTasks(data);
        setTasksFiltered(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [update]);

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
            <BindTask
              epicId={epicId}
              tasks={tasks}
              tasksFiltered={tasksFiltered}
              setTasksFiltered={setTasksFiltered}
              update={update}
              setUpdate={setUpdate}
            />
          </Tab>
        </Tabs>
      </Modal.Body>
    </Modal>
  );
}
