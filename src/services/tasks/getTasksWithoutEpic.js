import axios from 'axios';
import { TASKS_GET_ENDPOINT } from '../../constants/urls';

export function getTasksWithoutEpic(accessToken, projectId) {
  return new Promise((resolve, reject) => {
    const header = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    };

    axios
      .get(TASKS_GET_ENDPOINT + `${projectId}/get_tasks_without_epic/`, header)
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
