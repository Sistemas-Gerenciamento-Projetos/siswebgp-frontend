import { Checkbox, Empty } from 'antd';
import Search from 'antd/es/input/Search';
import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { getTasksWithoutEpic } from '../../../../services/tasks/getTasksWithoutEpic';
import { useUserDetails } from '../../../../context/usercontext';
import { useProjectDetails } from '../../../../context/projectContext';
import { Button, Table } from 'react-bootstrap';
import { patchTask } from '../../../../services/tasks/patchTask';
import { toast } from 'react-toastify';

const EmptyDiv = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 10px;
`;

const TableHeader = styled.p`
  font-weight: 600;
`;

export default function BindTask({ epicId }) {
  const [tasks, setTasks] = useState([]);
  const [tasksFiltered, setTasksFiltered] = useState([]);
  let tasksSelected = [];
  const [userDetails] = useUserDetails();
  const [projectDetails] = useProjectDetails();
  const [filter, setFilter] = useState('');
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    getTasksWithoutEpic(userDetails.accessToken, projectDetails.projectId)
      .then((data) => {
        setTasks(data);
        setTasksFiltered(data);
      })
      .catch((error) => {
        console.log(error);
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
    console.log(tasksSelected);
    const patchPromises = [];
    tasksSelected.forEach((task) => {
      task.epic = epicId;
      patchPromises.push(
        patchTask(userDetails.accessToken, projectDetails.projectId, task),
      );
    });
    Promise.all(patchPromises)
      .then((data) => {
        setUpdate(!update);
        toast.success('Novas tarefas vinculadas', {
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
        console.log(error);
        toast.error('Erro ao vincular as tarefas', {
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
    <>
      <Search
        placeholder="Insira o nome da tarefa"
        onSearch={onSearch}
        enterButton
      />

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

          <Button style={{ width: '100%' }} onClick={handleBindTasks}>
            Vincular Tarefas
          </Button>
        </>
      ) : (
        <EmptyDiv>
          <Empty description="Sem tarefas existentes" />
        </EmptyDiv>
      )}
    </>
  );
}
