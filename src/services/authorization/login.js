import { LOGIN_ENDPOINT } from '../../constants/urls';
import axios from 'axios';

export async function sigin(email, password, userDetails, updateUserDetails) {
  let isValidSigin = false;
  const reqConfig = {
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${userDetails.accessToken}`,
    },
  };

  try {
    const response = await axios.post(
      LOGIN_ENDPOINT,
      {
        email: email,
        password: password,
      },
      reqConfig,
    );

    if (response.status === 200) {
      localStorage.setItem('userDetails', JSON.stringify(response.data));
      updateUserDetails(
        response.data.access,
        response.data.refresh,
        response.data.user.id,
      );
      isValidSigin = true;
    }
  } catch (error) {
    isValidSigin = false;
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }
  }

  return isValidSigin;
}
