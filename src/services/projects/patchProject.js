import axios from "axios";
import { PROJECTS_ENDPOINT } from "../../constants/urls";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export async function patchProject(
  userDetails,
  projectDetails,
  setUpdateProject,
  project
) {
  const header = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userDetails.accessToken}`,
    },
  };

  const PATCH_PROJECT = `${PROJECTS_ENDPOINT}${projectDetails.projectId}`;

  axios
    .patch(
        PATCH_PROJECT,
      {
        project_name: project.project_name,
        description: project.description,
        start_date: project.start_date,
        deadline_date: project.deadline_date,
        user: project.user_id,
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
          return setUpdateProject(false);
        } else {
          return setUpdateProject(true);
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

      toast.error("Erro ao atualizar projeto", {
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

  return     setUpdateProject(false);
}
