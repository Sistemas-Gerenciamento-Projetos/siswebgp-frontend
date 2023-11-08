/* eslint react/prop-types: 0 */

import React, { useEffect, useState } from 'react';
import StatusTask from '../status-task/status-task';
import DatePeriod from '../../datePeriod/datePeriod';
import { parseDateWithoutTimezone } from '../../../utils/dateParse';
import ManagerPhoto from '../../managerPhoto/managerPhoto';
import ActionButtons from '../action-buttons/action-buttons';
import { useUserDetails } from '../../../context/usercontext';
import { Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const TaskItem = ({
  task,
  onRefreshTasks,
  index,
  projectDetails,
  showEditTask,
  setShowEditTask,
}) => {
  const [userDetails] = useUserDetails();
  const navigate = useNavigate();
  const { projectId } = useParams();

  function isAbleToEditTask() {
    return (
      projectDetails.managerId === userDetails.id ||
      task.user === userDetails.id
    );
  }

  return (
    <>
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
              onClick={() => {
                navigate(`/projects/${projectId}/backlog/${task.id}/edit`);
                setShowEditTask(true);
              }}
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
                onRefreshTasks={onRefreshTasks}
                taskId={task.id}
                setShowEditTask={setShowEditTask}
                epicId={task.epic}
              />
            )}
          </td>
        </tr>
      </tbody>
    </>
  );
};

export default TaskItem;
