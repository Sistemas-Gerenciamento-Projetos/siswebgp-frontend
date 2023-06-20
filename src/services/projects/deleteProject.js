import axios from "axios";
import { PROJECTS_ENDPOINT } from "../../constants/urls";

export async function deleteProject(userDetails, projectDetails) {
  const header = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userDetails.accessToken}`,
    },
  };
  console.log(projectDetails);
  const DELETE_PROJECT = `${PROJECTS_ENDPOINT}${projectDetails.projectId}/`;

  axios
    .delete(DELETE_PROJECT, header)
    .then((response) => {
      if (response.status === 301) {
        return true;
      }
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.status);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }

      return false;
    });
}
