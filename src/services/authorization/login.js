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
  });
}

// localStorage.setItem('userDetails', JSON.stringify(response.data));
//        updateUserDetails(
//          response.data.access,
//          response.data.refresh,
//          response.data.user.id,
//        );

// if (error.response) {
//  console.log(error.response.data);
//  console.log(error.response.status);
//  console.log(error.response.headers);
// } else if (error.request) {
//  console.log(error.request);
// } else {
//  console.log('Error', error.message);
// }
