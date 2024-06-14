import React, { useState, useEffect } from 'react';
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
  const [filter, setFilter] = useState('');
  const [tasksFiltered, setTasksFiltered] = useState([]);

  useEffect(() => {
    filterTasks();
  }, [filter]);

  function onSearch(value) {
    setFilter(value.trim());
  }

  function isSubstringOf(str1, str2) {
    return str1.toLowerCase().includes(str2.toLowerCase());
  }

  function onRefreshTasks() {
    setLoading(true);
    getTasks(userDetails.accessToken, projectId)
      .then((data) => {
        setTasks(data);
        if (filter !== '') {
          filterTasksFromData(data);
        } else {
          setTasksFiltered(data);
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }

  function filterTasks() {
    if (tasks.length !== 0 && filter !== '') {
      setTasksFiltered(
        tasks.filter((task) => isSubstringOf(task.title, filter)),
      );
    } else if (filter === '') {
      setTasksFiltered(tasks);
    }
  }

  function filterTasksFromData(data) {
    if (data.length !== 0 && filter !== '') {
      setTasksFiltered(
        data.filter((task) => isSubstringOf(task.title, filter)),
      );
    } else if (filter === '') {
      setTasksFiltered(data);
    }
  }

  if (!userDetails.accessToken) {
    return <Navigate replace to="/" />;
  }

  return (
    <BacklogView
      projectDetails={projectDetails}
      userDetails={userDetails}
      loading={loading}
      taskId={taskId}
      tasksFiltered={tasksFiltered}
      onRefreshTasks={onRefreshTasks}
      onSearch={onSearch}
    />
  );
}
