import React, { useState } from "react";
import StatusTask from "../status-task/status-task";
import DatePeriod from "../../datePeriod/datePeriod";
import { parseDateWithoutTimezone } from "../../../utils/dateParse";
import ManagerPhoto from "../../managerPhoto/managerPhoto";
import ActionButtons from "../action-buttons/action-buttons";
import { Col, Row, Container } from "react-bootstrap";
import { deleteTask } from "../../../services/tasks/deleteTask";
import ModalFormTask from "../modal-form-task.component/modal-form-task.component";
import "./taskitem.scss";
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
    <Container className="task-item">
      <ModalFormTask
        show={show}
        setShow={setShow}
        titleAction={"Editar tarefa"}
        textButton={"Salvar Alterações"}
        task={task}
        setUpdate={setUpdate}
        update={update}
      />
      <Row onDoubleClick={() => setShow(true)}>
        <Col sm={3} xl={3}>
          <p>{task.title}</p>
        </Col>
        <Col sm={2} xl={2}>
          <StatusTask status={task.status} taskItem={task} />
        </Col>
        <Col sm={3} xl={3}>
          <DatePeriod
            startDate={parseDateWithoutTimezone(task.start_date)}
            endDate={parseDateWithoutTimezone(task.deadline_date)}
          />
        </Col>
        <Col sm={2} xl={2}>
          <ManagerPhoto name={task.user_name} />
        </Col>
        <Col sm={2} xl={2}>
          <ActionButtons
            deleteAction={deleteAction}
            setShowEdit={setShow}
            setUpdate={setUpdate}
            update={update}
          />
        </Col>
      </Row>
      <hr className="hr hr-blurry pb-2" />
    </Container>
  );
}
