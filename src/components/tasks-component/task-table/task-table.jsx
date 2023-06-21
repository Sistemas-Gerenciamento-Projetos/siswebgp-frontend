import React, { useEffect, useState } from "react";
import StatusTask from "../status-task/status-task";
import { Table } from "reactstrap";
import DatePeriod from "../../datePeriod/datePeriod";
import { parseDateWithoutTimezone } from "../../../utils/dateParse";
import ManagerPhoto from "../../managerPhoto/managerPhoto";
import ActionButtons from "../action-buttons/action-buttons";
import { useUserDetails } from "../../../context/usercontext";
import { useProjectDetails } from "../../../context/projectContext";
import { getTasks } from "../../../services/tasks/getTasks";
import { deleteTask } from "../../../services/tasks/deleteTask";

function TaskTable(props) {
  const { setIndex, setShow, show, setTaskSelected, taskSelected, editAction } =
    props;

  const [userDetails] = useUserDetails();
  const [projectDetails] = useProjectDetails();
  const [tasks, setTasks] = useState([]);
  const [update, setUpdate] = useState(false);

  async function handleData() {
    const result = await getTasks(
      userDetails.accessToken,
      projectDetails.projectId
    );

    setTasks(result);
  }

  const handleTask = (task) => {
    setTaskSelected(task);
  };

  const deleteAction = () => {
    const res = deleteTask(userDetails, projectDetails, taskSelected.id);
    if (res) setUpdate(!update);
  };

  useEffect(() => {
    handleData();
  }, [update, show]);

  return (
    <Table className="mt-4 ">
      <thead>
        <tr className="text">
          <th>Nome da Tarefa</th>
          <th>Status</th>
          <th>Prazo</th>
          <th>Responsável</th>
          <th></th>
        </tr>
      </thead>
      {tasks.map((task) => (
        <tbody>
          <tr>
            <td>{task.title}</td>
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
            <td onClick={() => handleTask(task)}>
              <ActionButtons
                setIndex={setIndex}
                setShowEdit={setShow}
                deleteAction={deleteAction}
              />
            </td>
          </tr>
        </tbody>
      ))}
    </Table>
  );
}

export default TaskTable;
