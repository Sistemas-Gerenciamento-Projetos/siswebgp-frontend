import React, { useEffect, useState } from "react";
import Toolbar from "../../components/toolbar/toolbar.component";
import Newtask from "../../components/tasks-component/task-new/task-new";
import StatusTask from "../../components/tasks-component/status-task/status-task";
import { Table } from "reactstrap";
import { useUserDetails } from "../../context/usercontext";
import { useProjectDetails } from "../../context/projectContext";
import { Navigate } from "react-router-dom";
import { getTasks } from "../../services/tasks/getTasks";
import { parseDateWithoutTimezone } from "../../utils/dateParse";
import { ToastContainer } from "react-toastify";
import DatePeriod from "../../components/dashboard/datePeriod/datePeriod";
import ManagerPhoto from "../../components/dashboard/managerPhoto/managerPhoto";
import { Button } from "react-bootstrap";
import ActionButtons from "../../components/action-buttons/action-buttons";

const Backlog = () => {
  const [userDetails] = useUserDetails();
  const [projectDetails] = useProjectDetails();
  const [tasks, setTasks] = useState([]);
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(false);
  const [taskSelected, setTaskSelected] = useState(false);

  const newedittasktitle = {
    0: "Nova tarefa",
    1: "Editar tarefa",
  };

  const buttontask = {
    0: "Criar tarefa",
    1: "Editar tarefa",
  };

  useEffect(() => {
    (async () => {
      const tasksfromdb = await getTasks(
        userDetails.accessToken,
        projectDetails.projectId
      );
      setTasks(tasksfromdb);
    })();
  }, [tasks]);

  useEffect(() => {
    if (!show) setIndex(0);
  }, [show]);

  if (!userDetails.accessToken) {
    return <Navigate replace to="/" />;
  }

  return (
    <>
      <Toolbar title={projectDetails.projectName} />
      <div>
        <Button variant="primary" onClick={() => setShow(true)}>
          {newedittasktitle[index]}
        </Button>
        <Newtask
          titleTask={newedittasktitle[index]}
          textButton={buttontask[index]}
          actionTask={0}
          setShow={setShow}
          show={show}
          task={taskSelected}
        />

        <Table>
          <thead>
            <tr>
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
                <DatePeriod
                  startDate={parseDateWithoutTimezone(task.start_date)}
                  endDate={parseDateWithoutTimezone(task.deadline_date)}
                />
                <td>
                  <ManagerPhoto name={task.user_name} />
                </td>
                <td onClick={() => setTaskSelected(task)}>
                  <ActionButtons setShow={setShow} setIndex={setIndex} />
                </td>
              </tr>
            </tbody>
          ))}
        </Table>
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="colored"
      />
    </>
  );
};

export default Backlog;
