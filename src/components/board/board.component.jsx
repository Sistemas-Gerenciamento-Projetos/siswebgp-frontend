import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import TaskColumn from "../taskcolumn/TaskColumn.component";

const mockedTodoTasks = [
  {
    userId: 1, 
    id: 1,
    title: "Implementação painel de visualização",
    description: "Realizar implementação do painel de visualização das tasks",
    status: "TODO"
  },
  {
    userId: 2, 
    id: 2,
    title: "Integração do Login com Backend",
    description: "Integrar endpoint de login com backend",
    status: "INPROGRESS"
  },
  {
    userId: 4, 
    id: 4,
    title: "Testes unitários",
    description: "Cobrir endpoints com testes unitários",
    status: "PAUSED"
  },
  {
    userId: 3, 
    id: 3,
    title: "Layout do cadastro de novo projeto",
    description: "Implementar layout e estilização da tela de cadastro de novo projeto",
    status: "DONE"
  }
]

export default function Board() {
  const [todo, setTodo] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [paused, setPaused] = useState([])
  const [done, setDone] = useState([])

  useEffect(() => {
    setTodo([])
    setInProgress([])
    setPaused([])
    setDone([])

    mockedTodoTasks.map((task) => {
      if (task.status === "TODO") {
        setTodo([...todo, task])
      } else if (task.status === "INPROGRESS") {
        setInProgress([...inProgress, task]) 
      } else if (task.status === "DONE") {
        setDone([...done, task])
      } else if (task.status === "PAUSED") {
        setPaused([...paused, task])
      }
    })
  }, [])

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (destination == null) return;

    if (source.droppableId == destination.droppableId) return;

    // REMOVE FROM SOURCE ARRAY
    if (source.droppableId == 1) {
      setTodo(removeItemById(draggableId, todo));
    } else if (source.droppableId == 2) {
      setInProgress(removeItemById(draggableId, inProgress));
    } else if (source.droppableId == 3) {
      setPaused(removeItemById(draggableId, paused))
    } else if (source.droppableId == 4) {
      setDone(removeItemById(draggableId, done))
    }

    // GET ITEM
    const task = findItemById(draggableId, [...todo, ...inProgress, ...paused, ...done]);

    // ADD ITEM
    if (destination.droppableId == 1) {
      setTodo([...todo, task])
    } else if (destination.droppableId == 2) {
      setInProgress([...inProgress, task]) 
    } else if (destination.droppableId == 3) {
      setPaused([...paused, task])
    } else if (destination.droppableId == 4) {
      setDone([...done, task])
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
        <TaskColumn title={"A FAZER"} tasks={todo} id={"1"} />
        <TaskColumn title={"EM PROGRESSO"} tasks={inProgress} id={"2"} />
        <TaskColumn title={"PAUSADO"} tasks={paused} id={"3"} />
        <TaskColumn title={"CONCLUÍDO"} tasks={done} id={"4"} />
      </div>
    </DragDropContext>
  );
}