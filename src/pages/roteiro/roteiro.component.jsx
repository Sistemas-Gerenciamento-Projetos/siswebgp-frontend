import React from "react";
import Sidebar from "../../components/sidebar/sidebar.component";
import "./roteiro.styles.css";
import { Navigate } from "react-router-dom";
import { useUserDetails } from "../../context/usercontext";

import Gantt, {
  Tasks,
  Dependencies,
  Resources,
  ResourceAssignments,
  Column,
  Editing,
  Toolbar,
  Item,
  Validation,
  FilterRow,
  StripLine,
} from "devextreme-react/gantt";

import { tasks } from "../../data";

const Roteiro = () => {
  const currentDate = new Date(Date.now());

  const [userDetails] = useUserDetails();

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
        <Gantt taskListWidth={430} scaleType="weeks" height={800}>
          {/* <FilterRow visible={true} /> */}
          <Tasks
            dataSource={tasks}
            keyExpr="id"
            parentIdExpr="parentId"
            titleExpr="title"
            progressExpr="progress"
            startExpr="start"
            endExpr="end"
            colorExpr="taskColor"
          />
          <StripLine start={tasks[0].start} title="Start" />
          <StripLine
            start={tasks[tasks.length - 3].start}
            end={tasks[tasks.length - 1].end}
            title="Fase Final"
          />
          <StripLine
            start={currentDate}
            title="Current Time"
            cssClass="current-time"
          />

          <Toolbar>
            <Item name="collapseAll" />
            <Item name="expandAll" />
            <Item name="separator" />
            <Item name="addTask" />
            <Item name="deleteTask" />
            <Item name="separator" />
            <Item name="zoomIn" />
            <Item name="zoomOut" />
          </Toolbar>

          <Column dataField="title" caption="Tarefa" width={250} />
          <Column dataField="start" caption="Início" width={75} />
          <Column dataField="end" caption="Fim" width={75} />

          <Validation autoUpdateParentTasks />
          <Editing enabled={true} />
        </Gantt>
      </div>
    </div>
  );
};

export default Roteiro;
