import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import Task from '../../tasks-component/task/task.component';
import Epic from '../../epic-component/epic/epic.component';

const Container = styled.div`
  background-color: #ffffff;
  border-radius: 2.5px;
  width: 300px;
  height: 100vh;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  border: 1px solid gray;
`;

const Title = styled.h3`
  padding: 8px;
  background-color: pink;
  text-align: center;
  font-size: 15px;
`;

const TaskList = styled.div`
  padding: 3px;
  transition: background-color 0.2s ease;
  background-color: #ffffff;
  flex-grow: 1;
  min-height: 100%;
`;

export default function TaskColumn({ title, tasks, id }) {
  return (
    <Container className="column">
      <Title
        style={{
          backgroundColor: '#bae7ff',
          position: 'stick',
        }}
      >
        {title}
      </Title>
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <TaskList
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {tasks.map((task, index) => {
              if (task.epic === 1) {
                return <Epic key={index} epic={task} index={index} />;
              } else {
                return <Task key={index} index={index} task={task} />;
              }
            })}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </Container>
  );
}
