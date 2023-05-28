import axios from "axios"
import { TASKS_GET_ENDPOINT } from "../../constants/urls"

export async function getTasks(accessToken, projectId) {
  const header = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${accessToken}`
    }
  }

  try {
    const response  = await axios.get(
      TASKS_GET_ENDPOINT + `${projectId}/tasks`,
      header
    )

    if (response.status === 200) {
      const data = response.data
      if (data.message !== null && data.message === "Não foi possível recuperar tarefas pois não há tarefas cadastradas.") {
        return []
      } else {
        return data
      }
    } else {
      // Adicionar tratamento de erro
      alert("Erro inesperado, tente novamente.")
    }

  } catch(error) {
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
  }

  return []
}