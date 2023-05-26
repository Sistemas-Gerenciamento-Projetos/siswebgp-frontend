import React, { useEffect } from "react"
import DashboardItem from "../../components/dashboard/dashboardItem.component"
import Sidebar from "../../components/sidebar/sidebar.component"
import Toolbar from "../../components/toolbar/toolbar.component"
import { Table } from "reactstrap"
import { useState } from "react"
import NovoProjeto from "../../components/form-new-project/new-project"
import "./projetos.component.scss"
import { useUserDetails } from "../../context/usercontext";
import { Navigate } from "react-router-dom"
import { postProject } from "../../services/projects/postProject"
import { getProjects } from "../../services/projects/getProjects"
import { useProjectDetails } from "../../context/projectContext"

const Projetos = () => {
  const [userDetails, updateUserDetails] = useUserDetails();
  const [projectDetails, updateProjectDetails] = useProjectDetails();
  const [novoProjeto, setNovoProjeto] = useState(true)
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjects(userDetails, setProjects)
  }, [novoProjeto])

  if (!userDetails.accessToken) {
    return <Navigate replace to="/" />;
  }

  function onClickProject(projectId) {
    console.log(projectId)
    updateProjectDetails(projectId);
  }

  return (
    <div className="root">
      <div className="sidebar-div">
        <Sidebar menuItem={0} />
      </div>

      <div className="page-content">
        <Toolbar title={"Meus projetos"} novoProjeto={setNovoProjeto} />
        {novoProjeto && (
          <div className="projects-content">
            <Table hover>
              <thead>
                <tr>
                  <th>Nome do projeto</th>
                  <th>Progresso</th>
                  <th>Prazo</th>
                  <th>Responsável</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((projects) => (
                  <DashboardItem
                    onPress={onClickProject}
                    projectName={projects.project_name}
                    projectProgress={50}
                    startDate={new Date(projects.creation_date)}
                    endDate={new Date(projects.deadline_date)}
                    managerName={projects.manager_name}
                    projectId={projects.id}
                  />
                ))}
              </tbody>
            </Table>
          </div>
        )}
        {!novoProjeto && <NovoProjeto postProject={postProject} novoProjeto={novoProjeto} setNovoProjeto={setNovoProjeto} userDetails={userDetails}/>}
      </div>
    </div>
  )
}

export default Projetos
