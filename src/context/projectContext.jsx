import { createContext, useContext, useState, useMemo } from "react";

const ProjectDetails = createContext();

export function useProjectDetails() {
  const context = useContext(ProjectDetails);
  if (!context) {
    throw new Error(
      "useProjectDetails must be used within a ProjectDetailsProvider"
    );
  }
  return context;
}

export function ProjectDetailsProvider(props) {
  const projectDetailsFromStorage = localStorage.getItem("projectId")
    ? localStorage.getItem("projectId")
    : "";

  const [projectDetails, setProjectDetails] = useState({
    projectId: projectDetailsFromStorage,
  });

  const value = useMemo(() => {
    function updateProjectDetails(projectId) {
      const newProjectDetails = { ...projectDetails };

      newProjectDetails.projectId = projectId;

      localStorage.setItem("projectId", projectId);
      setProjectDetails(newProjectDetails);
    }
    return [{ ...projectDetails }, updateProjectDetails];
  }, [projectDetails]);

  return <ProjectDetails.Provider value={value} {...props} />;
}
