import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import TaskColumn from "../taskcolumn/TaskColumn.component";
import { getTasks } from "../../services/tasks/getTasks";
import { STATUS_TODO, STATUS_INPROGRESS, STATUS_PAUSED, STATUS_DONE } from "../../constants/taskStatus";
import { useUserDetails } from "../../context/usercontext";
import { useProjectDetails } from "../../context/projectContext";

export default function Board() {
  const [userDetails, updateUserDetails] = useUserDetails()
  const [projectDetails, updateProjectDetails] = useProjectDetails()
  const [todo, setTodo] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [paused, setPaused] = useState([]);
  const [done, setDone] = useState([]);

  useEffect(() => {
    (async () => {
      const tasks = await getTasks(userDetails.accessToken, projectDetails.projectId);

      console.log(tasks)

      setTodo(tasks.filter((task) => task.status === STATUS_TODO))
      setInProgress(tasks.filter((task) => task.status === STATUS_INPROGRESS))
      setPaused(tasks.filter((task) => task.status === STATUS_PAUSED))
      setDone(tasks.filter((task) => task.status == STATUS_DONE))
    })()
  }, [])

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (destination == null) return;

    if (source.droppableId === destination.droppableId) return;

    // REMOVE FROM SOURCE ARRAY
    if (source.droppableId === 1) {
      setTodo(removeItemById(draggableId, todo));
    } else if (source.droppableId === 2) {
      setInProgress(removeItemById(draggableId, inProgress));
    } else if (source.droppableId === 3) {
      setPaused(removeItemById(draggableId, paused));
    } else if (source.droppableId === 4) {
      setDone(removeItemById(draggableId, done));
    }

    // GET ITEM
    const task = findItemById(draggableId, [
      ...todo,
      ...inProgress,
      ...paused,
      ...done,
    ]);

    // ADD ITEM
    if (destination.droppableId === 1) {
      setTodo([...todo, task]);
    } else if (destination.droppableId === 2) {
      setInProgress([...inProgress, task]);
    } else if (destination.droppableId === 3) {
      setPaused([...paused, task]);
    } else if (destination.droppableId === 4) {
      setDone([...done, task]);
    }
  };

  function findItemById(id, array) {
    return array.find((item) => item.id === id);
  }

  function removeItemById(id, array) {
    return array.filter((item) => item.id !== id);
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          height: "100%",
        }}>
        <TaskColumn title={"A fazer"} tasks={todo} id={"1"} />
        <TaskColumn title={"Em progresso"} tasks={inProgress} id={"2"} />
        <TaskColumn title={"Pausado"} tasks={paused} id={"3"} />
        <TaskColumn title={"Concluido"} tasks={done} id={"4"} />
      </div>
    </DragDropContext>
  );
}
