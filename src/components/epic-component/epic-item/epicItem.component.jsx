import React from 'react';
import StatusEpic from '../status-epic/statusEpic.component';
import DatePeriod from '../../datePeriod/datePeriod';
import { parseDateWithoutTimezone } from '../../../utils/dateParse';
import { useProjectDetails } from '../../../context/projectContext';
import ManagerPhoto from '../../managerPhoto/managerPhoto';

export default function EpicItem({ epic, index }) {
  const [projectDetails] = useProjectDetails();
  return (
    <>
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
          <td>x</td>
        </tr>
      </tbody>
    </>
  );
}
