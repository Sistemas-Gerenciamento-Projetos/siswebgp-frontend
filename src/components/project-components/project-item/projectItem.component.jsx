import React, { useEffect } from 'react';
import ProgressBar from '../progressBar/progressBar';
import DatePeriod from '../../datePeriod/datePeriod';
import ManagerPhoto from '../../managerPhoto/managerPhoto';
import { useProjectDetails } from '../../../context/projectContext';
import { parseDateWithoutTimezone } from '../../../utils/dateParse';
import Button from 'react-bootstrap/Button';
import TrashIcon from '../../../Assets/trash.svg';
import EditIcon from '../../../Assets/edit.svg';
import AddIcon from '../../../Assets/person-add.svg';
import { useUserDetails } from '../../../context/usercontext';
import { deleteProject } from '../../../services/projects/deleteProject';
import PropTypes from 'prop-types';
import PDFIcon from '../../../Assets/pdf.svg';
import pdfReport from '../../../utils/pdfReport';
import getWorks from '../../../services/board/getWorks';
import { Center } from 'devextreme-react/map';

export default function ProjectItem({
  project,
  onPress,
  onRefreshProjects,
  index,
  setShowEditProject,
  setShowInviteUsersToProject,
}) {
  const [projectDetails, updateProjectDetails] = useProjectDetails();
  const [userDetails] = useUserDetails();
  const parsedStartDate = parseDateWithoutTimezone(project.start_date);
  const parsedEndDate = parseDateWithoutTimezone(project.deadline_date);
  let tasks;
  let epics;
  let progress = 0;

  useEffect(() => {
    getWorks(userDetails.accessToken, project.id)
      .then((data) => {
        epics = data[0];
        tasks = data[1];
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDelete = (project) => {
    if (
      window.confirm(
        `Você tem certeza que deseja deletar ${project.project_name}?`,
      )
    ) {
      deleteProject(userDetails, project.id, onRefreshProjects);
      project.id = '';
      project.project_name = '';
      updateProjectDetails('', '', '', '', '');
    }
  };

  if (project.num_total_tasks !== 0) {
    progress = (project.num_completed_tasks / project.num_total_tasks) * 100;
  }

  return (
    <tr
      style={{
        backgroundColor:
          project.id === projectDetails.projectId
            ? '#bae7ff'
            : index % 2 === 0
            ? ''
            : '#ebebeb',
      }}
      onClick={() =>
        onPress(
          project.id,
          project.project_name,
          project.manager_name,
          project.manager,
          project.manager_email,
        )
      }
    >
      <td>{project.project_name}</td>
      <td>
        <ProgressBar completed={progress} />
      </td>
      <td>
        <DatePeriod startDate={parsedStartDate} endDate={parsedEndDate} />
      </td>
      <td>
        <ManagerPhoto name={project.manager_name} />
      </td>
      <td>
        {project.manager === userDetails.id && (
          <>
            <Button
              variant="outline-light"
              style={{ border: 0 }}
              onClick={() =>
                pdfReport(projectDetails.projectName, epics, tasks)
              }
            >
              <img src={PDFIcon} />
            </Button>

            <Button
              variant="outline-light"
              style={{ border: 0 }}
              onClick={() => setShowInviteUsersToProject(true)}
            >
              <img src={AddIcon} />
            </Button>

            <Button
              variant="outline-light"
              style={{ border: 0 }}
              onClick={() => setShowEditProject(true)}
            >
              <img src={EditIcon} />
            </Button>

            <Button
              variant="outline-light"
              style={{ border: 0 }}
              onClick={() => {
                handleDelete(project);
              }}
            >
              <img src={TrashIcon} />
            </Button>
          </>
        )}
      </td>
    </tr>
  );
}
ProjectItem.propTypes = {
  project: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
  setIndex: PropTypes.func.isRequired,
  onRefreshProjects: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};
