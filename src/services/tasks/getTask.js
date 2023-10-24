import axios from 'axios';
import { TASKS_GET_ENDPOINT } from '../../constants/urls';

export function getTask(accessToken, projectId, taskId) {
  return new Promise((resolve, reject) => {
    const header = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    };

    axios
      .get(TASKS_GET_ENDPOINT + `${projectId}/tasks/${taskId}/`, header)
      .then((response) => {
        if (response.status === 200) {
          if (
            response.data.message !== null &&
            response.data.message ===
              'Não foi possível recuperar tarefas pois não há tarefas cadastradas.'
          ) {
            resolve(null);
          } else {
            resolve(response.data);
          }
        }
      })
      .catch((error) => {
        reject(error);
      });
  }, 20000);
}
