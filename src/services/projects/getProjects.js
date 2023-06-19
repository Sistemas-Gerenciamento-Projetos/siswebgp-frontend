import axios from "axios"
import { PROJECTS_GET_ENDPOINT } from "../../constants/urls"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function getProjects(userDetails, setProjects) {
  const header = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${userDetails.accessToken}`
    }
  }

  axios.get(
    PROJECTS_GET_ENDPOINT,
    header
  ).then((response) => {
    if (response.status === 200) {
      console.log(response.data)
      setProjects(response.data)
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
    
    toast.error('Erro ao buscar projetos', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  })
}