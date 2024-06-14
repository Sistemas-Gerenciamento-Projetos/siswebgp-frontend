import React from 'react';
import ProgressBar from '../progressBar/progressBar';
import DatePeriod from '../../datePeriod/datePeriod';
import ManagerPhoto from '../../managerPhoto/managerPhoto';
import { useProjectDetails } from '../../../context/projectContext';
import { parseDateWithoutTimezone } from '../../../utils/dateParse';
import Button from 'react-bootstrap/Button';
import { useUserDetails } from '../../../context/usercontext';
import { deleteProject } from '../../../services/projects/deleteProject';
import PropTypes from 'prop-types';
import pdfReport from '../../../utils/pdfReport';
import { showErrorToast, showSuccessToast } from '../../../utils/Toasts';
import {
  DeleteOutlined,
  EditOutlined,
  FilePdfOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

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
  let progress = 0;

  const handleDelete = (project) => {
    if (
      window.confirm(
        `Você tem certeza que deseja deletar ${project.project_name}?`,
      )
    ) {
      deleteProject(userDetails.accessToken, project.id)
        .then((data) => {
          if (data.status === 204) {
            project.id = '';
            project.project_name = '';
            updateProjectDetails('', '', '', '', '');
            showSuccessToast('Projeto excluído');
            onRefreshProjects();
          }
        })
        .catch((error) => {
          console.log(error);
          showErrorToast('Erro ao excluir projeto');
        });
    }
  };

  if (project.num_total_tasks !== 0) {
    progress = (project.num_completed_tasks / project.num_total_tasks) * 100;
  }

  const pdfTooltip = <Tooltip id="tooltip">Baixar relatório</Tooltip>;

  const manageUsersTooltip = <Tooltip id="tooltip">Gerenciar membros</Tooltip>;

  const editTooltip = <Tooltip id="tooltip">Editar projeto</Tooltip>;

  const deleteTooltip = <Tooltip id="tooltip">Deletar projeto</Tooltip>;

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
            <OverlayTrigger placement="bottom" overlay={pdfTooltip}>
              <Button
                variant="outline-dark"
                style={{ border: 0 }}
                onClick={() => {
                  pdfReport(
                    projectDetails.projectName,
                    userDetails.accessToken,
                    projectDetails.projectId,
                  );
                }}
              >
                <FilePdfOutlined />
              </Button>
            </OverlayTrigger>

            <OverlayTrigger placement="bottom" overlay={manageUsersTooltip}>
              <Button
                variant="outline-dark"
                style={{ border: 0 }}
                onClick={() => setShowInviteUsersToProject(true)}
              >
                <UserAddOutlined />
              </Button>
            </OverlayTrigger>

            <OverlayTrigger placement="bottom" overlay={editTooltip}>
              <Button
                variant="outline-dark"
                style={{ border: 0 }}
                onClick={() => setShowEditProject(true)}
              >
                <EditOutlined />
              </Button>
            </OverlayTrigger>

            <OverlayTrigger placement="bottom" overlay={deleteTooltip}>
              <Button
                variant="outline-dark"
                style={{ border: 0 }}
                onClick={() => {
                  handleDelete(project);
                }}
              >
                <DeleteOutlined />
              </Button>
            </OverlayTrigger>
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
