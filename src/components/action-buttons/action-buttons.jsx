import React from "react";
import { Button } from "react-bootstrap";
import TrashIcon from "../../Assets/trash.svg";
import EditIcon from "../../Assets/edit.svg";
import AddIcon from "../../Assets/person-add.svg";
import { deleteTask } from "../../services/tasks/deleteTask";
import { toast } from "react-toastify";

function ActionButtons({
  setRefresh,
  refresh,
  setShow,
  setIndex,
  setTaskSelected,
  task,
  userDetails,
  projectDetails,
}) {
  const handleClick = () => {
    setShow(true);
    setIndex(1);
    setTaskSelected(task);
  };

  const handleDelete = () => {
    if (deleteTask(userDetails, projectDetails, task)) {
      setIndex(0);
      setRefresh(!refresh);
      toast.success("Tarefa excluída", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <div>
      <Button
        variant="outline-light"
        style={{ border: 0 }}
        onClick={handleClick}>
        <img src={EditIcon} />
      </Button>
      <Button
        variant="outline-light"
        onClick={handleDelete}
        style={{ border: 0 }}>
        <img src={TrashIcon} />
      </Button>
    </div>
  );
}

export default ActionButtons;
