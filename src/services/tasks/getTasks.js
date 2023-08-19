import axios from 'axios';
import { TASKS_GET_ENDPOINT } from '../../constants/urls';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function getTasks(accessToken, projectId) {
  return new Promise((resolve, reject) => {
    const header = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    };

    axios
      .get(TASKS_GET_ENDPOINT + `${projectId}/tasks/`, header)
      .then((response) => {
        if (response.status === 200) {
          if (
            response.data.message !== null &&
            response.data.message ===
              'Não foi possível recuperar tarefas pois não há tarefas cadastradas.'
          ) {
            resolve([]);
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
