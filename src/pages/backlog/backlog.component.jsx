import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/sidebar.component";
import Toolbar from "../../components/toolbar/toolbar.component";
import Newtask from "../../components/tasks-component/task-new/task-new";
import Tasks from "../../components/tasks-component/task-list/task-list";
import { Table } from "reactstrap";
import { useUserDetails } from "../../context/usercontext";
import { useProjectDetails } from "../../context/projectContext";
import { Navigate } from "react-router-dom";
import { getTasks } from "../../services/tasks/getTasks";
import { parseDateWithoutTimezone } from "../../utils/dateParse";
import "./backlog.styles.scss";

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
    <div className="root">
      <div className="sidebar-div">
        <Sidebar menuItem={1} />
      </div>

      <div className="page-content">
        <Toolbar title={projectDetails.projectName} />
        <div className="projects-content">
          <div>
            {" "}
            <Newtask />
          </div>
          <Table hover>
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
      </div>
    </div>
  );
};

export default Backlog;
