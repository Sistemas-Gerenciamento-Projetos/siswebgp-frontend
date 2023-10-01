import {
  PROJECTS_ENDPOINT,
  ADD_USER_IN_PROJECT_ENDPOINT,
} from '../../constants/urls';
import axios from 'axios';

export function postAddUserInProject(accessToken, projectId, userToAdd) {
  return new Promise((resolve, reject) => {
    const header = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    };

    axios
      .post(
        PROJECTS_ENDPOINT + projectId + ADD_USER_IN_PROJECT_ENDPOINT,
        {
          users: [userToAdd],
        },
        header,
      )
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  }, 20000);
}
