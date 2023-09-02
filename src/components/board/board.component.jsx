import React, { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import {
  STATUS_TODO,
  STATUS_INPROGRESS,
  STATUS_PAUSED,
  STATUS_DONE,
} from '../../constants/taskStatus';
import { useUserDetails } from '../../context/usercontext';
import { useProjectDetails } from '../../context/projectContext';
import CardsColumn from '../cards-components/card-column/CardsColumn.component';
import { patchTask } from '../../services/tasks/patchTask';
import { toast } from 'react-toastify';
import getWorks from '../../services/board/getWorks';
import { patchEpic } from '../../services/epics/patchEpic';

export default function Board() {
  const [userDetails] = useUserDetails();
  const [projectDetails] = useProjectDetails();
  const [todo, setTodo] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [paused, setPaused] = useState([]);
  const [done, setDone] = useState([]);
  const [updateTasks, setUpdateTasks] = useState(false);

  useEffect(() => {
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
        setUpdateTasks(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error('Erro ao recuperar os cards', {
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

    console.log(source);
    console.log(destination);
    console.log(draggableId);

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
          toast.error('Erro ao atualizar o épico', {
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
    }
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
        <CardsColumn title={'A fazer'} cards={todo} id={'1'} />
        <CardsColumn title={'Em andamento'} cards={inProgress} id={'2'} />
        <CardsColumn title={'Concluído'} cards={done} id={'4'} />
        <CardsColumn title={'Pausado'} cards={paused} id={'3'} />
      </div>
    </DragDropContext>
  );
}
