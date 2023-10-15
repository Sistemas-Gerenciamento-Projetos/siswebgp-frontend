import axios from 'axios';
import {
  USERS_GET_ENDPOINT,
  GET_EXTERNAL_USERS_ENDPOINT,
} from '../../constants/urls';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

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
  }, 20000).catch((error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }

    toast.error('Erro ao recuperar os usuários do projeto', {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
  });
}
