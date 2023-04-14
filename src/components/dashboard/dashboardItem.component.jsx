import React from "react";
import ProgressBar from "./progressBar/progressBar";
import DatePeriod from "./datePeriod/datePeriod";
import ManagerPhoto from "./managerPhoto/managerPhoto";

const DashboardItem = (props) => {
  const { projectProgress, startDate, endDate, managerName } = props;

  return(
    <div style={{display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center'}}>
      <div style={{width: '35%', alignItems: 'flex-start'}}>
        <h3> Projeto 1 </h3>
      </div>
      <div style={{display: 'flex', flexDirection: 'row', width: '75%', justifyContent: 'space-around'}}>
        <ProgressBar completed={projectProgress} />
        <DatePeriod startDate={startDate} endDate={endDate}/>
        <ManagerPhoto name={managerName}/>
        <button>Apagar</button>
      </div>
    </div>
  )
}

export default DashboardItem