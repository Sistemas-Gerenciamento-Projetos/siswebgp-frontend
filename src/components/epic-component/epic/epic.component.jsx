import {
  CalendarOutlined,
  ScheduleOutlined,
  TrophyOutlined,
  UserOutlined,
} from '@ant-design/icons';
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { styled } from 'styled-components';
import { parseDateWithoutTimezone } from '../../../utils/dateParse';

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

export default function Epic({ epic, index }) {
  return (
    <Draggable draggableId={`${epic.id}`} key={epic.id} index={index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <div style={{ display: 'flex', justifyContent: 'start', padding: 2 }}>
            <TrophyOutlined style={{ marginRight: 5 }} />
            <div
              style={{
                width: '100%',
                backgroundColor: '#B97CFF',
                paddingLeft: '5px',
                fontSize: '12px',
              }}
            >
              #{epic.number + ' ' + epic.title}
            </div>
          </div>
          <div style={{ display: 'flex', padding: 2 }}>
            <TextContent>{epic.description}</TextContent>
          </div>

          <div
            style={{ width: '100%', height: '1px', backgroundColor: '#000' }}
          />

          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              padding: 2,
              marginTop: '5px',
              alignItems: 'center',
              fontSize: '12px',
            }}
          >
            <div style={{ marginRight: '5px' }}>
              <CalendarOutlined />
            </div>
            <span>
              {parseDateWithoutTimezone(epic.start_date).toLocaleDateString(
                'pt-BR',
                {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                },
              )}
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              padding: 2,
              marginTop: '5px',
              alignItems: 'center',
              fontSize: '12px',
            }}
          >
            <div style={{ marginRight: '5px' }}>
              <ScheduleOutlined />
            </div>
            {parseDateWithoutTimezone(epic.deadline_date).toLocaleDateString(
              'pt-BR',
              {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              },
            )}
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              padding: 2,
              marginTop: '5px',
              alignItems: 'center',
              fontSize: '12px',
            }}
          >
            <div
              style={{
                display: 'flex',
                width: '30px',
                height: '30px',
                borderRadius: '60px',
                backgroundColor: '#B97CFF',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '5px',
              }}
            >
              <UserOutlined />
            </div>
            {epic.user_name}
          </div>

          {provided.placeholder}
        </Container>
      )}
    </Draggable>
  );
}
