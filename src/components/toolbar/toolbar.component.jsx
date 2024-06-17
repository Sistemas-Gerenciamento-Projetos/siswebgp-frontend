import React, { useState } from 'react';
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
import { Form } from 'react-bootstrap';
import {
  Backlog,
  Dashboard,
  Epics,
  Painel,
  Projects,
  Roteiro,
} from '../../constants/menuItem';

const Toolbar = ({ menuItem, setShowBacklog, setShowEpics, title }) => {
  const [projectDetails, updateProjectDetails] = useProjectDetails();
  const [userDetails, updateUserDetails] = useUserDetails();
  const [selectedProject, setSelectedProject] = useState(
    projectDetails.projectId ? projectDetails.projectId : '',
  );
  const nav = useNavigate();
  const projects = JSON.parse(localStorage.getItem('projects'));

  const logoutHandler = () => {
    localStorage.removeItem('userDetails');
    localStorage.removeItem('projectId');
    localStorage.removeItem('projectName');
    localStorage.removeItem('sidebarCollapsed');
    localStorage.removeItem('projects');
    updateUserDetails(false, false, false);
    updateProjectDetails('', '', '', '', '');
    nav('/');
  };

  function isBacklogOrEpicsPage() {
    return menuItem === 2 || menuItem === 5;
  }

  async function updateSelectedProject(selectedProjectId) {
    const project = projects.find((value) => value.id == selectedProjectId);
    updateProjectDetails(
      project.id,
      project.project_name,
      project.manager_name,
      project.manager,
      project.manager_email,
    );

    setSelectedProject(selectedProjectId);
    switch (menuItem) {
      case Dashboard:
        nav(`/projects/${selectedProjectId}/dashboard`);
        break;
      case Backlog:
        nav(`/projects/${selectedProjectId}/backlog`);
        break;
      case Painel:
        nav(`/projects/${selectedProjectId}/painel`);
        break;
      case Roteiro:
        nav(`/projects/${selectedProjectId}/roteiro`);
        break;
      case Epics:
        nav(`/projects/${selectedProjectId}/epics`);
        break;
    }
  }

  return (
    <Root>
      <ManagerInfo>
        <ManagerInfoTitle>{menuItem !== 0 ? 'Gerente: ' : ''}</ManagerInfoTitle>
        {menuItem !== 0 && <ManagerPhoto name={projectDetails.managerName} />}
      </ManagerInfo>

      <TitleDiv>
        {menuItem === 0 ? (
          <Title>{title}</Title>
        ) : (
          <Form.Select
            value={selectedProject}
            onChange={(e) => {
              updateSelectedProject(e.target.value);
            }}
          >
            {projects.map((project) => {
              return (
                <option value={project.id} key={project.id}>
                  {project.project_name}
                </option>
              );
            })}
          </Form.Select>
        )}
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
  menuItem: PropTypes.number.isRequired,
};

export default Toolbar;
