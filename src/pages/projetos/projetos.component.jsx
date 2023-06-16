import React, { useEffect } from "react";
import DashboardItem from "../../components/dashboard/dashboardItem.component";
import Toolbar from "../../components/toolbar/toolbar.component";
import { Table } from "reactstrap";
import { useState } from "react";
import NovoProjeto from "../../components/form-new-project/new-project";
import { useUserDetails } from "../../context/usercontext";
import { Navigate } from "react-router-dom";
import { postProject } from "../../services/projects/postProject";
import { getProjects } from "../../services/projects/getProjects";
import { useProjectDetails } from "../../context/projectContext";
import OptionsProject from "../../components/options-project/home-options/home-options";
import EditProject from "../../components/form-edit-project/edit-project"

const Projetos = () => {
  const [userDetails] = useUserDetails();
  const [projectDetails, updateProjectDetails] = useProjectDetails();
  const [novoProjeto, setNovoProjeto] = useState(true);
  const [projects, setProjects] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    getProjects(userDetails, setProjects);
  }, [novoProjeto]);

  if (!userDetails.accessToken) {
    return <Navigate replace to="/" />;
  }

  function onClickProject(projectId, projectName) {
    updateProjectDetails(projectId, projectName);
  }

  return (
    <>
      <Toolbar title={"Meus projetos"} setIndex={setIndex} />
      {index === 0 && (
        <div>
          <Table>
            <thead>
              <tr>
                <th>Nome do projeto</th>
                <th>Progresso</th>
                <th>Prazo</th>
                <th>Gerente</th>
                <th></th>
              </tr>
            </thead>
            <tbody >
              {projects.map((project) => (
                <DashboardItem
                  key={project.id}
                  onPress={onClickProject}
                  project={project}
                  setIndex={setIndex}
                />
              ))}
            </tbody>
          </Table>
        </div>
      )}
      {index === 1 && (
        <NovoProjeto
          postProject={postProject}
          novoProjeto={novoProjeto}
          setNovoProjeto={setNovoProjeto}
          userDetails={userDetails}
          setIndex={setIndex}
        />
      )}

      {index === 2 && <OptionsProject />}

      {index === 3 && (
        <EditProject
          postProject={postProject}
          novoProjeto={novoProjeto}
          setNovoProjeto={setNovoProjeto}
          userDetails={userDetails}
          setIndex={setIndex}
        />
      )}
    </>
  );
};

export default Projetos;
