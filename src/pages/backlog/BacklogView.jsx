import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import TaskItem from '../../components/tasks-component/taskitem/taskitem';
import { Empty, Spin, Input } from 'antd';
import { ToastContainer } from 'react-toastify';
import NewTaskBacklog from '../../components/tasks-component/new-task.component/new-task.component';
import PageNavigator from '../../components/pageNavigator/pageNavigator';
import SGPSidebar from '../../components/sidebar/sidebar.component';
import Toolbar from '../../components/toolbar/toolbar.component';
import EditTask from '../../components/tasks-component/edit-task/editTask.component';
const { Search } = Input;

export default function BacklogView({
  projectDetails,
  userDetails,
  loading,
  taskId,
  tasksFiltered,
  onRefreshTasks,
  onSearch,
}) {
  const [update, setUpdate] = useState(false);
  const [show, setShow] = useState(false);
  const [showEditTask, setShowEditTask] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 9;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const tasksPage = tasksFiltered.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(tasksFiltered.length / recordsPerPage);
  const numbers = [...Array(nPage + 1).keys()].slice(1);

  useEffect(() => {
    if (taskId != null) {
      setShowEditTask(true);
    }
    onRefreshTasks();
  }, [update]);

  return (
    <div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
      <SGPSidebar />
      <div style={{ width: '100%' }}>
        <Toolbar
          menuItem={2}
          setShowBacklog={setShow}
          setShowEpics={() => {}}
          title={`${projectDetails.projectName} / Backlog`}
          refreshPage={onRefreshTasks}
        />
        <NewTaskBacklog
          show={show}
          setShow={setShow}
          titleAction={'Nova tarefa'}
          textButton={'Criar tarefa'}
          onRefreshTasks={onRefreshTasks}
          update={update}
        />
        <EditTask
          show={showEditTask}
          setShow={setShowEditTask}
          onRefreshTasks={onRefreshTasks}
        />

        <Search
          placeholder="Pesquise pelo nome da tarefa"
          allowClear
          enterButton="Pesquisar"
          size="large"
          onSearch={onSearch}
          style={{ paddingLeft: 8, paddingRight: 8 }}
          onChange={(e) => onSearch(e.target.value)}
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
            {tasksFiltered.length !== 0 ? (
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
                        <p style={{ fontWeight: '600' }}>Ações</p>
                      </th>
                    </tr>
                  </thead>

                  {tasksPage.map((task, index) => (
                    <TaskItem
                      key={task.id}
                      setUpdate={setUpdate}
                      update={update}
                      task={task}
                      userDetails={userDetails}
                      projectDetails={projectDetails}
                      onRefreshTasks={onRefreshTasks}
                      index={index}
                      showEditTask={showEditTask}
                      setShowEditTask={setShowEditTask}
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
              <div
                style={{
                  height: 'calc(100vh - 80px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Empty description="Sem tarefas existentes" />
              </div>
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
