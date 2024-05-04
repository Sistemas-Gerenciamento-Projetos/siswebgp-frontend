import React, { useEffect } from 'react';
import { useState } from 'react';
import NovoProjeto from '../../components/form-new-project/new-project';
import OptionsProject from '../../components/options-project/home-options/home-options';
import EditProject from '../../components/form-edit-project/edit-project';
import { ToastContainer, toast } from 'react-toastify';
import { Empty, FloatButton, Spin } from 'antd';
import { Table } from 'reactstrap';
import { InfoCircleOutlined, PlusOutlined } from '@ant-design/icons';
import ProjectItem from '../../components/project-components/project-item/projectItem.component';
import PageNavigator from '../../components/pageNavigator/pageNavigator';
import SGPSidebar from '../../components/sidebar/sidebar.component';
import Toolbar from '../../components/toolbar/toolbar.component';

const ProjetosView = ({
  projectDetails,
  projects,
  loading,
  onRefreshProjects,
  showProgressInfoAlert,
  onClickProject,
}) => {
  const [novoProjeto, setNovoProjeto] = useState(true);

  const [showNewProject, setShowNewProject] = useState(false);
  const [showEditProject, setShowEditProject] = useState(false);
  const [showInviteUsersToProject, setShowInviteUsersToProject] =
    useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 9;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const projectsPage = projects.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(projects.length / recordsPerPage);
  const numbers = [...Array(nPage + 1).keys()].slice(1);

  useEffect(() => {
    onRefreshProjects();
  }, [novoProjeto]);

  return (
    <div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
      <SGPSidebar />
      <div style={{ width: '100%' }}>
        <Toolbar
          menuItem={0}
          setShowBacklog={() => {}}
          setShowEpics={() => {}}
          title={'Meus projetos'}
        />
        {loading ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              height: 'calc(100vh - 80px)',
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
                        setShowInviteUsersToProject={
                          setShowInviteUsersToProject
                        }
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
                  height: 'calc(100vh - 80px)',
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
      </div>
    </div>
  );
};

export default ProjetosView;
