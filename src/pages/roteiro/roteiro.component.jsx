import React from "react";
import Sidebar from "../../components/sidebar/sidebar.component";
import "./roteiro.styles.css";
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

import {
  tasks,
  dependencies,
  resources,
  resourceAssignments,
} from "../../data";

const Roteiro = () => {
  const currentDate = new Date(Date.now());
  // const month = currentDate.getMonth();
  // const year = currentDate.getFullYear;

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
        }}>
        <Gantt taskListWidth={500} scaleType="weeks" height={700}>
          <FilterRow visible={true} />
          <Tasks dataSource={tasks} />
          {/* <Dependencies dataSource={dependencies} /> */}
          {/* <Resources dataSource={resources} /> */}
          {/* <ResourceAssignments dataSource={resourceAssignments} /> */}
          <StripLine start={tasks[0].start} title="Start" />
          <StripLine
            start={tasks[tasks.length - 3].start}
            end={tasks[tasks.length - 1].end}
            title="Final Phase"
          />
          <StripLine
            start={currentDate}
            title="Current Time"
            cssClass="current-time"
          />

          <Toolbar>
            <Item name="undo" />
            <Item name="redo" />
            <Item name="separator" />
            <Item name="collapseAll" />
            <Item name="expandAll" />
            <Item name="separator" />
            <Item name="addTask" />
            <Item name="deleteTask" />
            <Item name="separator" />
            <Item name="zoomIn" />
            <Item name="zoomOut" />
          </Toolbar>

          <Column dataField="title" caption="Tarefa" width={300} />
          <Column dataField="start" caption="Data de Início" />
          <Column dataField="end" caption="Data de Fim" />

          <Validation autoUpdateParentTasks />
          <Editing enabled={true} />
        </Gantt>
      </div>
    </div>
  );
};

export default Roteiro;
