import axios from 'axios';
import { EPIC_PATCH_ENDPOINT } from '../../constants/urls';

export function patchEpic(accessToken, projectId, epic) {
  return new Promise((resolve, reject) => {
    const header = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const PATCH_EPIC_URL = `${EPIC_PATCH_ENDPOINT}${projectId}/epics/${epic.id}/`;
    axios
      .patch(
        PATCH_EPIC_URL,
        {
          title: epic.title,
          description: epic.description,
          start_date: epic.start_date,
          deadline_date: epic.deadline_date,
          status: epic.status,
          user: epic.user,
        },
        header,
      )
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
