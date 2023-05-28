import React, { useState } from "react";
import Sidebar from "../../components/sidebar/sidebar.component";
import Toolbar from "../../components/toolbar/toolbar.component";
import Newtask from "../../components/tasks-component/task-new/task-new";
import Tasks from "../../components/tasks-component/task-list/task-list";
import { Table } from "reactstrap";
import "./backlog.styles.scss";
import { useUserDetails } from "../../context/usercontext";
import { useProjectDetails } from "../../context/projectContext";

import { Navigate } from "react-router-dom";
import { getTasks } from "../../services/tasks/getTasks";

const Backlog = () => {
  const [userDetails, updateUserDetails] = useUserDetails();
  const [projectDetails] = useProjectDetails();

  const [novaTarefa, setNovaTarefa] = useState(true);

  if (!userDetails.accessToken) {
    return <Navigate replace to="/" />;
  }

  const datestart1 = new Date(2023, 2, 1);
  const dateend1 = new Date(2023, 2, 24);

  const tasklist = [
    {
      title: "Definição da Arquitetura",
      status: "Em andamento",
      beginDate: datestart1,
      deadlineDate: dateend1,
      user: "Alberto Oliveira",
    },
    {
      title: "Criação do Banco de Dados",
      status: "Concluído",
      beginDate: datestart1,
      deadlineDate: dateend1,
      user: "Eduardo Ferreira",
    },
  ];

  return (
    <div className="root">
      <div className="sidebar-div">
        <Sidebar menuItem={1} />
      </div>

      <div className="page-content">
        <div className="page-content">
          <Toolbar title={"Projeto 1 - xxx"} />
          <div className="projects-content">
            <div>
              {" "}
              <Newtask />{" "}
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
                {tasklist.map((task) => (
                  <Tasks
                    title={task.title}
                    status={task.status}
                    beginDate={task.beginDate}
                    deadlineDate={task.deadlineDate}
                    user={task.user}
                  />
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
      {/* <button onClick={getTasks(projectDetails)}> teste get Tasks</button> */}
    </div>
  );
};

export default Backlog;
