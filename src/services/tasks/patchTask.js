import axios from "axios";
import { TASK_PATCH_ENDPOINT } from "../../constants/urls";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export async function patchTask(
  userDetails,
  projectDetails,
  taskEdited,
  setUpdateTasks
) {
  const header = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userDetails.accessToken}`,
    },
  };

  const PATCH_TASK = `${TASK_PATCH_ENDPOINT}${projectDetails.projectId}/tasks/${taskEdited.id}/`;
  console.log(taskEdited.start_date);
  axios
    .patch(
      PATCH_TASK,
      {
        title: taskEdited.title,
        description: taskEdited.description,
        start_date: taskEdited.start_date,
        deadline_date: taskEdited.deadline_date,
        status: taskEdited.status,
        user: taskEdited.user_id,
      },
      header
    )
    .then((response) => {
      if (response.status === 200) {
        const data = response.data;
        if (
          data.message !== null &&
          data.message ===
            "Não foi possível recuperar tarefas pois não há tarefas cadastradas."
        ) {
          return setUpdateTasks(false);
        } else {
          return setUpdateTasks(true);
        }
      }
    })
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }

      toast.error("Erro ao atualizar tarefa", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    });

  return setUpdateTasks(false);
}
