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

  const [projectDetails, setProjectDetails] = useState({
    projectId: projectDetailsFromStorage,
    projectName: projectNameFromStorage,
    managerName: managerNameFromStorage,
  });

  const value = useMemo(() => {
    function updateProjectDetails(projectId, projectName, managerName) {
      const newProjectDetails = { ...projectDetails };

      newProjectDetails.projectId = projectId;
      newProjectDetails.projectName = projectName;
      newProjectDetails.managerName = managerName;

      localStorage.setItem('projectId', projectId);
      localStorage.setItem('projectName', projectName);
      localStorage.setItem('managerName', managerName);
      setProjectDetails(newProjectDetails);
    }
    return [{ ...projectDetails }, updateProjectDetails];
  }, [projectDetails]);

  return <ProjectDetails.Provider value={value} {...props} />;
}
