import React, { useEffect, useState } from 'react';
import { useUserDetails } from '../../context/usercontext';
import { useProjectDetails } from '../../context/projectContext';
import { Navigate } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { getTasks } from '../../services/tasks/getTasks';
import TaskItem from '../../components/tasks-component/taskitem/taskitem';
import { Empty, FloatButton } from 'antd';
import { ToastContainer } from 'react-toastify';
import NewTaskBacklog from '../../components/tasks-component/new-task.component/new-task.component';
import { PlusOutlined } from '@ant-design/icons';

const Backlog = () => {
  const [userDetails] = useUserDetails();
  const [projectDetails] = useProjectDetails();
  const [show, setShow] = useState(false);

  const [tasks, setTasks] = useState([]);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    onRefreshTasks();
  }, [update]);

  if (!userDetails.accessToken) {
    return <Navigate replace to="/" />;
  }

  function onRefreshTasks() {
    getTasks(userDetails.accessToken, projectDetails.projectId)
      .then((data) => {
        setTasks(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <NewTaskBacklog
        show={show}
        setShow={setShow}
        titleAction={'Nova tarefa'}
        textButton={'Criar tarefa'}
        onRefreshTasks={onRefreshTasks}
        update={update}
      />

      {tasks.length !== 0 && (
        <>
          <Table className="mt-4">
            <thead>
              <tr>
                <th>
                  <p style={{ fontWeight: '600' }}>Nome da Tarefa</p>
                </th>
                <th>
                  <p style={{ fontWeight: '600' }}>Status</p>
                </th>
                <th>
                  <p style={{ fontWeight: '600' }}>Prazo</p>
                </th>
                <th>
                  <p style={{ fontWeight: '600' }}>Responsável</p>
                </th>
                <th>
                  <p style={{ fontWeight: '600' }}>Gerente</p>
                </th>
                <th>
                  <p style={{ fontWeight: '600' }}>Ações</p>
                </th>
              </tr>
            </thead>

            {tasks.map((task, index) => (
              <TaskItem
                key={task.id}
                setUpdate={setUpdate}
                update={update}
                task={task}
                userDetails={userDetails}
                projectDetails={projectDetails}
                onRefreshTasks={onRefreshTasks}
                index={index}
              />
            ))}
          </Table>
        </>
      )}

      {tasks.length === 0 && (
        <div
          style={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Empty description="Sem tarefas existentes" />
        </div>
      )}

      <FloatButton
        icon={<PlusOutlined />}
        tooltip={<div>Nova tarefa</div>}
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
};

export default Backlog;
