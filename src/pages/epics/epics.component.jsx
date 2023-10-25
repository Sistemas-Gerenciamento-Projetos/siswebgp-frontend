import { PlusOutlined } from '@ant-design/icons';
import { Empty, FloatButton } from 'antd';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import EpicItem from '../../components/epic-component/epic-item/epicItem.component';
import { TableHeader } from './epics.styles';
import { Navigate } from 'react-router-dom';
import { useUserDetails } from '../../context/usercontext';
import { getEpics } from '../../services/epics/getEpics';
import { useProjectDetails } from '../../context/projectContext';
import NewEpicForm from '../../components/epic-component/new-epic/newEpicForm.component';

export default function Epics() {
  const [epics, setEpics] = useState([]);
  const [userDetails] = useUserDetails();
  const [update, setUpdate] = useState(false);
  const [projectDetails] = useProjectDetails();
  const [show, setShow] = useState(false);

  useEffect(() => {
    getEpics(userDetails.accessToken, projectDetails.projectId)
      .then((data) => {
        console.log(data);
        setEpics(data);
      })
      .catch((error) => {
        console.log(error);
        toast.error('Erro ao buscar os épicos', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      });
  }, [update]);

  if (!userDetails.accessToken) {
    return <Navigate replace to="/" />;
  }

  return (
    <>
      <NewEpicForm
        show={show}
        setShow={setShow}
        update={update}
        setUpdate={setUpdate}
      />
      {epics.length !== 0 && (
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
                <TableHeader>Tarefas</TableHeader>
              </th>
              <th>
                <TableHeader>Responsável</TableHeader>
              </th>
              <th>
                <TableHeader>Gerente</TableHeader>
              </th>
              <th>
                <TableHeader>Ações</TableHeader>
              </th>
            </tr>
          </thead>

          {epics.map((epic, index) => (
            <EpicItem
              key={epic.id}
              epic={epic}
              index={index}
              update={update}
              setUpdate={setUpdate}
            />
          ))}
        </Table>
      )}

      {epics.length === 0 && (
        <div
          style={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Empty description="Sem épicos existentes" />
        </div>
      )}

      <FloatButton
        icon={<PlusOutlined />}
        tooltip={<div>Novo épico</div>}
        type={'primary'}
        onClick={() => setShow(true)}
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
}
