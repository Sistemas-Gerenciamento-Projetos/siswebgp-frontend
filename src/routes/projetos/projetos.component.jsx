import React from "react"
import DashboardItem from "../../components/dashboard/dashboardItem.component"
import Sidebar from "../../components/sidebar/sidebar.component"

const Projetos = () => {

  return(
    <div style={{display: 'flex', flexDirection: 'row', backgroundColor: '#ebebeb', height: '100vh'}}>
      <div style={{width: '20%', backgroundColor: '#ffffff', margin: '20px'}}>
        <Sidebar menuItem={0}/>
      </div>
      <div style={{display: 'flex', flexDirection: 'column', width: '80%', backgroundColor: '#ffffff', marginTop: '20px', marginRight: '20px', marginBottom: '20px'}}>
        <h1> Projetos </h1>
        <DashboardItem projectProgress={75} startDate={new Date(2023, 2, 1)} endDate={new Date(2023, 6, 24)} managerName={"Eduardo Ferreira"} />
      </div>
    </div>
  )
}

export default Projetos