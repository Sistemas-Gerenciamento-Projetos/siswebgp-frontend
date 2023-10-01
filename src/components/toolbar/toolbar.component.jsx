import React from 'react';
import { Button } from 'reactstrap';
import {
  ExitButtonDiv,
  ManagerInfo,
  ManagerInfoTitle,
  Root,
  Title,
  TitleDiv,
} from './toolbar.styles';
import { useNavigate } from 'react-router-dom';
import { useProjectDetails } from '../../context/projectContext';
import PropTypes from 'prop-types';
import ManagerPhoto from '../managerPhoto/managerPhoto';

const Toolbar = ({ menuItem }) => {
  const [projectDetails, updateProjectDetails] = useProjectDetails();
  const nav = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem('userDetails');
    localStorage.removeItem('projectId');
    localStorage.removeItem('projectName');
    console.log(updateUserDetails);
    updateUserDetails(false, false, false);
    updateProjectDetails('', '', '', '', '');
    nav('/');
  };

  const getTitle = () => {
    switch (menuItem) {
      case 0:
        return 'Meus projetos';
      case 1:
        return `${projectDetails.projectName} / Dashboard`;
      case 2:
        return `${projectDetails.projectName} / Backlog`;
      case 3:
        return `${projectDetails.projectName} / Painel`;
      case 4:
        return `${projectDetails.projectName} / Roteiro`;
      case 5:
        return `${projectDetails.projectName} / Épicos`;
    }
  };

  return (
    <Root>
      <ManagerInfo>
        <ManagerInfoTitle>{menuItem !== 0 ? 'Gerente: ' : ''}</ManagerInfoTitle>
        {menuItem !== 0 && <ManagerPhoto name={projectDetails.managerName} />}
      </ManagerInfo>

      <TitleDiv>
        <Title>{getTitle()}</Title>
      </TitleDiv>
      <ExitButtonDiv>
        <Button color="primary" onClick={logoutHandler}>
          Sair
        </Button>
      </ExitButtonDiv>
    </Root>
  );
};

Toolbar.propTypes = {
  setMenuItem: PropTypes.func.isRequired,
  menuItem: PropTypes.number.isRequired,
};

export default Toolbar;
