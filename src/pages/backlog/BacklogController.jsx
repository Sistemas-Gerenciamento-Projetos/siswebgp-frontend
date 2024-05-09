import React, { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useUserDetails } from '../../context/usercontext';
import { useProjectDetails } from '../../context/projectContext';
import BacklogView from './BacklogView';
import { getTasks } from '../../services/tasks/getTasks';

export default function BacklogController() {
  const [userDetails] = useUserDetails();
  const [projectDetails] = useProjectDetails();
  const { projectId, taskId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  function onRefreshTasks() {
    setLoading(true);
    getTasks(userDetails.accessToken, projectId)
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }

  if (!userDetails.accessToken) {
    return <Navigate replace to="/" />;
  }

  return (
    <BacklogView
      projectDetails={projectDetails}
      userDetails={userDetails}
      loading={loading}
      tasks={tasks}
      taskId={taskId}
      onRefreshTasks={onRefreshTasks}
    />
  );
}
