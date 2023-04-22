import React from "react";
import Sidebar from "../../components/sidebar/sidebar.component";
import FrappeGantt from "frappe-gantt";

const Roteiro = () => {
  const tasks = [
    {
      id: "Task 1",
      name: "Redesign WebSite",
      start: "2016-12-19",
      end: "2016-12-25",
      progress: 20,
      dependencies: "Task 2, Task 3",
      custom_class: "bar-milestone",
    },
  ];

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
        <FrappeGantt
          tasks={tasks}
          viewMode={this.state}
          onClick={(task) => console.log(task)}
          onDateChange={(task, start, end) => console.log(task, start, end)}
          onProgressChange={(task, progress) => console.log(task, progress)}
          onTasksChange={(tasks) => console.log(tasks)}
        />
      </div>
    </div>
  );
};

export default Roteiro;
