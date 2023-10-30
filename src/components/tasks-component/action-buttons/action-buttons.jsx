import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useUserDetails } from '../../../context/usercontext';
import { useProjectDetails } from '../../../context/projectContext';
import { deleteTask } from '../../../services/tasks/deleteTask';
import { showErrorToast, showSuccessToast } from '../../../utils/Toasts';
import { useNavigate, useParams } from 'react-router-dom';
import {
  DeleteOutlined,
  EditOutlined,
  TrophyOutlined,
} from '@ant-design/icons';
import NewEpicForm from '../../epic-component/new-epic/newEpicForm.component';

function ActionButtons({ onRefreshTasks, taskId, setShowEditTask, epicId }) {
  const [showDeleteTask, setShowDeleteTask] = useState(false);
  const [showCreateEpic, setShowCreateEpic] = useState(false);
  const [userDetails] = useUserDetails();
  const [projectDetails] = useProjectDetails();
  const { projectId } = useParams();
  const navigate = useNavigate();

  const handleDelete = () => {
    deleteTask(
      userDetails.accessToken,
      projectDetails.projectId,
      projectDetails.projectName,
      projectDetails.managerEmail,
      taskId,
    )
      .then((data) => {
        onRefreshTasks();
        showSuccessToast('Tarefa excluída');
        handleClose();
      })
      .catch((error) => {
        console.log(error);
        showErrorToast('Erro ao excluir tarefa');
      });
  };

  const handleCloseDeleteTask = () => setShowDeleteTask(false);
  const handleShowDeleteTask = () => setShowDeleteTask(true);

  const handleEdit = () => {
    navigate(`/projects/${projectId}/backlog/${taskId}/edit`);
    setShowEditTask(true);
  };

  function handleEpicClick() {
    if (epicId == null) {
      setShowCreateEpic(true);
    }
  }

  return (
    <div>
      {epicId === null ? (
        <Button
          variant="outline-dark"
          style={{ border: 0 }}
          onClick={handleEpicClick}
        >
          <TrophyOutlined />
        </Button>
      ) : (
        <></>
      )}

      <Button variant="outline-dark" style={{ border: 0 }} onClick={handleEdit}>
        <EditOutlined />
      </Button>
      <Button
        variant="outline-dark"
        onClick={handleShowDeleteTask}
        style={{ border: 0 }}
      >
        <DeleteOutlined />
      </Button>
      <>
        <Modal show={showDeleteTask} onHide={handleCloseDeleteTask}>
          <Modal.Header closeButton>
            <Modal.Title>Confirme a operação</Modal.Title>
          </Modal.Header>
          <Modal.Body>Tem certeza que deseja excluir?</Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleDelete}>
              Excluir
            </Button>
            <Button variant="primary" onClick={handleCloseDeleteTask}>
              Cancelar
            </Button>
          </Modal.Footer>
        </Modal>
      </>

      <NewEpicForm
        show={showCreateEpic}
        setShow={setShowCreateEpic}
        update={false}
        setUpdate={() => {}}
        taskId={taskId}
        onRefreshTasks={onRefreshTasks}
      />
    </div>
  );
}

export default ActionButtons;
