import React, { useEffect, useState } from 'react';
import BoardView from './BoardView';
import { useUserDetails } from '../../context/usercontext';
import { useProjectDetails } from '../../context/projectContext';
import getWorks from '../../services/board/getWorks';
import {
  STATUS_TODO,
  STATUS_INPROGRESS,
  STATUS_PAUSED,
  STATUS_DONE,
} from '../../constants/taskStatus';
import { patchTask } from '../../services/tasks/patchTask';
import { patchEpic } from '../../services/epics/patchEpic';
import { showErrorToast } from '../../utils/Toasts';
import { useParams } from 'react-router-dom';

export default function BoardController() {
  const [userDetails] = useUserDetails();
  const [projectDetails] = useProjectDetails();
  const [todo, setTodo] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [paused, setPaused] = useState([]);
  const [done, setDone] = useState([]);
  const [updateTasks, setUpdateTasks] = useState(false);
  const [loading, setLoading] = useState(true);
  const { projectId } = useParams();

  useEffect(() => {
    onGetWorks();
  }, [projectId, updateTasks]);

  function onGetWorks() {
    setLoading(true);
    getWorks(userDetails.accessToken, projectDetails.projectId)
      .then((data) => {
        console.log(data);
        const epics = data[0];
        const tasks = data[1];
        const cards = epics.concat(tasks);

        setTodo(cards.filter((card) => card.status === STATUS_TODO));
        setInProgress(
          cards.filter((card) => card.status === STATUS_INPROGRESS),
        );
        setPaused(cards.filter((card) => card.status === STATUS_PAUSED));
        setDone(cards.filter((card) => card.status == STATUS_DONE));
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        showErrorToast('Erro ao recuperar os cards');
        setLoading(false);
      });
  }

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    console.log(source);
    console.log(destination);
    console.log(draggableId);

    if (destination == null) return;

    if (source.droppableId === destination.droppableId) return;

    // REMOVE FROM SOURCE ARRAY
    if (source.droppableId === '1') {
      setTodo(removeItemById(draggableId, todo));
    } else if (source.droppableId === '2') {
      setInProgress(removeItemById(draggableId, inProgress));
    } else if (source.droppableId === '3') {
      setPaused(removeItemById(draggableId, paused));
    } else if (source.droppableId === '4') {
      setDone(removeItemById(draggableId, done));
    }

    // GET ITEM
    const card = findItemById(draggableId, [
      ...todo,
      ...inProgress,
      ...paused,
      ...done,
    ]);

    // ADD ITEM
    if (destination.droppableId == 1) {
      card.status = STATUS_TODO;
      setTodo([...todo, card]);
    } else if (destination.droppableId == 2) {
      card.status = STATUS_INPROGRESS;
      setInProgress([...inProgress, card]);
    } else if (destination.droppableId == 3) {
      card.status = STATUS_PAUSED;
      setPaused([...paused, card]);
    } else if (destination.droppableId == 4) {
      card.status = STATUS_DONE;
      setDone([...done, card]);
    }

    if (card.is_epic === true) {
      patchEpic(userDetails.accessToken, projectDetails.projectId, card)
        .then((data) => {
          setUpdateTasks(!updateTasks);
        })
        .catch((error) => {
          console.log(error);
          showErrorToast('Erro ao atualizar o épico');
        });
    } else {
      patchTask(
        userDetails.accessToken,
        projectDetails.projectId,
        projectDetails.projectName,
        projectDetails.managerEmail,
        card,
      )
        .then((data) => {
          setUpdateTasks(!updateTasks);
        })
        .catch((error) => {
          console.log(error);
          showErrorToast('Erro ao atualizar a tarefa');
        });
    }
  };

  function findItemById(id, array) {
    return array.find((item) => item.id == id);
  }

  function removeItemById(id, array) {
    return array.filter((item) => item.id !== id);
  }

  return (
    <BoardView
      loading={loading}
      todo={todo}
      inProgress={inProgress}
      done={done}
      paused={paused}
      handleDragEnd={handleDragEnd}
    />
  );
}
