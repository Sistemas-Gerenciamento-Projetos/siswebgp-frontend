import { Empty } from 'antd';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { styled } from 'styled-components';
import { getEpicTasks } from '../../../../services/epics/getEpicTasks';
import { useUserDetails } from '../../../../context/usercontext';
import { useProjectDetails } from '../../../../context/projectContext';
import DatePeriod from '../../../datePeriod/datePeriod';
import { parseDateWithoutTimezone } from '../../../../utils/dateParse';
import {
  STATUS_DONE,
  STATUS_INPROGRESS,
  STATUS_PAUSED,
  STATUS_TODO,
} from '../../../../constants/taskStatus';
import translateStatus from '../../../../utils/translateStatus';

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

export default function ViewTask({ epicId }) {
  const [tasks, setTasks] = useState([]);
  const [userDetails] = useUserDetails();
  const [projectDetails] = useProjectDetails();

  useEffect(() => {
    getEpicTasks(userDetails.accessToken, projectDetails.projectId, epicId)
      .then((data) => {
        setTasks(data);
      })
      .catch((error) => {
        console.log(error);
        toast.error('Erro ao buscar as tarefas do épico', {
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
  }, []);

  return (
    <>
      {tasks.length !== 0 ? (
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
                  <TableHeader>Descrição</TableHeader>
                </th>
                <th>
                  <TableHeader>Status</TableHeader>
                </th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr key={task.id}>
                  <td>
                    <span>{task.number}</span>
                  </td>
                  <td>
                    <span>{task.title}</span>
                  </td>
                  <td>{task.description}</td>
                  <td>{translateStatus(task.status)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      ) : (
        <EmptyDiv>
          <Empty description="Sem tarefas existentes" />
        </EmptyDiv>
      )}
    </>
  );
}
