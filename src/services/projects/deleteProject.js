import axios from 'axios';
import { PROJECTS_ENDPOINT } from '../../constants/urls';
import 'react-toastify/dist/ReactToastify.css';

export function deleteProject(accessToken, projectId) {
  return new Promise((resolve, reject) => {
    const header = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const DELETE_PROJECT = `${PROJECTS_ENDPOINT}${projectId}`;

    axios
      .delete(DELETE_PROJECT, header)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
