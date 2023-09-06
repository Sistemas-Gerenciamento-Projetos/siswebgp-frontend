import { React, createContext, useContext, useState, useMemo } from 'react';

const ProjectDetails = createContext();

export function useProjectDetails() {
  const context = useContext(ProjectDetails);
  if (!context) {
    throw new Error(
      'useProjectDetails must be used within a ProjectDetailsProvider',
    );
  }
  return context;
}

export function ProjectDetailsProvider(props) {
  const projectDetailsFromStorage = localStorage.getItem('projectId')
    ? localStorage.getItem('projectId')
    : '';

  const projectNameFromStorage = localStorage.getItem('projectName')
    ? localStorage.getItem('projectName')
    : '';

  const managerNameFromStorage = localStorage.getItem('managerName')
    ? localStorage.getItem('managerName')
    : '';

  const managerIdFromStorage = localStorage.getItem('managerId')
    ? localStorage.getItem('managerId')
    : '';

  const managerEmailFromStorage = localStorage.getItem('managerEmail')
    ? localStorage.getItem('managerEmail')
    : '';

  const [projectDetails, setProjectDetails] = useState({
    projectId: projectDetailsFromStorage,
    projectName: projectNameFromStorage,
    managerName: managerNameFromStorage,
    managerId: managerIdFromStorage,
    managerEmail: managerEmailFromStorage,
  });

  const value = useMemo(() => {
    function updateProjectDetails(
      projectId,
      projectName,
      managerName,
      managerId,
      managerEmail,
    ) {
      const newProjectDetails = { ...projectDetails };

      newProjectDetails.projectId = projectId;
      newProjectDetails.projectName = projectName;
      newProjectDetails.managerName = managerName;
      newProjectDetails.managerId = managerId;
      newProjectDetails.managerEmail = managerEmail;

      localStorage.setItem('projectId', projectId);
      localStorage.setItem('projectName', projectName);
      localStorage.setItem('managerName', managerName);
      localStorage.setItem('managerId', managerId);
      localStorage.setItem('managerEmail', managerEmail);
      setProjectDetails(newProjectDetails);
    }
    return [{ ...projectDetails }, updateProjectDetails];
  }, [projectDetails]);

  return <ProjectDetails.Provider value={value} {...props} />;
}
