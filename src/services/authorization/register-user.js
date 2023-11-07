import { REGISTRATION_ENDPOINT } from '../../constants/urls';
import axios from 'axios';

export function registerUser(name, email, password) {
  return new Promise((resolve, reject) => {
    const reqConfig = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    axios
      .post(
        REGISTRATION_ENDPOINT,
        {
          name: name,
          email: email,
          password: password,
        },
        reqConfig,
      )
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  }, 20000);
}
