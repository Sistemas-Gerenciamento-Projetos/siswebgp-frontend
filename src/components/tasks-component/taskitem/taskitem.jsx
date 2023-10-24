/* eslint react/prop-types: 0 */

import React, { useState } from 'react';
import StatusTask from '../status-task/status-task';
import DatePeriod from '../../datePeriod/datePeriod';
import { parseDateWithoutTimezone } from '../../../utils/dateParse';
import ManagerPhoto from '../../managerPhoto/managerPhoto';
import ActionButtons from '../action-buttons/action-buttons';
import { useUserDetails } from '../../../context/usercontext';
import { Button } from 'react-bootstrap';
import EditTask from '../edit-task/editTask.component';

const TaskItem = ({ task, onRefreshTasks, index, projectDetails }) => {
  const [userDetails] = useUserDetails();
  const [showEditTask, setShowEditTask] = useState(false);

  function isAbleToEditTask() {
    return (
      projectDetails.managerId === userDetails.id ||
      task.user === userDetails.id
    );
  }

  return (
    <>
      <EditTask
        show={showEditTask}
        setShow={setShowEditTask}
        task={task}
        onRefreshTasks={onRefreshTasks}
      />
      <tbody>
        <tr style={{ backgroundColor: index % 2 === 0 ? '' : '#ebebeb' }}>
          <td>
            <Button
              variant="outlined-dark"
              style={{
                border: 0,
                display: 'inline-block',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '25ch',
                width: 'fit-content',
              }}
              onClick={() => setShow(true)}
            >
              {task.title}
            </Button>
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
            {isAbleToEditTask() && (
              <ActionButtons
                setShowEditTask={setShowEditTask}
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
