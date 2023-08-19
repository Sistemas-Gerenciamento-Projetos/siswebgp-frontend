import axios from 'axios';
import { PROJECTS_ENDPOINT } from '../../constants/urls';

export async function deleteTask(accessToken, projectId, id) {
  return new Promise((resolve, reject) => {
    const header = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const DELETE_TASK = `${PROJECTS_ENDPOINT}${projectId}/tasks/${id}/`;

    axios
      .delete(DELETE_TASK, header)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
      })
      .catch((error) => {
        reject(error);
      });
  }, 20000);
}
