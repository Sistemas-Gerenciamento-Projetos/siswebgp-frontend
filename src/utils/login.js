import { LOGIN_ENDPOINT } from "../constants/urls";
import axios from "axios";

export function sigin(email, password, userDetails, updateUserDetails) {
  var isValidSigin = false;
  const req_config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${userDetails.accessToken}`,
    },
  };
  axios
    .post(
      LOGIN_ENDPOINT,
      {
        email: email,
        password: password,
      },
      req_config
    )
    .then((response) => {
      localStorage.setItem("userDetails", JSON.stringify(response.data));
      updateUserDetails(response.data.access, response.data.refresh, response.data.user.id);
      isValidSigin = true;
    })
    .catch((error) => {
      isValidSigin = false;
    });

  return isValidSigin;
}
