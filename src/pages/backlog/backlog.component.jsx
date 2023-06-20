import React, { useEffect, useState } from "react";
import Toolbar from "../../components/toolbar/toolbar.component";
import ManageTask from "../../components/tasks-component/manage-task/manage-task";
import { useUserDetails } from "../../context/usercontext";
import { useProjectDetails } from "../../context/projectContext";
import { Navigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { getTasks } from "../../services/tasks/getTasks";
import { ToastContainer } from "react-toastify";
import TaskTable from "../../components/tasks-component/task-table/task-table";

const Backlog = () => {
  const [userDetails] = useUserDetails();
  const [projectDetails] = useProjectDetails();
  const [tasks, setTasks] = useState([]);
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(false);
  const [taskSelected, setTaskSelected] = useState(false);

  const newedittasktitle = {
    0: "Nova tarefa",
    1: "Editar tarefa",
  };

  const buttontask = {
    0: "Criar tarefa",
    1: "Editar tarefa",
  };

  useEffect(() => {
    if (!show) setIndex(0);
  }, [show]);

  if (!userDetails.accessToken) {
    return <Navigate replace to="/" />;
  }

  return (
    <>
      <Toolbar title={projectDetails.projectName} />
      <Button variant="primary" onClick={() => setShow(true)}>
        {newedittasktitle[index]}
      </Button>
      <ManageTask
        titleTask={newedittasktitle[index]}
        textButton={buttontask[index]}
        index={index}
        setShow={setShow}
        setIndex={setIndex}
        show={show}
        task={taskSelected}
        setTaskSelected={setTaskSelected}
      />
      <TaskTable
        index={index}
        setIndex={setIndex}
        setShow={setShow}
        show={show}
        setTaskSelected={setTaskSelected}
      />

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
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
  );
};

export default Backlog;
