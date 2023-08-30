import axios from 'axios';
import { EPICS_GET_ENDPOINT } from '../../constants/urls';

export function getEpics(accessToken, projectId) {
  return new Promise((resolve, reject) => {
    const header = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const GET_EPICS_URL = `${EPICS_GET_ENDPOINT}${projectId}/epics/`;
    axios
      .get(GET_EPICS_URL, header)
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
