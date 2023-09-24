import React, { useState } from 'react';
import StatusEpic from '../status-epic/statusEpic.component';
import DatePeriod from '../../datePeriod/datePeriod';
import { parseDateWithoutTimezone } from '../../../utils/dateParse';
import { useProjectDetails } from '../../../context/projectContext';
import ManagerPhoto from '../../managerPhoto/managerPhoto';
import ActionButtons from '../action-buttons/actionButtons';
import EditEpicForm from '../edit-epic/editEpicForm.component';
import AddEpicTasks from '../add-epic-tasks/addEpicTasks.component';
import { useUserDetails } from '../../../context/usercontext';
import { Button } from 'react-bootstrap';

export default function EpicItem({ epic, index, update, setUpdate }) {
  const [projectDetails] = useProjectDetails();
  const [userDetails] = useUserDetails();
  const [showEditEpic, setShowEditEpic] = useState(false);
  const [showAddEpicTasks, setShowAddEpicTasks] = useState(false);

  function isAbleToEditTask() {
    console.log(projectDetails.managerId);
    console.log(userDetails.id);
    return (
      projectDetails.managerId === userDetails.id ||
      epic.user === userDetails.id
    );
  }

  return (
    <>
      <EditEpicForm
        epic={epic}
        show={showEditEpic}
        setShow={setShowEditEpic}
        update={update}
        setUpdate={setUpdate}
      />
      <AddEpicTasks
        show={showAddEpicTasks}
        setShow={setShowAddEpicTasks}
        epicId={epic.id}
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
              onClick={() => setShowEditEpic(true)}
            >
              {epic.title}
            </Button>
          </td>
          <td>
            <StatusEpic epic={epic} />
          </td>
          <td>
            <DatePeriod
              startDate={parseDateWithoutTimezone(epic.start_date)}
              endDate={parseDateWithoutTimezone(epic.deadline_date)}
            />
          </td>
          <td>
            <span>
              <button
                type="button"
                className={'btn btn-outline-primary'}
                onClick={() => setShowAddEpicTasks(true)}
              >
                Visualizar
              </button>
            </span>
          </td>
          <td>
            <ManagerPhoto name={epic.user_name} />
          </td>
          <td>
            <ManagerPhoto name={projectDetails.managerName} />
          </td>
          <td>
            {isAbleToEditTask() && (
              <ActionButtons
                setShowEdit={setShowEditEpic}
                onRefreshEpics={() => setUpdate(!update)}
                epicId={epic.id}
              />
            )}
          </td>
        </tr>
      </tbody>
    </>
  );
}
