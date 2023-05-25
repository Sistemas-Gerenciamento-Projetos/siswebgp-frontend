import React from "react"
import DashboardItem from "../../components/dashboard/dashboardItem.component"
import Sidebar from "../../components/sidebar/sidebar.component"
import Toolbar from "../../components/toolbar/toolbar.component"
import { Table } from "reactstrap"
import { useState } from "react"
import NovoProjeto from "../../components/form-new-project/new-project"
import "./projetos.component.scss"
import axios from "axios"

const Projetos = () => {
  const [novoProjeto, setNovoProjeto] = useState(true)

  const datestart1 = new Date(2023, 2, 1);
  const dateend1 = new Date(2023, 2, 24);

  function handleRegisterProject(title, description, beginDate, endDate) {
    const parsedTitle = title.trim()
    const parsedDate = endDate === "" ? null : endDate.toISOString().split('T')[0]

    const header = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg0OTY3MjgyLCJpYXQiOjE2ODQ5NjY5ODIsImp0aSI6IjNjMmFjNGQ2ZGQ3OTQ1Y2Y4NWIyZTAzZGUyOWQ5NWM1IiwidXNlcl9pZCI6IjBiMzA1OGE2LTU0ZjYtNDQzOS04NWJmLTE2MWUxMmY2NDUxNiJ9.rD8zmnK_Hh_fKW0xW7GFKWUYBWGnAg6jkC3TBTyLVy0`
      }
    }

    axios.post(
      "http://127.0.0.1:8000/api/projects/", // Colocar no arquivo de constants
      {
        manager: "0b3058a6-54f6-4439-85bf-161e12f64516", // trocar pelo que vem no context
        project_name: parsedTitle,
        description: description,
        deadline_date: parsedDate,
        users: ["0b3058a6-54f6-4439-85bf-161e12f64516"] // trocar pelo que vem no context
      },
      header
    ).then((response) => {
      if (response.status === 201) {
        console.log(response)
        setNovoProjeto(!novoProjeto)
      } else {
        alert(response.message)
      }
    }).catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data)
        console.log(error.response.status)
        console.log(error.response.headers)
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request)
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message)
      }
      // retornar alert com mensagem generica de erro
      alert("Erro inesperado, tente novamente.")
    })
  }

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
    <div className="root">
      <div className="sidebar-div">
        <Sidebar menuItem={0} />
      </div>

      <div className="page-content">
        <Toolbar title={"Meus projetos"} novoProjeto={setNovoProjeto} />
        {novoProjeto && (
          <div className="projects-content">
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
        {!novoProjeto && <NovoProjeto handleRegisterProject={handleRegisterProject} />}
      </div>
    </div>
  )
}

export default Projetos
