import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { UserOutlined } from "@ant-design/icons";

const Container = styled.div`
  border-radius: 10px;
  box-shadow: 5px 5px 5px 2px grey;
  padding: 8px;
  color: #000;
  margin-bottom: 8px;
  min-height: 90px;
  margin-left: 10px;
  margin-right: 10px;
  background-color: white;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  &:hover {
    background-color: #ececec;
    transition: 0.3s;
  }
`;

const TextContent = styled.div`
  font-size: 12px;
`;

function taskColor(columnId) {
  if (columnId === "1") {
    return "#FFFED9";
  } else if (columnId === "2") {
    return "#D9FFFA";
  } else if (columnId === "3") {
    return "#FFD9D9";
  } else {
    return "#DDFFD9";
  }
}

export default function Task({ task, index, columnId }) {
  var taskBgColor = taskColor(columnId);

  return (
    <Draggable draggableId={`${task.id}`} key={task.id} index={index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}>
          <div style={{ display: "flex", justifyContent: "start", padding: 2 }}>
            <div
              style={{
                width: "100%",
                backgroundColor: taskBgColor,
                paddingLeft: "5px",
                fontSize: "12px",
              }}>
              {task.title}
            </div>
          </div>
          <div
            style={{ display: "flex", justifyContent: "center", padding: 2 }}>
            <TextContent>{task.description}</TextContent>
          </div>

          <div
            style={{ width: "100%", height: "1px", backgroundColor: "#000" }}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              padding: 2,
              marginTop: "5px",
              alignItems: "center",
              fontSize: "12px",
            }}>
            <div
              style={{
                display: "flex",
                width: "30px",
                height: "30px",
                borderRadius: "60px",
                backgroundColor: taskBgColor,
                alignItems: "center",
                justifyContent: "center",
                marginRight: "5px",
              }}>
              <UserOutlined />
            </div>
            {task.owner}
          </div>
          {provided.placeholder }
        </Container>
      )}
    </Draggable>
  );
}
