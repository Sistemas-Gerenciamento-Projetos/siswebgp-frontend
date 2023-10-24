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
import { useUserDetails } from '../../context/usercontext';

const Toolbar = ({ menuItem, setShowBacklog, setShowEpics, title }) => {
  const [projectDetails, updateProjectDetails] = useProjectDetails();
  const [userDetails, updateUserDetails] = useUserDetails();
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

  function isBacklogOrEpicsPage() {
    return menuItem === 2 || menuItem === 5;
  }

  return (
    <Root>
      <ManagerInfo>
        <ManagerInfoTitle>{menuItem !== 0 ? 'Gerente: ' : ''}</ManagerInfoTitle>
        {menuItem !== 0 && <ManagerPhoto name={projectDetails.managerName} />}
      </ManagerInfo>

      <TitleDiv>
        <Title>{title}</Title>
      </TitleDiv>
      <ExitButtonDiv>
        {isBacklogOrEpicsPage() && (
          <Button
            style={{ marginRight: '10px', border: '0px' }}
            color="primary"
            outline
            onClick={() => {
              {
                menuItem === 2 ? setShowBacklog(true) : setShowEpics(true);
              }
            }}
          >
            {menuItem === 2 ? 'Nova tarefa' : 'Novo épico'}
          </Button>
        )}
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
