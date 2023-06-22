import React, { useEffect, useState } from "react";
import Toolbar from "../../components/toolbar/toolbar.component";
import { useUserDetails } from "../../context/usercontext";
import { useProjectDetails } from "../../context/projectContext";
import { Navigate } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import { getTasks } from "../../services/tasks/getTasks";
import Taskitem from "../../components/tasks-component/taskitem/taskitem";
import ModalFormTask from "../../components/tasks-component/modal-form-task.component/modal-form-task.component";
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
    console.log("tasks");

    setTasks(result);
  }

  useEffect(() => {
    handleData();
    console.log("update");
  }, [update]);

  if (!userDetails.accessToken) {
    return <Navigate replace to="/" />;
  }

  return (
    <>
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
          <Table className="mt-4">
            <thead>
              <tr>
                <th>
                  <p style={{ fontWeight: "600" }}>Nome da Tarefa</p>
                </th>
                <th>
                  <p style={{ fontWeight: "600" }}>Status</p>
                </th>
                <th>
                  <p style={{ fontWeight: "600" }}>Prazo</p>
                </th>
                <th>
                  <p style={{ fontWeight: "600" }}>Responsável</p>
                </th>
                <th>
                  <p style={{ fontWeight: "600" }}>Ações</p>
                </th>
              </tr>
            </thead>

            {tasks.map((task) => (
              <Taskitem
                setUpdate={setUpdate}
                update={update}
                task={task}
                userDetails={userDetails}
                projectDetails={projectDetails}
              />
            ))}
          </Table>
        </>
      )}

      {tasks.length === 0 && (
        <div
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <Empty description="Sem tarefas existentes" />
        </div>
      )}
    </>
  );
};

export default Backlog;
