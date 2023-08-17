import React, { useEffect } from 'react';
import { useState } from 'react';
import NovoProjeto from '../../components/form-new-project/new-project';
import { useUserDetails } from '../../context/usercontext';
import { Navigate } from 'react-router-dom';
import { getProjects } from '../../services/projects/getProjects';
import { useProjectDetails } from '../../context/projectContext';
import OptionsProject from '../../components/options-project/home-options/home-options';
import EditProject from '../../components/form-edit-project/edit-project';
import { ToastContainer } from 'react-toastify';
import { Empty, FloatButton } from 'antd';
import DashboardItem from '../../components/dashboard/dashboardItem.component';
import { Table } from 'reactstrap';
import { PlusOutlined } from '@ant-design/icons';

const Projetos = () => {
  const [userDetails, updateUserDetails] = useUserDetails();
  const [projectDetails, updateProjectDetails] = useProjectDetails();
  const [novoProjeto, setNovoProjeto] = useState(true);

  const [projects, setProjects] = useState([]);
  const [index, setIndex] = useState(0);
  const [showNewProject, setShowNewProject] = useState(false);
  const [showEditProject, setShowEditProject] = useState(false);
  const [showInviteUsersToProject, setShowInviteUsersToProject] =
    useState(false);

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
                  onRefreshProjects={onRefreshProjects}
                  index={index}
                  setShowEditProject={setShowEditProject}
                  setShowInviteUsersToProject={setShowInviteUsersToProject}
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

      <NovoProjeto
        onRefreshProjects={onRefreshProjects}
        userDetails={userDetails}
        show={showNewProject}
        setShow={setShowNewProject}
      />

      <OptionsProject
        show={showInviteUsersToProject}
        setShow={setShowInviteUsersToProject}
      />

      {projects.length !== 0 && projectDetails.projectId !== '' && (
        <EditProject
          project={
            projects.filter(
              (project) => project.id == projectDetails.projectId,
            )[0]
          }
          novoProjeto={novoProjeto}
          setNovoProjeto={setNovoProjeto}
          setIndex={setIndex}
          show={showEditProject}
          setShow={setShowEditProject}
        />
      )}

      {index == 0 && (
        <FloatButton
          icon={<PlusOutlined />}
          tooltip={<div>Novo projeto</div>}
          type={'primary'}
          onClick={() => setShowNewProject(true)}
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
