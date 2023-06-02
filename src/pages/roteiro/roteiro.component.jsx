import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/sidebar.component";
import "./roteiro.styles.css";
import { Navigate } from "react-router-dom";
import { useUserDetails } from "../../context/usercontext";
import { useProjectDetails } from "../../context/projectContext";
import { getTasks } from "../../services/tasks/getTasks";

import Gantt, {
  Tasks,
  Column,
  Editing,
  Toolbar,
  Validation,
  Item,
  StripLine,
} from "devextreme-react/gantt";

import { tasks } from "../../data";

const Roteiro = () => {
  const currentDate = new Date(Date.now());

  const [userDetails] = useUserDetails();
  const [projectDetails] = useProjectDetails();

  const [tasks1, setTasks1] = useState([]);

  async function handleData() {
    console.log("calling");
    const result = await getTasks(
      userDetails.accessToken,
      projectDetails.projectId
    );
    console.log("resolved");
    setTasks1(result);
  }

  useEffect(() => {
    handleData();
  }, []);

  if (!userDetails.accessToken) {
    return <Navigate replace to="/" />;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#ebebeb",
        height: "100vh",
      }}>
      <div style={{ width: "20%", backgroundColor: "#ffffff", margin: "20px" }}>
        <Sidebar menuItem={3} />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "80%",
          marginTop: "20px",
        }}>
        <Gantt taskListWidth={220} scaleType="weeks" height={800}>
          {/* StripLine doens't work when the datas are called with a async function */}
          <StripLine
            start={currentDate}
            title="Current Time"
            cssClass="current-time"
          />
          <Tasks
            dataSource={tasks1}
            keyExpr="id"
            parentIdExpr="parentId"
            titleExpr="title"
            progressExpr="progress"
            startExpr="start_date"
            endExpr="deadline_date"
            colorExpr="taskColor"
          />
          <Toolbar>
            <Item name="zoomIn" />
            <Item name="zoomOut" />
          </Toolbar>
          <Column dataField="title" caption="Tarefa" width={100} />
          <Validation autoUpdateParentTasks />
          <Editing enabled={false} />
        </Gantt>
      </div>
    </div>
  );
};

export default Roteiro;
