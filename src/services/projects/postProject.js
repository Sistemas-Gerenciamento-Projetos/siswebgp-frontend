import { PROJECTS_CREATE_ENDPOINT } from "../../constants/urls";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function postProject(
  novoProjeto,
  setNovoProjeto,
  userDetails,
  title,
  description,
  startDate,
  endDate
) {
  const parsedTitle = title.trim();

  const header = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userDetails.accessToken}`,
    },
  };

  axios
    .post(
      PROJECTS_CREATE_ENDPOINT,
      {
        manager: userDetails.id,
        project_name: parsedTitle,
        description: description,
        start_date: startDate,
        deadline_date: endDate,
        users: [userDetails.id],
      },
      header
    )
    .then((response) => {
      if (response.status === 201) {
        setNovoProjeto(!novoProjeto);
        toast.success('Projeto criado', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        toast.error('Erro ao criar projeto', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    })
    .catch((error) => {
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
        console.log("Error", error.message);
      }

      toast.error('Erro ao criar projeto', {
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
}
