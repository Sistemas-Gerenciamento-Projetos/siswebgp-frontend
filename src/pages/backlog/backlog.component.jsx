import React, { useEffect, useState } from "react";
import Toolbar from "../../components/toolbar/toolbar.component";
import Newtask from "../../components/tasks-component/task-new/task-new";
import Tasks from "../../components/tasks-component/task-list/task-list";
import { Table } from "reactstrap";
import { useUserDetails } from "../../context/usercontext";
import { useProjectDetails } from "../../context/projectContext";
import { Navigate } from "react-router-dom";
import { getTasks } from "../../services/tasks/getTasks";
import { parseDateWithoutTimezone } from "../../utils/dateParse";
import { ToastContainer } from "react-toastify";

const Backlog = () => {
  const [userDetails] = useUserDetails();
  const [projectDetails] = useProjectDetails();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    (async () => {
      const tasksfromdb = await getTasks(
        userDetails.accessToken,
        projectDetails.projectId
      );
      setTasks(tasksfromdb);
    })();
  }, []);

  if (!userDetails.accessToken) {
    return <Navigate replace to="/" />;
  }

  return (
    <>
      <Toolbar title={projectDetails.projectName} />
      <div>
        <Newtask />
        <Table>
          <thead>
            <tr>
              <th>Nome da Tarefa</th>
              <th>Status</th>
              <th>Prazo</th>
              <th>Responsável</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <Tasks
                title={task.title}
                status={task.status}
                beginDate={parseDateWithoutTimezone(task.start_date)}
                deadlineDate={parseDateWithoutTimezone(task.deadline_date)}
                user={task.user_name}
                taskItem={task}
              />
            ))}
          </tbody>
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
