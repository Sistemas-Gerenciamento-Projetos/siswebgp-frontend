import React, { useState } from 'react';
import StatusEpic from '../status-epic/statusEpic.component';
import DatePeriod from '../../datePeriod/datePeriod';
import { parseDateWithoutTimezone } from '../../../utils/dateParse';
import { useProjectDetails } from '../../../context/projectContext';
import ManagerPhoto from '../../managerPhoto/managerPhoto';
import ActionButtons from '../action-buttons/actionButtons';
import EditEpicForm from '../edit-epic/editEpicForm.component';

export default function EpicItem({ epic, index, update, setUpdate }) {
  const [projectDetails] = useProjectDetails();
  const [showEditEpic, setShowEditEpic] = useState(false);

  return (
    <>
      <EditEpicForm
        epic={epic}
        show={showEditEpic}
        setShow={setShowEditEpic}
        update={update}
        setUpdate={setUpdate}
      />
      <tbody>
        <tr style={{ backgroundColor: index % 2 === 0 ? '' : '#ebebeb' }}>
          <td>
            <span>{epic.title}</span>
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
            <span>em construção</span>
          </td>
          <td>
            <ManagerPhoto name={epic.user_name} />
          </td>
          <td>
            <ManagerPhoto name={projectDetails.managerName} />
          </td>
          <td>
            <ActionButtons
              setShowEdit={setShowEditEpic}
              onRefreshEpics={() => setUpdate(!update)}
              epicId={epic.id}
            />
          </td>
        </tr>
      </tbody>
    </>
  );
}
