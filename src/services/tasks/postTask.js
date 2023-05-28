import { TASK_CREATE_ENDPOINT } from "../../constants/urls";
import axios from "axios";

export function postTask(
  userDetails,
  projectDetails,
  title,
  description,
  startDate,
  endDate,
  status
) {
  // const parsedTitle = title.trim();
  const header = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userDetails.accessToken}`,
    },
  };

  const CREATE_TASK =
    TASK_CREATE_ENDPOINT +
    "c414129f-9420-48c3-b7d0-ea3b50759471/create_new_task/";
  console.log(CREATE_TASK);
  axios
    .post(
      CREATE_TASK,
      {
        title: title,
        description: description,
        start_date: startDate,
        deadline_date: endDate,
        status: status,
        user: [userDetails.id],
      },
      header
    )
    .then((response) => {
      if (response.status === 201) {
        console.log(response);
      } else {
        alert(response.message);
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
      // retornar alert com mensagem generica de erro
      alert("Erro inesperado, tente novamente.");
    });
}
