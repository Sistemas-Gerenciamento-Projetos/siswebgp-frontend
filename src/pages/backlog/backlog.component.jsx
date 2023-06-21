import React, { useEffect, useState } from "react";
import Toolbar from "../../components/toolbar/toolbar.component";
import { useUserDetails } from "../../context/usercontext";
import { useProjectDetails } from "../../context/projectContext";
import { Navigate } from "react-router-dom";
import { Button, Row, Col, Container } from "react-bootstrap";
import { getTasks } from "../../services/tasks/getTasks";
import Taskitem from "../../components/tasks-component/taskitem/taskitem";
import ModalFormTask from "../../components/tasks-component/modal-form-task.component/modal-form-task.component";
import "./backlog.styles.scss";
import { Empty } from "antd";

const Backlog = () => {
  const [userDetails] = useUserDetails();
  const [projectDetails] = useProjectDetails();
  const [show, setShow] = useState(false);

  const [tasks, setTasks] = useState([]);
  const [update, setUpdate] = useState(false);

  async function handleData() {
    const result = await getTasks(
      userDetails.accessToken,
      projectDetails.projectId
    );

    setTasks(result);
  }

  const test = () => {
    handleData();
    console.log(tasks);
  };

  useEffect(() => {
    handleData();
    console.log("useffect");
  }, [update]);

  if (!userDetails.accessToken) {
    return <Navigate replace to="/" />;
  }

  return (
    <Container className="backlog-main">
      <Toolbar title={projectDetails.projectName} />

      <Button variant="primary" onClick={() => setShow(true)}>
        Nova tarefa
      </Button>
      <ModalFormTask
        show={show}
        setShow={setShow}
        titleAction={"Nova tarefa"}
        textButton={"Criar tarefa"}
        setUpdate={setUpdate}
        update={update}
      />

      {tasks.length !== 0 && (
        <>
          <Row className="mt-4">
            <Col sm={3} xl={3}>
              <h4>Nome da Tarefa</h4>
            </Col>
            <Col sm={2} xl={2}>
              <h4>Status</h4>
            </Col>
            <Col sm={3} xl={3}>
              <h4>Prazo</h4>
            </Col>
            <Col sm={2} xl={2}>
              <h4>Responsável</h4>
            </Col>
            <Col sm={2} xl={2}>
              <h4>Ações</h4>
            </Col>
            <hr class="hr hr-blurry" />
          </Row>
          {tasks.map((task) => (
            <Taskitem
              setUpdate={setUpdate}
              update={update}
              task={task}
              userDetails={userDetails}
              projectDetails={projectDetails}
            />
          ))}
        </>
      )}

      {tasks.length === 0 && (
        <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Empty description="Sem tarefas existentes" />
        </div>
      )}
    </Container>
  );
};

export default Backlog;
