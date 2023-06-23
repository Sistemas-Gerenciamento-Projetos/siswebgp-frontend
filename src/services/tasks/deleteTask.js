import axios from "axios";
import { PROJECTS_ENDPOINT } from "../../constants/urls";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export async function deleteTask(
  userDetails,
  projectDetails,
  id,
  onRefreshTasks
) {
  const header = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userDetails.accessToken}`,
    },
  };
  console.log(projectDetails);
  const DELETE_TASK = `${PROJECTS_ENDPOINT}${projectDetails.projectId}/tasks/${id}/`;
  console.log(DELETE_TASK);

  axios
    .delete(DELETE_TASK, header)
    .then((response) => {
      if (response.status === 200) {
        const data = response.data;
        onRefreshTasks();
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
        return true;
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

      toast.error("Erro ao excluir tarefa", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return false;
    });
}
