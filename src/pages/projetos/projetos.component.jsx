import React, { useEffect } from 'react';
import { useState } from 'react';
import NovoProjeto from '../../components/form-new-project/new-project';
import { useUserDetails } from '../../context/usercontext';
import { Navigate } from 'react-router-dom';
import { postProject } from '../../services/projects/postProject';
import { getProjects } from '../../services/projects/getProjects';
import { useProjectDetails } from '../../context/projectContext';
import OptionsProject from '../../components/options-project/home-options/home-options';
import EditProject from '../../components/form-edit-project/edit-project';
import { ToastContainer } from 'react-toastify';
import { Empty } from 'antd';
import DashboardItem from '../../components/dashboard/dashboardItem.component';
import { Table } from 'reactstrap';

const Projetos = () => {
  const [userDetails, updateUserDetails] = useUserDetails();
  const [projectDetails, updateProjectDetails] = useProjectDetails();
  const [novoProjeto, setNovoProjeto] = useState(true);

  const [projects, setProjects] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    onRefreshProjects();
  }, [novoProjeto]);

  if (!userDetails.accessToken) {
    return navigateToLogin();
  }

  function onClickProject(projectId, projectName) {
    updateProjectDetails(projectId, projectName);
  }

  function onRefreshProjects() {
    getProjects(userDetails, setProjects, updateUserDetails);
  }

  function navigateToLogin() {
    <Navigate replace to="auth/" />;
  }

  return (
    <>
      {index === 0 && projects.length !== 0 && (
        <div>
          <Table>
            <thead>
              <tr>
                <th>
                  <p style={{ fontWeight: '600' }}>Nome do projeto</p>
                </th>
                <th>
                  <p style={{ fontWeight: '600' }}>Progresso</p>
                </th>
                <th>
                  <p style={{ fontWeight: '600' }}>Prazo</p>
                </th>
                <th>
                  <p style={{ fontWeight: '600' }}>Gerente</p>
                </th>
                <th>
                  <p style={{ fontWeight: '600' }}>Ações</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, index) => (
                <DashboardItem
                  key={project.id}
                  onPress={onClickProject}
                  project={project}
                  setIndex={setIndex}
                  onRefreshProjects={onRefreshProjects}
                  index={index}
                />
              ))}
            </tbody>
          </Table>
        </div>
      )}

      {index === 0 && projects.length === 0 && (
        <div
          style={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Empty description="Sem projetos existentes" />
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

      {index === 2 && <OptionsProject setIndex={setIndex} />}

      {index === 3 && (
        <EditProject
          project={
            projects.filter(
              (project) => project.id == projectDetails.projectId,
            )[0]
          }
          novoProjeto={novoProjeto}
          setNovoProjeto={setNovoProjeto}
          setIndex={setIndex}
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
