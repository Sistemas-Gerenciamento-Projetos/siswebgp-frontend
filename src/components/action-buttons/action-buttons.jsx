import React from "react";
import { Button } from "react-bootstrap";
import TrashIcon from "../../Assets/trash.svg";
import EditIcon from "../../Assets/edit.svg";
import AddIcon from "../../Assets/person-add.svg";
import { deleteTask } from "../../services/tasks/deleteTask";
import { toast } from "react-toastify";

function ActionButtons({
  setShow,
  setIndex,
  setTaskSelected,
  task,
  userDetails,
  projectDetails,
}) {
  const handleEdit = () => {
    setShow(true);
    setIndex(1);
    setTaskSelected(task);
    console.log(task.description);
  };

  const handleDelete = () => {
    if (deleteTask(userDetails, projectDetails, task)) {
      setIndex(0);
      setShow(false);
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
        onClick={handleEdit}>
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
