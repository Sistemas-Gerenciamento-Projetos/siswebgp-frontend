import React from "react"
import DashboardItem from "../../components/dashboard/dashboardItem.component"
import Sidebar from "../../components/sidebar/sidebar.component"

const Painel = () =>{

  return(
    <div style={{display: 'flex', flexDirection: 'row'}}>
      <div style={{width: '20%'}}>
        <Sidebar menuItem={0}/>
      </div>
      <div style={{display: 'flex', flexDirection: 'column', width: '80%'}}>
        <h1> Painel </h1>
        <DashboardItem projectProgress={75} startDate={new Date(2023, 2, 1)} endDate={new Date(2023, 6, 24)} managerName={"Eduardo Ferreira"} />
      </div>
    </div>
  )
}

export default Painel