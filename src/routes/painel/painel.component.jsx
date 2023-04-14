import React from "react"
import DashboardItem from "../../components/dashboard/dashboardItem.component"

const Painel = () =>{

  return(
    <div id="root">
      <h1> Painel </h1>
      <DashboardItem projectProgress={75} startDate={new Date(2023, 2, 1)} endDate={new Date(2023, 6, 24)} managerName={"Eduardo Ferreira"} />
    </div>
  )
}

export default Painel