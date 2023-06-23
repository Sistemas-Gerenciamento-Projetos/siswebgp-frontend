import React from "react";
import { Table } from "reactstrap";
import ProgressBar from "../progressBar/progressBar";
import DatePeriod from "../../datePeriod/datePeriod";
import { parseDateWithoutTimezone } from "../../../utils/dateParse";
import ManagerPhoto from "../../managerPhoto/managerPhoto";
import ActionButtons from "../../action-buttons/action-buttons";
import { deleteProject } from "../../../services/projects/deleteProject";

function TableProject({
  projects,
  projectDetails,
  onClickProject,
  setIndex,
  userDetails,
}) {
  const addButton = () => {
    console.log("add");
  };
  const editButton = () => {
    console.log("edit");
  };

  const deleteButton = () => {
    deleteProject(userDetails, projectDetails);
    console.log("delete");
  };

  return (
    <Table>
      <thead>
        <tr>
          <th>Nome do projeto</th>
          <th>Progresso</th>
          <th>Prazo</th>
          <th>Gerente</th>
          <th></th>
        </tr>
      </thead>
      {projects.map((project) => (
        <tbody>
          <tr
            style={{
              backgroundColor:
                project.id === projectDetails.projectId ? "#bae7ff" : "",
            }}
            onClick={() => {
              onClickProject(project.id, project.project_name);
            }}>
            <td>{project.project_name}</td>
            <td>
              <ProgressBar
                completed={
                  project.num_total_tasks !== 0
                    ? (project.num_completed_tasks / project.num_total_tasks) *
                      100
                    : 0
                }
              />
            </td>
            <td>
              <DatePeriod
                startDate={parseDateWithoutTimezone(project.creation_date)}
                endDate={parseDateWithoutTimezone(project.deadline_date)}
              />
            </td>
            <td>
              <ManagerPhoto name={project.manager_name} />
            </td>
            <td>
              <ActionButtons
                addButton={addButton}
                editButton={editButton}
                deleteAction={deleteButton}
              />
            </td>
          </tr>
        </tbody>
      ))}
    </Table>
  );
}

export default TableProject;
