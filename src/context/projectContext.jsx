import { createContext, useContext, useState, useMemo } from "react"

const ProjectDetails = createContext()

export function useProjectDetails() {
  const context = useContext(ProjectDetails)
  if (!context) {
    throw new Error("useProjectDetails must be used within a ProjectDetailsProvider")
  }
  return context
}

export function ProjectDetailsProvider(props) {
  var projectId = localStorage.getItem("projectId") 
  ? localStorage.getItem("projectId")
  : ""

  const [projectDetails, setProjectDetails] = useState({projectId: projectId,});

  const value = useMemo(() => {
    function updateProjectDetails(projectId) {
      localStorage.setItem("projectId", projectId)
      setProjectDetails(projectId)
    }
    return [{ ...projectDetails }, updateProjectDetails];
  }, [projectDetails])

  return <ProjectDetails.Provider value={value} {...props} />;
}
