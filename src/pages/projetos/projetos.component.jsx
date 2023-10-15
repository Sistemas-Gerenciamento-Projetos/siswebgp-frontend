import React, { useEffect } from 'react';
import { useState } from 'react';
import NovoProjeto from '../../components/form-new-project/new-project';
import { useUserDetails } from '../../context/usercontext';
import { Navigate } from 'react-router-dom';
import { getProjects } from '../../services/projects/getProjects';
import { useProjectDetails } from '../../context/projectContext';
import OptionsProject from '../../components/options-project/home-options/home-options';
import EditProject from '../../components/form-edit-project/edit-project';
import { ToastContainer, toast } from 'react-toastify';
import { Empty, FloatButton, Spin } from 'antd';
import { Table } from 'reactstrap';
import { InfoCircleOutlined, PlusOutlined } from '@ant-design/icons';
import ProjectItem from '../../components/project-components/project-item/projectItem.component';
import { showErrorToast, showInfoToast } from '../../utils/Toasts';
import PageNavigator from '../../components/pageNavigator/pageNavigator';

const Projetos = () => {
  const [userDetails, updateUserDetails] = useUserDetails();
  const [projectDetails, updateProjectDetails] = useProjectDetails();
  const [novoProjeto, setNovoProjeto] = useState(true);

  const [projects, setProjects] = useState([]);
  const [showNewProject, setShowNewProject] = useState(false);
  const [showEditProject, setShowEditProject] = useState(false);
  const [showInviteUsersToProject, setShowInviteUsersToProject] =
    useState(false);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 9;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const projectsPage = projects.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(projects.length / recordsPerPage);
  const numbers = [...Array(nPage + 1).keys()].slice(1);

  useEffect(() => {
    setLoading(true);
    onRefreshProjects();
  }, [novoProjeto]);

  if (!userDetails.accessToken) {
    return navigateToLogin();
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

  function onRefreshProjects() {
    getProjects(userDetails.accessToken)
      .then((data) => {
        setProjects(data);
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

  function navigateToLogin() {
    <Navigate replace to="auth/" />;
  }

  function showProgressInfoAlert() {
    showInfoToast(
      'O progresso do projeto é calculado através da soma de todos os épicos e tarefas criados e dividido pelo número de épicos e tarefas concluídos',
    );
  }

  return (
    <>
      {loading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            height: '100%',
            alignItems: 'center',
          }}
        >
          <Spin />
        </div>
      ) : (
        <>
          {projects.length !== 0 ? (
            <>
              <Table>
                <thead>
                  <tr>
                    <th>
                      <p style={{ fontWeight: '600' }}>Nome do projeto</p>
                    </th>
                    <th>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                        }}
                      >
                        <p
                          style={{
                            fontWeight: '600',
                          }}
                        >
                          Progresso
                        </p>
                        <InfoCircleOutlined
                          style={{
                            backgroundColor: '#FFFFFF',
                            padding: '5px',
                          }}
                          onClick={showProgressInfoAlert}
                        />
                      </div>
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
                  {projectsPage.map((project, index) => (
                    <ProjectItem
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
              <PageNavigator
                numbers={numbers}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                nPage={nPage}
              />
            </>
          ) : (
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
        </>
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
          show={showEditProject}
          setShow={setShowEditProject}
        />
      )}

      <FloatButton
        icon={<PlusOutlined />}
        tooltip={<div>Novo projeto</div>}
        type={'primary'}
        onClick={() => setShowNewProject(true)}
      />

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
