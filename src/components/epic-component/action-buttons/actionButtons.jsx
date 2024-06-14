import React, { useState } from 'react';
import { Modal, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useUserDetails } from '../../../context/usercontext';
import { useProjectDetails } from '../../../context/projectContext';
import { deleteEpic } from '../../../services/epics/deleteEpics';
import { showErrorToast, showSuccessToast } from '../../../utils/Toasts';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

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

  const editTooltip = <Tooltip id="tooltip">Editar épico</Tooltip>;
  const deleteTooltip = <Tooltip id="tooltip">Deletar épico</Tooltip>;

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <OverlayTrigger placement="bottom" overlay={editTooltip}>
        <Button
          variant="outline-dark"
          style={{ border: 0 }}
          onClick={(e) => {
            e.stopPropagation();
            handleEdit();
          }}
        >
          <EditOutlined />
        </Button>
      </OverlayTrigger>

      <OverlayTrigger placement="bottom" overlay={deleteTooltip}>
        <Button
          variant="outline-dark"
          onClick={(e) => {
            e.stopPropagation();
            handleShow();
          }}
          style={{ border: 0 }}
        >
          <DeleteOutlined />
        </Button>
      </OverlayTrigger>

      <>
        <Modal
          onClick={(e) => e.stopPropagation()}
          show={show}
          onHide={handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirme a operação</Modal.Title>
          </Modal.Header>
          <Modal.Body>Tem certeza que deseja excluir?</Modal.Body>
          <Modal.Footer>
            <Button
              variant="danger"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
            >
              Excluir
            </Button>
            <Button
              variant="primary"
              onClick={(e) => {
                e.stopPropagation();
                handleClose();
              }}
            >
              Cancelar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </div>
  );
}

export default ActionButtons;
