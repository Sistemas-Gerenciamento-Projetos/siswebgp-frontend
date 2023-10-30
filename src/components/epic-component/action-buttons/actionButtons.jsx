import React, { useState } from 'react';
import TrashIcon from '../../../Assets/trash.svg';
import EditIcon from '../../../Assets/edit.svg';
import { Modal, Button } from 'react-bootstrap';
import { useUserDetails } from '../../../context/usercontext';
import { useProjectDetails } from '../../../context/projectContext';
import { deleteEpic } from '../../../services/epics/deleteEpics';
import { showErrorToast, showSuccessToast } from '../../../utils/Toasts';

function ActionButtons({ setShowEdit, onRefreshEpics, epicId }) {
  const [show, setShow] = useState(false);
  const [userDetails] = useUserDetails();
  const [projectDetails] = useProjectDetails();

  const handleDelete = () => {
    deleteEpic(userDetails.accessToken, projectDetails.projectId, epicId)
      .then((data) => {
        onRefreshEpics();
        showSuccessToast('Épico excluído');
        handleClose();
      })
      .catch((error) => {
        console.log(error);
        showErrorToast('Erro ao excluir épico');
      });
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEdit = () => {
    setShowEdit(true);
  };

  return (
    <div>
      <Button
        variant="outline-light"
        style={{ border: 0 }}
        onClick={(e) => {
          e.stopPropagation();
          handleEdit();
        }}
      >
        <img src={EditIcon} />
      </Button>
      <Button
        variant="outline-light"
        onClick={(e) => {
          e.stopPropagation();
          handleShow();
        }}
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
