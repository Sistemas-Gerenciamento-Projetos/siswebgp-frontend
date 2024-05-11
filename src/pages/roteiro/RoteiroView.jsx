import React, { useEffect } from 'react';
import './roteiro.styles.css';
import Gantt, {
  Tasks,
  Column,
  Editing,
  Validation,
  Item,
  StripLine,
} from 'devextreme-react/gantt';
import { ToastContainer } from 'react-toastify';
import { Spin } from 'antd';
import SGPSidebar from '../../components/sidebar/sidebar.component';
import Toolbar from '../../components/toolbar/toolbar.component';
import { Root, SpinDiv, ToolbarDiv } from './RoteiroStyles';

export default function RoteiroView({
  projectName,
  loading,
  striped,
  currentDate,
  tasks,
  handleData,
  updateTask,
}) {
  useEffect(() => {
    handleData();
  }, []);

  return (
    <Root>
      <SGPSidebar />
      <ToolbarDiv>
        <Toolbar
          menuItem={4}
          setShowBacklog={() => {}}
          setShowEpics={() => {}}
          title={`${projectName} / Roteiro`}
        />
        {loading ? (
          <SpinDiv>
            <Spin />
          </SpinDiv>
        ) : (
          <>
            <Gantt
              taskListWidth={220}
              scaleType="weeks"
              height={700}
              onTaskUpdated={updateTask}
              onContentReady={(e) => {
                const timelineDate = new Date();
                timelineDate.setDate(timelineDate.getDate() - 2);
                e.component.scrollToDate(timelineDate, { left: 0, top: 0 });
              }}
            >
              {striped && (
                <StripLine
                  start={currentDate}
                  title="Current Time"
                  cssClass="current-time"
                />
              )}
              <Tasks
                dataSource={tasks}
                keyExpr="id"
                parentIdExpr="parentId"
                titleExpr="title"
                progressExpr="progress"
                startExpr="start_date"
                endExpr="deadline_date"
                colorExpr="taskColor"
              />
              <Toolbar>
                <Item name="zoomIn" />
                <Item name="zoomOut" />
              </Toolbar>
              <Column dataField="title" caption="Tarefa" width={100} />
              <Validation autoUpdateParentTasks />
              <Editing
                enabled={true}
                allowDependencyAdding={false}
                allowDependencyDeleting={false}
                allowResourceAdding={false}
                allowResourceDeleting={false}
                allowTaskAdding={false}
                allowTaskDeleting={false}
                allowTaskResourceUpdating={false}
              />
            </Gantt>
            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover={false}
              theme="colored"
            />
          </>
        )}
      </ToolbarDiv>
    </Root>
  );
}
