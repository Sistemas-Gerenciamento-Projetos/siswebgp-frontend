import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useUserDetails } from '../../context/usercontext';
import { useProjectDetails } from '../../context/projectContext';
import { getTasks } from '../../services/tasks/getTasks';
import './roteiro.styles.css';
import Gantt, {
  Tasks,
  Column,
  Editing,
  Validation,
  Item,
  StripLine,
} from 'devextreme-react/gantt';
import { ToastContainer, toast } from 'react-toastify';
import { patchTask } from '../../services/tasks/patchTask';
import { showErrorToast, showSuccessToast } from '../../utils/Toasts';
import { Spin } from 'antd';
import SGPSidebar from '../../components/sidebar/sidebar.component';
import Toolbar from '../../components/toolbar/toolbar.component';

const Roteiro = () => {
  const currentDate = new Date(Date.now());

  const [userDetails] = useUserDetails();
  const [projectDetails] = useProjectDetails();
  const [striped, setStriped] = useState(false);

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  function handleData() {
    getTasks(userDetails.accessToken, projectDetails.projectId)
      .then((data) => {
        setStriped(true);
        setTasks(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  useEffect(() => {
    handleData();
  }, []);

  if (!userDetails.accessToken) {
    return <Navigate replace to="/" />;
  }

  function updateTask({ key, values }) {
    const tasksFiltered = tasks.filter((item) => item.id === key);

    if (tasksFiltered.length === 0) {
      showErrorToast('Erro ao atualizar a tarefa');
      return;
    }

    const task = tasksFiltered[0];
    task.title = values.title !== undefined ? values.title : task.title;
    task.start_date =
      values.start_date !== undefined
        ? values.start_date.toISOString()
        : task.start_date;
    task.deadline_date =
      values.deadline_date !== undefined
        ? values.deadline_date.toISOString()
        : task.deadline_date;

    console.log(task);

    patchTask(
      userDetails.accessToken,
      projectDetails.projectId,
      projectDetails.projectName,
      projectDetails.managerEmail,
      task,
    )
      .then((data) => {
        handleData();
        showSuccessToast('Tarefa atualizada');
      })
      .catch((error) => {
        showErrorToast('Erro ao atualizar a tarefa');
      });
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SGPSidebar />
      <div style={{ width: '100%' }}>
        <Toolbar
          menuItem={4}
          setShowBacklog={() => {}}
          setShowEpics={() => {}}
          title={`${projectDetails.projectName} / Roteiro`}
        />
        {loading ? (
          <div
            style={{
              height: 'calc(100vh - 80px)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Spin />
          </div>
        ) : (
          <>
            <Gantt
              taskListWidth={220}
              scaleType="weeks"
              height={700}
              onTaskUpdated={updateTask}
              onContentReady={(e) => {
                const timelineDate = new Date();
                timelineDate.setDate(timelineDate.getDate() - 2);
                e.component.scrollToDate(timelineDate, { left: 0, top: 0 });
              }}
            >
              {striped && (
                <StripLine
                  start={currentDate}
                  title="Current Time"
                  cssClass="current-time"
                />
              )}
              <Tasks
                dataSource={tasks}
                keyExpr="id"
                parentIdExpr="parentId"
                titleExpr="title"
                progressExpr="progress"
                startExpr="start_date"
                endExpr="deadline_date"
                colorExpr="taskColor"
              />
              <Toolbar>
                <Item name="zoomIn" />
                <Item name="zoomOut" />
              </Toolbar>
              <Column dataField="title" caption="Tarefa" width={100} />
              <Validation autoUpdateParentTasks />
              <Editing
                enabled={true}
                allowDependencyAdding={false}
                allowDependencyDeleting={false}
                allowResourceAdding={false}
                allowResourceDeleting={false}
                allowTaskAdding={false}
                allowTaskDeleting={false}
                allowTaskResourceUpdating={false}
              />
            </Gantt>
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
        )}
      </div>
    </div>
  );
};

export default Roteiro;
