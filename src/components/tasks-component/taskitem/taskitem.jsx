/* eslint react/prop-types: 0 */

import React, { useState } from 'react';
import StatusTask from '../status-task/status-task';
import DatePeriod from '../../datePeriod/datePeriod';
import { parseDateWithoutTimezone } from '../../../utils/dateParse';
import ManagerPhoto from '../../managerPhoto/managerPhoto';
import ActionButtons from '../action-buttons/action-buttons';
import NewTaskBacklog from '../new-task.component/new-task.component';
import { useUserDetails } from '../../../context/usercontext';

const TaskItem = ({ task, onRefreshTasks, index, projectDetails }) => {
  const [titleAction] = useState('Editar tarefa');
  const [show, setShow] = useState(false);
  const [userDetails] = useUserDetails();
  console.log(task);

  function isAbleToEditTask() {
    return (
      projectDetails.managerId === userDetails.id ||
      task.user === userDetails.id
    );
  }

  return (
    <>
      <NewTaskBacklog
        show={show}
        setShow={setShow}
        titleAction={titleAction}
        textButton={'Salvar alterações'}
        task={task}
        onRefreshTasks={onRefreshTasks}
      />
      <tbody>
        <tr style={{ backgroundColor: index % 2 === 0 ? '' : '#ebebeb' }}>
          <td>
            <span>{task.title}</span>
          </td>
          <td>
            <StatusTask status={task.status} taskItem={task} />
          </td>
          <td>
            <DatePeriod
              startDate={parseDateWithoutTimezone(task.start_date)}
              endDate={parseDateWithoutTimezone(task.deadline_date)}
            />
          </td>
          <td>
            <ManagerPhoto name={task.user_name} />
          </td>
          <td>
            <p>{projectDetails.managerName}</p>
          </td>
          <td>
            {isAbleToEditTask() && (
              <ActionButtons
                setShowEdit={setShow}
                onRefreshTasks={onRefreshTasks}
                taskId={task.id}
              />
            )}
          </td>
        </tr>
      </tbody>
    </>
  );
};

export default TaskItem;
