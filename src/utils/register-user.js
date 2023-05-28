import { REGISTRATION_ENDPOINT } from "../constants/urls";
import axios from "axios";

export async function registerUser(name, email, password, updateUserDetails) {
  var isRegistered = false;

  const req_config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  await axios
    .post(
      REGISTRATION_ENDPOINT,
      {
        name: name,
        email: email,
        password: password,
      },
      req_config
    )
    .then((response) => {
      isRegistered = true;
      // localStorage.setItem("userDetails", JSON.stringify(response.data));
      updateUserDetails(response.data.access, response.data.refresh, response.data.user.id);
    })
    .catch((error) => {
      console.log(error);
      console.log("error");
      isRegistered = false;
    });
  return isRegistered;
}
