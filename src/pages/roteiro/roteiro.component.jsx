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
  Toolbar,
  Validation,
  Item,
  StripLine,
} from 'devextreme-react/gantt';
import { ToastContainer, toast } from 'react-toastify';
import { patchTask } from '../../services/tasks/patchTask';

const Roteiro = () => {
  const currentDate = new Date(Date.now());

  const [userDetails] = useUserDetails();
  const [projectDetails] = useProjectDetails();
  const [striped, setStriped] = useState(false);

  const [tasks, setTasks] = useState([]);

  function handleData() {
    getTasks(userDetails.accessToken, projectDetails.projectId)
      .then((data) => {
        setStriped(true);
        setTasks(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    handleData();
  }, []);

  if (!userDetails.accessToken) {
    return <Navigate replace to="/" />;
  }

  function updateTask({ key, values }) {
    console.log(key);
    console.log(values);

    const tasksFiltered = tasks.filter((item) => item.id === key);

    if (tasksFiltered.length === 0) {
      toast.error('Erro ao atualizar a tarefa', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
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
        toast.success('Tarefa atualizada', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      })
      .catch((error) => {
        toast.error('Erro ao atualizar a tarefa', {
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
  }

  return (
    <div>
      <Gantt
        taskListWidth={220}
        scaleType="weeks"
        height={700}
        onTaskUpdated={updateTask}
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
    </div>
  );
};

export default Roteiro;
