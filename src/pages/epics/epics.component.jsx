import { Empty, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import EpicItem from '../../components/epic-component/epic-item/epicItem.component';
import { EmptyDiv, SpinDiv, TableHeader } from './epics.styles';
import { Navigate, useParams } from 'react-router-dom';
import { useUserDetails } from '../../context/usercontext';
import { getEpics } from '../../services/epics/getEpics';
import { useProjectDetails } from '../../context/projectContext';
import NewEpicForm from '../../components/epic-component/new-epic/newEpicForm.component';
import PageNavigator from '../../components/pageNavigator/pageNavigator';
import { showErrorToast } from '../../utils/Toasts';
import SGPSidebar from '../../components/sidebar/sidebar.component';
import Toolbar from '../../components/toolbar/toolbar.component';

export default function Epics() {
  const [epics, setEpics] = useState([]);
  const [userDetails] = useUserDetails();
  const [update, setUpdate] = useState(false);
  const [projectDetails] = useProjectDetails();
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const { projectId } = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 9;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const epicsPage = epics.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(epics.length / recordsPerPage);
  const numbers = [...Array(nPage + 1).keys()].slice(1);

  useEffect(() => {
    setLoading(true);
    getEpics(userDetails.accessToken, projectId)
      .then((data) => {
        setEpics(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        showErrorToast('Erro ao buscar os épicos');
        setLoading(false);
      });
  }, [update]);

  if (!userDetails.accessToken) {
    return <Navigate replace to="/" />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SGPSidebar />
      <div style={{ width: '100%' }}>
        <Toolbar
          menuItem={5}
          setShowBacklog={() => {}}
          setShowEpics={setShow}
          title={`${projectDetails.projectName} / Épicos`}
        />
        <NewEpicForm
          show={show}
          setShow={setShow}
          update={update}
          setUpdate={setUpdate}
          taskId={null}
        />

        {loading ? (
          <SpinDiv>
            <Spin />
          </SpinDiv>
        ) : (
          <>
            {epics.length !== 0 ? (
              <>
                <Table>
                  <thead>
                    <tr>
                      <th>
                        <TableHeader>Nome do Épico</TableHeader>
                      </th>
                      <th>
                        <TableHeader>Status</TableHeader>
                      </th>
                      <th>
                        <TableHeader>Prazo</TableHeader>
                      </th>
                      <th>
                        <TableHeader>Responsável</TableHeader>
                      </th>
                      <th>
                        <TableHeader>Ações</TableHeader>
                      </th>
                    </tr>
                  </thead>

                  {epicsPage.map((epic, index) => (
                    <EpicItem
                      key={epic.id}
                      epic={epic}
                      index={index}
                      update={update}
                      setUpdate={setUpdate}
                    />
                  ))}
                </Table>
                <PageNavigator
                  numbers={numbers}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  nPage={nPage}
                />
              </>
            ) : (
              <EmptyDiv>
                <Empty description="Sem épicos existentes" />
              </EmptyDiv>
            )}
          </>
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
      </div>
    </div>
  );
}
