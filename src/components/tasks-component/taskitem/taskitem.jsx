import React, { useState } from "react";
import StatusTask from "../status-task/status-task";
import DatePeriod from "../../datePeriod/datePeriod";
import { parseDateWithoutTimezone } from "../../../utils/dateParse";
import ManagerPhoto from "../../managerPhoto/managerPhoto";
import ActionButtons from "../action-buttons/action-buttons";
import { deleteTask } from "../../../services/tasks/deleteTask";
import ModalFormTask from "../modal-form-task.component/modal-form-task.component";
export default function Taskitem({
  task,
  setUpdate,
  update,
  userDetails,
  projectDetails,
}) {
  const deleteAction = () => {
    deleteTask(userDetails, projectDetails, task.id);
    setUpdate(!update);
  };

  const [show, setShow] = useState(false);

  return (
    <>
      <ModalFormTask
        show={show}
        setShow={setShow}
        titleAction={"Editar tarefa"}
        textButton={"Salvar alterações"}
        task={task}
        setUpdate={setUpdate}
        update={update}
      />
      <tbody>
        <tr onDoubleClick={() => setShow(true)}>
          <td>
            <span>{task.title}</span>
          </td>
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
              deleteAction={deleteAction}
              setShowEdit={setShow}
              setUpdate={setUpdate}
              update={update}
            />
          </td>
        </tr>
      </tbody>
    </>
  );
}
