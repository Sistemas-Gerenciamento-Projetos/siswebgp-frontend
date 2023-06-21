import React, { useState } from "react";
import ProgressBar from "./progressBar/progressBar";
import DatePeriod from "./datePeriod/datePeriod";
import ManagerPhoto from "./managerPhoto/managerPhoto";
import { useProjectDetails } from "../../context/projectContext";
import { parseDateWithoutTimezone } from "../../utils/dateParse";
import Button from "react-bootstrap/Button";
import TrashIcon from "../../Assets/trash.svg";
import EditIcon from "../../Assets/edit.svg"; 
import AddIcon from "../../Assets/person-add.svg";
import { useUserDetails } from "../../context/usercontext";
import { deleteProject } from "../../services/projects/deleteProject";


const DashboardItem = ({ project, onPress, setIndex, onRefreshProjects }) => {
  const [projectDetails] = useProjectDetails();
  const [userDetails] = useUserDetails();
  const parsedStartDate = parseDateWithoutTimezone(project.creation_date);
  const parsedEndDate = parseDateWithoutTimezone(project.deadline_date);
  var progress = 0;

  const handleDelete = (project) => {
    if (window.confirm(`Você tem certeza que deseja deletar ${project.project_name}?`)) {
      deleteProject(userDetails, project.id, onRefreshProjects)
    }
  };

  if (project.num_total_tasks !== 0) {
    progress = (project.num_completed_tasks / project.num_total_tasks) * 100;
  }

  return (
    <tr
      style={{ backgroundColor: project.id === projectDetails.projectId ? "#bae7ff" : ""}}
      onClick={() => {
        onPress(project.id, project.project_name);
      }}>
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
        <Button variant="outline-light" style={{border:0}} onClick={() => setIndex(2)}>
          <img src={AddIcon}/>
        </Button>
        
        <Button variant="outline-light" style={{border:0}} onClick={() => setIndex(3)}>
          <img src={EditIcon} />
        </Button> 
        
        <Button variant="outline-light"  style={{border:0}} onClick={() => {handleDelete(project)}}>
          <img src={TrashIcon}/>
        </Button> 
      </td>
    </tr>
  );
};

export default DashboardItem;
