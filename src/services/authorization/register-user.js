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

// updateUserDetails(
//  response.data.access,
//  response.data.refresh,
//  response.data.user.id,
// );

// console.log(error);
//        toast.error('Erro ao criar cadastro', {
//          position: 'bottom-right',
//          autoClose: 5000,
//          hideProgressBar: false,
//          closeOnClick: true,
//          pauseOnHover: false,
//          draggable: true,
//          progress: undefined,
//          theme: 'colored',
//        });
