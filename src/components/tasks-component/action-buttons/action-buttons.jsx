import React, { useState } from 'react';
import TrashIcon from '../../../Assets/trash.svg';
import EditIcon from '../../../Assets/edit.svg';
import { Modal, Button } from 'react-bootstrap';
import { useUserDetails } from '../../../context/usercontext';
import { useProjectDetails } from '../../../context/projectContext';
import { deleteTask } from '../../../services/tasks/deleteTask';

function ActionButtons({ setShowEdit, onRefreshTasks, taskId }) {
  const [show, setShow] = useState(false);
  const [userDetails] = useUserDetails();
  const [projectDetails] = useProjectDetails();

  const handleDelete = () => {
    console.log(projectDetails.projectId);
    deleteTask(userDetails, projectDetails, taskId, onRefreshTasks);
    handleClose();
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEdit = () => {
    setShowEdit(true);
    console.log('edit');
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
        onClick={handleShow}
        style={{ border: 0 }}
      >
        <img src={TrashIcon} />
      </Button>
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Confirme a operação</Modal.Title>
          </Modal.Header>
          <Modal.Body>Tem certeza que deseja excluir?</Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleDelete}>
              Excluir
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Cancelar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </div>
  );
}

export default ActionButtons;
