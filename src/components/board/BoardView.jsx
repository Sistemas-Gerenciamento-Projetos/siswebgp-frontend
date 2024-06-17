import React, { useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import CardsColumn from '../cards-components/card-column/CardsColumn.component';
import { Spin } from 'antd';
import { BoardDiv, SpinDiv } from './BoardStyles';

export default function BoardView({
  loading,
  todo,
  inProgress,
  done,
  paused,
  handleDragEnd,
}) {
  return (
    <>
      {loading ? (
        <SpinDiv>
          <Spin />
        </SpinDiv>
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <BoardDiv>
            <CardsColumn title={'A fazer'} cards={todo} id={'1'} />
            <CardsColumn title={'Em andamento'} cards={inProgress} id={'2'} />
            <CardsColumn title={'Concluído'} cards={done} id={'4'} />
            <CardsColumn title={'Pausado'} cards={paused} id={'3'} />
          </BoardDiv>
        </DragDropContext>
      )}
    </>
  );
}
