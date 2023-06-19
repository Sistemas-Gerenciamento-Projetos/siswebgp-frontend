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
import { ToastContainer } from "react-toastify";

const Projetos = () => {
  const [userDetails] = useUserDetails();
  const [projectDetails, updateProjectDetails] = useProjectDetails();
  const [novoProjeto, setNovoProjeto] = useState(true);
  const [projects, setProjects] = useState([]);
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(false);
  const [projectSelected, setProjectSelected] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const buttontask = {
    0: "Cadastrar",
    1: "Salvar alterações",
  };

  
  useEffect(() => {
    getProjects(userDetails, setProjects);
  }, [novoProjeto]);
 
  /*
  useEffect(() => {
    (async () => {
      const projectsfromdb = await getProjects(
        userDetails.accessToken,
        projectDetails.projectId
      );
      setProjects(projectsfromdb);
    })();
  }, [show, refresh]);
 */

  useEffect(() => {
    if (!show) setIndex(0);
  }, [show]);

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
            <tbody>
              {projects.map((project) => (
                <DashboardItem
                  key={project.id}
                  onPress={onClickProject}
                  project={project}
                  setIndex={setIndex}
                  setRefresh={setRefresh}
                  refresh={refresh}
                  setShow={setShow}
                  setProjectSelected={setProjectSelected}
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
          textButton={buttontask[index]}
          actionProject={index}
          setShow={setShow}
          show={show}
          project={projectSelected}
          setProjectSelected={setProjectSelected}
        />
      )}

      {index === 2 && <OptionsProject />}

      {index === 3 && (
        <NovoProjeto
        postProject={postProject}
        novoProjeto={novoProjeto}
        setNovoProjeto={setNovoProjeto}
        userDetails={userDetails}
        setIndex={setIndex}
        textButton={buttontask[index]}
        actionProject={index}
        setShow={setShow}
        show={show}
        project={projectSelected}
        setProjectSelected={setProjectSelected}
        />
      )}

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="colored"
      />
    </>
  );
};

export default Projetos;
