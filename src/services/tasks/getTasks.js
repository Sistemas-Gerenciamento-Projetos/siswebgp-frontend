import axios from "axios"
import { TASKS_GET_ENDPOINT } from "../../constants/urls"

export function getTasks(userDetails, setTasks) {
  const header = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${userDetails.accessToken}`
    }
  }

  axios.get(
    TASKS_GET_ENDPOINT,
    header
  ).then((response) => {
    if (response.status === 200) {
      setTasks(response.data)
    }
  }).catch((error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data)
      console.log(error.response.status)
      console.log(error.response.headers)
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request)
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message)
    }
    // retornar alert com mensagem generica de erro
    alert("Erro inesperado, tente novamente.")
  })
}