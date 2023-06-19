import React, { useEffect } from "react";
import StatusTask from "../status-task/status-task";
import { Table } from "reactstrap";
import DatePeriod from "../../dashboard/datePeriod/datePeriod";
import { parseDateWithoutTimezone } from "../../../utils/dateParse";
import ManagerPhoto from "../../dashboard/managerPhoto/managerPhoto";
import ActionButtons from "../../action-buttons/action-buttons";
import { useUserDetails } from "../../../context/usercontext";
import { useProjectDetails } from "../../../context/projectContext";

function TaskTable(props) {
  const { tasks, setIndex, setShow, setTaskSelected } = props;

  const [userDetails] = useUserDetails();
  const [projectDetails] = useProjectDetails();

  return (
    <>
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
              <td>
                <ActionButtons
                  setIndex={setIndex}
                  setShow={setShow}
                  setTaskSelected={setTaskSelected}
                  task={task}
                  userDetails={userDetails}
                  projectDetails={projectDetails}
                />
              </td>
            </tr>
          </tbody>
        ))}
      </Table>
    </>
  );
}

export default TaskTable;
