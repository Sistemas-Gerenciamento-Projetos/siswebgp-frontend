import { REGISTRATION_ENDPOINT } from "../../constants/urls";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      updateUserDetails(response.data.access, response.data.refresh, response.data.user.id);
    })
    .catch((error) => {
      console.log(error);
      console.log("error");
      isRegistered = false;
      toast.error('Erro ao criar cadastro', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    });
  return isRegistered;
}
