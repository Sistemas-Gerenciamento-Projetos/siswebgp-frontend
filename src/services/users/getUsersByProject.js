import axios from "axios";
import { PROJECTS_ENDPOINT } from "../../constants/urls";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

export function getUsersByProject(userDetails, projectDetails, setUsersName) {
  const header = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${userDetails.accessToken}`,
    },
  };

  const GET_USERS = `${PROJECTS_ENDPOINT}${projectDetails.projectId}/project_users/`;
  axios
    .get(GET_USERS, header)
    .then((response) => {
      if (response.status === 200) {
        setUsersName(response.data);
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

      toast.error('Erro ao recuperar os usuários do projeto', {
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
}
