import axios from 'axios';
import {
  USERS_GET_ENDPOINT,
  GET_EXTERNAL_USERS_ENDPOINT,
} from '../../constants/urls';
import 'react-toastify/dist/ReactToastify.css';

export function getUsers(accessToken, projectId) {
  return new Promise((resolve, reject) => {
    const header = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const GET_USERS =
      USERS_GET_ENDPOINT + projectId + GET_EXTERNAL_USERS_ENDPOINT;
    axios
      .get(GET_USERS, header)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  }, 20000);
}
