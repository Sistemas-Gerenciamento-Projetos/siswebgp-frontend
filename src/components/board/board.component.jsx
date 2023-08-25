import React, { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { getTasks } from '../../services/tasks/getTasks';
import {
  STATUS_TODO,
  STATUS_INPROGRESS,
  STATUS_PAUSED,
  STATUS_DONE,
} from '../../constants/taskStatus';
import { useUserDetails } from '../../context/usercontext';
import { useProjectDetails } from '../../context/projectContext';
import TaskColumn from '../tasks-component/task-column/TaskColumn.component';
import { patchTask } from '../../services/tasks/patchTask';
import { toast } from 'react-toastify';

export default function Board() {
  const [userDetails] = useUserDetails();
  const [projectDetails] = useProjectDetails();
  const [todo, setTodo] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [paused, setPaused] = useState([]);
  const [done, setDone] = useState([]);
  const [updateTasks, setUpdateTasks] = useState(false);

  useEffect(() => {
    getTasks(userDetails.accessToken, projectDetails.projectId)
      .then((data) => {
        console.log(data);
        setTodo(data.filter((task) => task.status === STATUS_TODO));
        setInProgress(data.filter((task) => task.status === STATUS_INPROGRESS));
        setPaused(data.filter((task) => task.status === STATUS_PAUSED));
        setDone(data.filter((task) => task.status == STATUS_DONE));
        setUpdateTasks(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error('Erro ao recuperar as tarefas', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      });
  }, [updateTasks]);

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
    if (destination.droppableId == 1) {
      task.status = STATUS_TODO;
      setTodo([...todo, task]);
    } else if (destination.droppableId == 2) {
      task.status = STATUS_INPROGRESS;
      setInProgress([...inProgress, task]);
    } else if (destination.droppableId == 3) {
      task.status = STATUS_PAUSED;
      setPaused([...paused, task]);
    } else if (destination.droppableId == 4) {
      task.status = STATUS_DONE;
      setDone([...done, task]);
    }

    patchTask(userDetails.accessToken, projectDetails.projectId, task)
      .then((data) => {
        setUpdateTasks(!updateTasks);
      })
      .catch((error) => {
        console.log(error);
        toast.error('Erro ao atualizar a tarefa', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      });
  };

  function findItemById(id, array) {
    return array.find((item) => item.id == id);
  }

  function removeItemById(id, array) {
    return array.filter((item) => item.id !== id);
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          height: '87%',
        }}
      >
        <TaskColumn title={'A fazer'} tasks={todo} id={'1'} />
        <TaskColumn title={'Em andamento'} tasks={inProgress} id={'2'} />
        <TaskColumn title={'Concluído'} tasks={done} id={'4'} />
        <TaskColumn title={'Pausado'} tasks={paused} id={'3'} />
      </div>
    </DragDropContext>
  );
}
