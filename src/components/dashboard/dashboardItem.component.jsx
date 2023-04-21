import React from "react";
import ProgressBar from "./progressBar/progressBar";
import DatePeriod from "./datePeriod/datePeriod";
import ManagerPhoto from "./managerPhoto/managerPhoto";
import styles from './dashboardItemStyles'

const DashboardItem = (props) => {
  const { projectName, projectProgress, startDate, endDate, managerName } = props;

  return(
    <div style={styles.root}>
      <div style={styles.h3Div}>
        <h4> {projectName} </h4>
      </div>
      <div style={styles.projectDetailsDiv}>
        <ProgressBar completed={projectProgress} />
        <DatePeriod startDate={startDate} endDate={endDate}/>
        <ManagerPhoto name={managerName}/>
        <button>Apagar</button>
      </div>
    </div>
  )
}

export default DashboardItem