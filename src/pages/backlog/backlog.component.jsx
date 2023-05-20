import React from "react"
import Sidebar from "../../components/sidebar/sidebar.component"
import Toolbar from "../../components/toolbar/toolbar.component"
import Newtask from "../../components/task-new/task-new"
import Tasks from "../../components/task/task.component"
import { Table } from "reactstrap";
import "./backlog.component.scss"

const Backlog = () =>{

  const datestart1 = new Date(2023, 2, 1);
  const dateend1 = new Date(2023, 2, 24);

  const tasklist = [
    {
      taskName: "Definição da Arquitetura",
      //taskstatus: successo,
      startDate: datestart1,
      endDate: dateend1,
      managerName: "Alberto Oliveira",
    },
    {
      taskName: "Criação do Banco de Dados",
      //taskstatus: progresso,
      startDate: datestart1,
      endDate: dateend1,
      managerName: "Eduardo Ferreira",
    },
  ];

  return(
    <div 
      style={{
        display: 'flex', 
        flexDirection: 'row', 
        backgroundColor: '#ebebeb', 
        height: '100vh'
      }}>
      <div 
        style={{
          width: '20%', 
          backgroundColor: '#ffffff', 
          margin: '20px'
        }}>
        <Sidebar menuItem={1}/>
      </div>
      <div 
        style={{
          display: 'flex', 
          flexDirection: 'column', 
          width: '80%', 
          backgroundColor: '#ebebeb', 
          marginRight: '20px'
        }}>
        <Toolbar title={"Projeto 1 - xxx"}/>
          <div className="main">
            <div><Newtask />
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
                      taskName={task.taskName}
                      taskstatus={task.taskstatus}
                      startDate={task.startDate}
                      endDate={task.endDate}
                      managerName={task.managerName}
                    />
                  ))}
                </tbody>
            </Table>
          </div>    
      </div>
    </div>
  )
}

export default Backlog