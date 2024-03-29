import { Empty, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { getEpicTasks } from '../../../../services/epics/getEpicTasks';
import { useUserDetails } from '../../../../context/usercontext';
import { useProjectDetails } from '../../../../context/projectContext';
import translateStatus from '../../../../utils/translateStatus';
import { showErrorToast } from '../../../../utils/Toasts';
import { EmptyDiv, SpinDiv, TableHeader } from './viewTask.styles';

export default function ViewTask({ epicId }) {
  const [tasks, setTasks] = useState([]);
  const [userDetails] = useUserDetails();
  const [projectDetails] = useProjectDetails();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getEpicTasks(userDetails.accessToken, projectDetails.projectId, epicId)
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        showErrorToast('Erro ao buscar as tarefas do épico');
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading ? (
        <SpinDiv>
          <Spin />
        </SpinDiv>
      ) : (
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
      )}
    </>
  );
}
