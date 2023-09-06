import axios from 'axios';
import { PROJECTS_ENDPOINT } from '../../constants/urls';

export function getUsersByProject(accessToken, projectId) {
  return new Promise((resolve, reject) => {
    const header = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const GET_USERS = `${PROJECTS_ENDPOINT}${projectId}/project_users/`;
    axios
      .get(GET_USERS, header)
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
