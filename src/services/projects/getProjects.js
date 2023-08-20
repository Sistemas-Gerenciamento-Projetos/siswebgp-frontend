import axios from 'axios';
import { PROJECTS_GET_ENDPOINT } from '../../constants/urls';

export function getProjects(accessToken) {
  return new Promise((resolve, reject) => {
    const header = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    };

    axios
      .get(PROJECTS_GET_ENDPOINT, header)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
