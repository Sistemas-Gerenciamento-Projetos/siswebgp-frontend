import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap';

function Taskdescription(args) {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="info" onClick={toggle}>
        Info
      </Button>
      <Modal isOpen={modal} toggle={toggle} {...args}>
        <ModalHeader toggle={toggle}>Descrição da Tarefa</ModalHeader>
        <ModalBody>
          Descrição da Tarefa
        </ModalBody>
      </Modal>
    </div>
  );
}

export default Taskdescription;