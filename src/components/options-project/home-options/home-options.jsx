import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import InviteUsers from '../form-invite-user/invite-users.component';
import AddNewUser from '../add-new-user/add-new-user';
import './home-options-styles.scss';
import { Modal } from 'react-bootstrap';
import Registration from '../../form-register/form-register.component';

function OptionsProject({ show, setShow }) {
  const handleClose = () => setShow(!show);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Adicionar membros</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tabs
          defaultActiveKey="profile"
          id="uncontrolled-tab-example"
          className="mb-6"
        >
          <Tab
            eventKey="profile"
            title="Adicionar novo membro"
            className="mb-4"
          >
            <AddNewUser handleClose={handleClose} />
          </Tab>
          <Tab eventKey="home" title="Convidar novo membro">
            <InviteUsers handleClose={handleClose} />
          </Tab>
          <Tab eventKey="create" title="Criar novo membro">
            <Registration cameFromProjectPage={true} />
          </Tab>
        </Tabs>
      </Modal.Body>
    </Modal>
  );
}

export default OptionsProject;
