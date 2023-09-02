import React, { useState } from 'react';
import TrashIcon from '../../Assets/trash.svg';
import EditIcon from '../../Assets/edit.svg';
import AddIcon from '../../Assets/person-add.svg';
import { Modal, Button } from 'react-bootstrap';

export default function ActionButtons({
  addAction,
  editAction,
  deleteAction,
  setShowEdit,
  setIndex,
}) {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    // setShowEdit(false);
  };
  const handleShow = () => setShow(true);

  const handleAdd = () => {
    // addButton();
    console.log('add');
  };
  const handleEdit = () => {
    // editButton();
    // console.log("edit");
    // setShowEdit(true);
    setIndex(1);
    // handleClose();
  };

  const handleDelete = () => {
    deleteAction();
    handleClose();
  };

  return (
    <div>
      <Button variant="outline-light" style={{ border: 0 }} onClick={handleAdd}>
        <img src={AddIcon} />
      </Button>
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
