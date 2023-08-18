import { LOGIN_ENDPOINT } from '../../constants/urls';
import axios from 'axios';

export function login(accessToken, email, password) {
  return new Promise((resolve, reject) => {
    const reqConfig = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    };

    axios
      .post(
        LOGIN_ENDPOINT,
        {
          email: email,
          password: password,
        },
        reqConfig,
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
