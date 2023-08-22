import { TASK_CREATE_ENDPOINT } from '../../constants/urls';
import axios from 'axios';

export function postTask(
  accessToken,
  projectId,
  title,
  description,
  startDate,
  endDate,
  status,
  id,
) {
  return new Promise((resolve, reject) => {
    const header = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const CREATE_TASK = TASK_CREATE_ENDPOINT + projectId + '/create_new_task/';

    axios
      .post(
        CREATE_TASK,
        {
          title: title,
          description: description,
          start_date: startDate,
          deadline_date: endDate,
          status: status,
          user: id,
        },
        header,
      )
      .then((response) => {
        if (response.status === 201) {
          resolve(response.data);
        }
      })
      .catch((error) => {
        reject(error);
      });
  }, 20000);
}
