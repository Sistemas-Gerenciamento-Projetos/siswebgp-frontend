import React from "react";
import ProgressBar from "./progressBar/progressBar";
import DatePeriod from "./datePeriod/datePeriod";

const DashboardItem = (props) => {
  const { projectProgress, startDate, endDate } = props;

  return(
    <div style={{display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center'}}>
      <div style={{width: '35%', alignItems: 'flex-start'}}>
        <h3> Projeto 1 </h3>
      </div>
      <div style={{display: 'flex', flexDirection: 'row', width: '75%', justifyContent: 'space-around'}}>
        <ProgressBar completed={projectProgress} />
        <DatePeriod startDate={startDate} endDate={endDate}/>
        <p>Foto de perfil dos participantes</p>
        <button>Apagar</button>
      </div>
    </div>
  )
}

export default DashboardItem