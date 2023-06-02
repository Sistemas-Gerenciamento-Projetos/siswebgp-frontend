import axios from "axios";
import { TASK_PATCH_ENDPOINT } from "../../constants/urls";

export async function patchTask(
  userDetails,
  projectDetails,
  task,
  setUpdateTasks
) {
  const header = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userDetails.accessToken}`,
    },
  };

  const PATCH_TASK = `${TASK_PATCH_ENDPOINT}${projectDetails.projectId}/tasks/${task.id}/`;

  axios
    .patch(
      PATCH_TASK,
      {
        title: task.title,
        description: task.description,
        start_date: task.start_date,
        deadline_date: task.deadline_date,
        status: task.status,
        user: task.user_id,
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
      } else {
        alert(response.message);
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
      // retornar alert com mensagem generica de erro
      // alert("Erro inesperado, tente novamente.")
    });

  return setUpdateTasks(false);
}
