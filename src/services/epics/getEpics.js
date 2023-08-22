import axios from 'axios';
import { EPICS_GET_ENDPOINT } from '../../constants/urls';

export function getEpics(accessToken, projectId) {
  return new Promise((resolve, reject) => {
    axios
      .get(EPICS_GET_ENDPOINT, {
        params: {
          project_id: projectId,
        },
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      })
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
