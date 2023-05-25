import React, { useEffect } from "react";
import DashboardItem from "../../components/dashboard/dashboardItem.component";
import Sidebar from "../../components/sidebar/sidebar.component";
import Toolbar from "../../components/toolbar/toolbar.component";
import { Table } from "reactstrap";
import { useState } from "react";
import NovoProjeto from "../../components/form-new-project/new-project";
import "./projetos.component.scss";
import { useUserDetails } from "../../context/usercontext";
import { Navigate } from "react-router-dom";

const Projetos = () => {
  const [userDetails, updateUserDetails] = useUserDetails();
  const [novoProjeto, setNovoProjeto] = useState(true);

  if (!userDetails.accessToken) {
    return <Navigate replace to="/" />;
  }

  const datestart1 = new Date(2023, 2, 1);
  const dateend1 = new Date(2023, 2, 24);

  const projects = [
    {
      id: 1,
      projectName: "Projeto 1",
      projectProgress: 3,
      startDate: datestart1,
      endDate: dateend1,
      managerName: "Alberto Oliveira",
    },
    {
      id: 2,
      projectName: "Projeto 2",
      projectProgress: 5,
      startDate: datestart1,
      endDate: dateend1,
      managerName: "Eduardo Ferreira",
    },
    {
      id: 3,
      projectName: "Projeto 3",
      projectProgress: 75,
      startDate: datestart1,
      endDate: dateend1,
      managerName: "Fred Durão",
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#ebebeb",
        height: "100vh",
        paddingRight: "20px",
      }}>
      <div style={{ width: "20%", backgroundColor: "#ffffff", margin: "20px" }}>
        <Sidebar menuItem={0} />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "80%",
          backgroundColor: "#ebebeb",
        }}>
        <Toolbar title={"Meus projetos"} novoProjeto={setNovoProjeto} />
        {novoProjeto && (
          <div className="main">
            <Table hover>
              <thead>
                <tr>
                  <th>Nome do projeto</th>
                  <th>Progresso</th>
                  <th>Prazo</th>
                  <th>Responsável</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <DashboardItem
                    id={project.id}
                    projectName={project.projectName}
                    projectProgress={project.projectProgress}
                    startDate={project.startDate}
                    endDate={project.endDate}
                    managerName={project.managerName}
                  />
                ))}
              </tbody>
            </Table>
          </div>
        )}
        {!novoProjeto && <NovoProjeto />}
      </div>
    </div>
  );
};

export default Projetos;
