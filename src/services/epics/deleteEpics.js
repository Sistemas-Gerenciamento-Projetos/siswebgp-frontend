import axios from 'axios';
import { EPIC_DELETE_ENDPOINT } from '../../constants/urls';

export async function deleteEpic(accessToken, projectId, id) {
  return new Promise((resolve, reject) => {
    const header = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const DELETE_EPIC = `${EPIC_DELETE_ENDPOINT}${projectId}/epics/${id}/`;

    axios
      .delete(DELETE_EPIC, header)
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
