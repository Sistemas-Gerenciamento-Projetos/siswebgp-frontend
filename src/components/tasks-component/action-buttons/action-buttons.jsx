import React, { useState } from 'react';
import TrashIcon from '../../../Assets/trash.svg';
import EditIcon from '../../../Assets/edit.svg';
import { Modal, Button } from 'react-bootstrap';
import { useUserDetails } from '../../../context/usercontext';
import { useProjectDetails } from '../../../context/projectContext';
import { deleteTask } from '../../../services/tasks/deleteTask';
import { showErrorToast, showSuccessToast } from '../../../utils/Toasts';
import { useNavigate, useParams } from 'react-router-dom';

function ActionButtons({ onRefreshTasks, taskId, setShowEditTask }) {
  const [showDeleteTask, setShowDeleteTask] = useState(false);
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

  return (
    <div>
      <Button
        variant="outline-light"
        style={{ border: 0 }}
        onClick={handleEdit}
      >
        <img src={EditIcon} />
      </Button>
      <Button
        variant="outline-light"
        onClick={handleShowDeleteTask}
        style={{ border: 0 }}
      >
        <img src={TrashIcon} />
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
    </div>
  );
}

export default ActionButtons;
