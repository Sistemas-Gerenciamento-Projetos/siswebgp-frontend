import React from "react"
import DashboardItem from "../../components/dashboard/dashboardItem.component"
import Sidebar from "../../components/sidebar/sidebar.component"
import Toolbar from "../../components/toolbar/toolbar.component"
import { Table } from "reactstrap";

const Projetos = () => {

  return(
    <div style={{display: 'flex', flexDirection: 'row', backgroundColor: '#ebebeb', height: '100vh', paddingRight: '20px'}}>
      <div style={{width: '20%', backgroundColor: '#ffffff', margin: '20px'}}>
        <Sidebar menuItem={0}/>
      </div>
      
      <div style={{display: 'flex', flexDirection: 'column', width: '80%', backgroundColor: '#ebebeb'}}>
        <Toolbar title={'Meus projetos'} />
        
        <div style={{display: 'flex', flexDirection: 'column', width: '100%', height: '100%', backgroundColor: '#ffffff', marginTop: '20px', marginRight: '20px', marginBottom: '20px', padding: '15px'}}>
          <Table hover>
            <thead>
              <tr>
                <th>Id</th>
                <th>Nome do projeto</th>
                <th>Progresso</th>
                <th>Prazo</th>
                <th>Responsável</th>
              </tr>
            </thead>
            <tbody>
              <DashboardItem id={1} projectName={'Projeto 1'} projectProgress={75} startDate={new Date(2023, 2, 1)} endDate={new Date(2023, 2, 24)} managerName={"Eduardo Ferreira"} />
              <DashboardItem id={2} projectName={'Projeto 2'} projectProgress={5} startDate={new Date(2023, 2, 1)} endDate={new Date(2023, 6, 24)} managerName={"Alberto Oliveira"} />
              <DashboardItem id={3} projectName={'Projeto 3'} projectProgress={75} startDate={new Date(2023, 2, 1)} endDate={new Date(2023, 6, 24)} managerName={"Fred Durão"} />
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default Projetos