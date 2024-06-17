import React, { useState } from 'react';
import ProjetosView from './ProjetosView';
import { useUserDetails } from '../../context/usercontext';
import { useProjectDetails } from '../../context/projectContext';
import { getProjects } from '../../services/projects/getProjects';
import { showErrorToast, showInfoToast } from '../../utils/Toasts';
import { Navigate } from 'react-router-dom';

export default function ProjetosController() {
  const [userDetails, updateUserDetails] = useUserDetails();
  const [projectDetails, updateProjectDetails] = useProjectDetails();

  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);

  function onRefreshProjects() {
    setLoading(true);
    getProjects(userDetails.accessToken)
      .then((data) => {
        setProjects(data);
        localStorage.setItem('projects', JSON.stringify(data));
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        let errorString = 'Erro ao buscar projetos';
        console.log(error);

        if (error.response.status === 401) {
          errorString = 'Sessão expirada';
          updateUserDetails(null);
        }

        showErrorToast(errorString);
      });
  }

  function onClickProject(
    projectId,
    projectName,
    managerName,
    managerId,
    managerEmail,
  ) {
    updateProjectDetails(
      projectId,
      projectName,
      managerName,
      managerId,
      managerEmail,
    );
  }

  if (!userDetails.accessToken) {
    return navigateToLogin();
  }

  function navigateToLogin() {
    <Navigate replace to="auth/" />;
  }

  function showProgressInfoAlert() {
    showInfoToast(
      'O progresso do projeto é calculado através da soma de todos os épicos e tarefas criados e dividido pelo número de épicos e tarefas concluídos',
    );
  }

  return (
    <ProjetosView
      projectDetails={projectDetails}
      projects={projects}
      loading={loading}
      onRefreshProjects={onRefreshProjects}
      showProgressInfoAlert={showProgressInfoAlert}
      onClickProject={onClickProject}
    />
  );
}
