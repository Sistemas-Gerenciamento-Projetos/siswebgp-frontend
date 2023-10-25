import { Checkbox, Empty, Spin } from 'antd';
import Search from 'antd/es/input/Search';
import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { patchTask } from '../../../../services/tasks/patchTask';
import { getTasksWithoutEpic } from '../../../../services/tasks/getTasksWithoutEpic';
import { useUserDetails } from '../../../../context/usercontext';
import { useProjectDetails } from '../../../../context/projectContext';
import { showErrorToast, showSuccessToast } from '../../../../utils/Toasts';
import { EmptyDiv, SpinDiv, TableHeader } from './bindTask.styles';

export default function BindTask({ epicId }) {
  let tasksSelected = [];
  const [userDetails] = useUserDetails();
  const [projectDetails] = useProjectDetails();
  const [filter, setFilter] = useState('');
  const [tasks, setTasks] = useState([]);
  const [tasksFiltered, setTasksFiltered] = useState([]);
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingBindTask, setLoadingBindTask] = useState(false);

  useEffect(() => {
    setLoading(true);
    getTasksWithoutEpic(userDetails.accessToken, projectDetails.projectId)
      .then((data) => {
        setTasks(data);
        setTasksFiltered(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [update]);

  useEffect(() => {
    if (tasks.length !== 0 && filter !== '') {
      setTasksFiltered(
        tasks.filter((task) => isSubstringOf(task.title, filter)),
      );
    } else if (filter === '') {
      setTasksFiltered(tasks);
    }
  }, [filter]);

  function onSearch(value) {
    setFilter(value.trim());
  }

  function isSubstringOf(str1, str2) {
    return str1.toLowerCase().includes(str2.toLowerCase());
  }

  function handleTaskSelected(task) {
    if (tasksSelected.includes(task)) {
      tasksSelected = tasksSelected.filter(
        (taskSelected) => taskSelected.id !== task.id,
      );
    } else {
      tasksSelected.push(task);
    }
  }

  function handleBindTasks() {
    setLoadingBindTask(true);
    console.log(tasksSelected);
    const patchPromises = [];
    tasksSelected.forEach((task) => {
      task.epic = epicId;
      patchPromises.push(
        patchTask(
          userDetails.accessToken,
          projectDetails.projectId,
          projectDetails.projectName,
          projectDetails.managerEmail,
          task,
        ),
      );
    });
    Promise.all(patchPromises)
      .then((data) => {
        setUpdate(!update);
        showSuccessToast('Novas tarefas vinculadas');
        setLoadingBindTask(false);
      })
      .catch((error) => {
        console.log(error);
        showErrorToast('Erro ao vincular as tarefas');
        setLoadingBindTask(false);
      });
  }

  return (
    <>
      <Search
        placeholder="Insira o nome da tarefa"
        onSearch={onSearch}
        enterButton
      />

      {loading ? (
        <SpinDiv>
          <Spin />
        </SpinDiv>
      ) : (
        <>
          {tasksFiltered.length !== 0 ? (
            <>
              <Table>
                <thead>
                  <tr>
                    <th>
                      <TableHeader>Id</TableHeader>
                    </th>
                    <th>
                      <TableHeader>Titulo</TableHeader>
                    </th>
                    <th>
                      <TableHeader>Vincular</TableHeader>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tasksFiltered.map((task, index) => (
                    <tr key={task.id}>
                      <td>
                        <span>{task.number}</span>
                      </td>
                      <td>
                        <span>{task.title}</span>
                      </td>
                      <td>
                        <Checkbox onChange={() => handleTaskSelected(task)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              {loadingBindTask ? (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Spin />
                </div>
              ) : (
                <Button style={{ width: '100%' }} onClick={handleBindTasks}>
                  Vincular Tarefas
                </Button>
              )}
            </>
          ) : (
            <EmptyDiv>
              <Empty description="Sem tarefas existentes" />
            </EmptyDiv>
          )}
        </>
      )}
    </>
  );
}
