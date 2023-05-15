import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import TaskColumn from "../taskcolumn/TaskColumn.component";

export default function Board() {
  const [completed, setCompleted] = useState([]);
  const [incomplete, setIncomplete] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => {
        setCompleted(json.filter((task) => task.completed));
        setIncomplete(json.filter((task) => !task.completed));
      });
  }, []);

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (source.droppableId == destination.droppableId) return;

    //REMOVE FROM SOURCE ARRAY

    if (source.droppableId == 2) {
      setCompleted(removeItemById(draggableId, completed));
    } else {
      setIncomplete(removeItemById(draggableId, incomplete));
    }

    // GET ITEM

    const task = findItemById(draggableId, [...incomplete, ...completed]);

    //ADD ITEM
    if (destination.droppableId == 2) {
      setCompleted([{ ...task, completed: !task.completed }, ...completed]);
    } else {
      setIncomplete([{ ...task, completed: !task.completed }, ...incomplete]);
    }
  };

  function findItemById(id, array) {
    return array.find((item) => item.id == id);
  }

  function removeItemById(id, array) {
    return array.filter((item) => item.id != id);
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <TaskColumn title={"Em progresso"} tasks={incomplete} id={"1"} />
        <TaskColumn title={"Pausado"} tasks={completed} id={"2"} />
        <TaskColumn title={"Concluído"} tasks={[]} id={"3"} />
      </div>
    </DragDropContext>
  );
}