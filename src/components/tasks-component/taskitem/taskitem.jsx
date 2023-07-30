import React, { useState } from "react";
import StatusTask from "../status-task/status-task";
import DatePeriod from "../../datePeriod/datePeriod";
import { parseDateWithoutTimezone } from "../../../utils/dateParse";
import ManagerPhoto from "../../managerPhoto/managerPhoto";
import ActionButtons from "../action-buttons/action-buttons";
import ModalFormTask from "../modal-form-task.component/modal-form-task.component";

export default function Taskitem({ task, setUpdate, update, onRefreshTasks, index }) {
  const [titleAction, setTitleAction] = useState("Editar tarefa");
  const [show, setShow] = useState(false);

  return (
    <>
      <ModalFormTask
        show={show}
        setShow={setShow}
        titleAction={titleAction}
        textButton={"Salvar alterações"}
        task={task}
        onRefreshTasks={onRefreshTasks}
      />
      <tbody>
        <tr style={{backgroundColor: index % 2 === 0 ? '' : '#ebebeb'}}>
          <td>
            <span>{task.title}</span>
          </td>
          <td>
            <StatusTask
              status={task.status}
              taskItem={task}
              onRefreshTasks={onRefreshTasks}
            />
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
              setShowEdit={setShow}
              onRefreshTasks={onRefreshTasks}
              taskId={task.id}
            />
          </td>
        </tr>
      </tbody>
    </>
  );
}
