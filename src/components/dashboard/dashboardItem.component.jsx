import React, { useState } from "react";
import ProgressBar from "./progressBar/progressBar";
import DatePeriod from "./datePeriod/datePeriod";
import ManagerPhoto from "./managerPhoto/managerPhoto";
import { useProjectDetails } from "../../context/projectContext";
import { parseDateWithoutTimezone } from "../../utils/dateParse";
import { hover } from "@testing-library/user-event/dist/hover";
import Button from "react-bootstrap/Button";
import TrashIcon from "../../Assets/trash.svg";
import EditIcon from "../../Assets/edit.svg"; 
import AddIcon from "../../Assets/person-add.svg";
import { Border } from "devextreme-react/bar-gauge";
import { deleteProject } from "../../services/projects/deleteProject";
import { toast } from "react-toastify";
import { useUserDetails } from "../../context/usercontext";


const DashboardItem = ({ 
  project, 
  onPress, 
  setIndex,
  setRefresh,
  refresh,
  setShow,
  setProjectSelected,
  Project}) => {
  
  const [projectDetails] = useProjectDetails();
  const [userDetails] = useUserDetails();
  const parsedStartDate = parseDateWithoutTimezone(project.creation_date);
  const parsedEndDate = parseDateWithoutTimezone(project.deadline_date);
  var progress = 0;

  const handleDelete = () => {
    if (deleteProject(userDetails, projectDetails)) {
      //setIndex(0);
      setRefresh(!refresh);
      toast.success("Projeto excluído", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const handleClick = () => {
    setShow(true);
    setIndex(1);
    setProjectSelected(project);
  };

  if (project.num_total_tasks !== 0) {
    progress = (project.num_completed_tasks / project.num_total_tasks) * 100;
  }

  return (

    <tr
      style={{
        backgroundColor:
          project.id === projectDetails.projectId ? "#bae7ff" : "",
      }}
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
        <Button 
          variant="outline-light" 
          style={{border:0}} 
          onClick={() => setIndex(2)} 
        >
            <img src={AddIcon}/>
        </Button>
        <Button 
          variant="outline-light" 
          style={{border:0}} 
          onClick={() => setIndex(3) (handleClick)} >
          <img src={EditIcon}/>
        </Button> 
        <Button  variant="outline-light"  style={{border:0}} onClick={handleDelete}>
          <img src={TrashIcon}/>
        </Button> 

      </td>
    </tr>
  );
};

export default DashboardItem;
