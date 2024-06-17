import React, { useEffect, useState } from 'react';
import RoteiroView from './RoteiroView';
import { Navigate, useParams } from 'react-router-dom';
import { useUserDetails } from '../../context/usercontext';
import { useProjectDetails } from '../../context/projectContext';
import { getTasks } from '../../services/tasks/getTasks';
import { patchTask } from '../../services/tasks/patchTask';
import { showErrorToast, showSuccessToast } from '../../utils/Toasts';

export default function RoteiroController() {
  const currentDate = new Date(Date.now());

  const [userDetails] = useUserDetails();
  const [projectDetails] = useProjectDetails();
  const [striped, setStriped] = useState(false);
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  if (!userDetails.accessToken) {
    return <Navigate replace to="/" />;
  }

  useEffect(() => {
    handleData();
  }, [projectId]);

  function handleData() {
    setLoading(true);
    getTasks(userDetails.accessToken, projectId)
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
    <RoteiroView
      projectName={projectDetails.projectName}
      loading={loading}
      striped={striped}
      currentDate={currentDate}
      tasks={tasks}
      updateTask={updateTask}
    />
  );
}
