import React, { useState } from "react";
import TrashIcon from "../../../Assets/trash.svg";
import EditIcon from "../../../Assets/edit.svg";
import { Modal, Button } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { useUserDetails } from "../../../context/usercontext";
import { useProjectDetails } from "../../../context/projectContext";
import { deleteTask } from "../../../services/tasks/deleteTask";

function ActionButtons({ setShowEdit, onRefreshTasks, taskId }) {
  const [showForm, setShowForm] = useState(false);
  const [userDetails] = useUserDetails();
  const [projectDetails] = useProjectDetails();

  const handleDelete = () => {
    deleteTask(userDetails, projectDetails, taskId, onRefreshTasks);
    handleClose();
  };

  const handleClose = () => setShowForm(false);
  const handleShow = () => setShowForm(true);

  const handleEdit = () => {
    setShowEdit(true);
  };

  const deleteTaskTooltip = (props) => (
    <Tooltip {...props}>Excluir tarefa.</Tooltip>
  );

  const editTaskTooltip = (props) => (
    <Tooltip {...props}>Editar tarefa.</Tooltip>
  );

  return (
    <div>
      <OverlayTrigger
        placement="left"
        delay={{ show: 250, hide: 250 }}
        overlay={editTaskTooltip}>
        <Button
          variant="outline-light"
          style={{ border: 0 }}
          onClick={handleEdit}>
          <img src={EditIcon} />
        </Button>
      </OverlayTrigger>
      <OverlayTrigger
        placement="left"
        delay={{ show: 250, hide: 250 }}
        overlay={deleteTaskTooltip}>
        <Button
          variant="outline-light"
          onClick={handleShow}
          style={{ border: 0 }}>
          <img src={TrashIcon} />
        </Button>
      </OverlayTrigger>
      <>
        <Modal show={showForm} onHide={handleClose}>
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
