import { TASK_CREATE_ENDPOINT } from '../../constants/urls';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function postTask(
  accessToken,
  projectId,
  title,
  description,
  startDate,
  endDate,
  status,
  id,
) {
  return new Promise((resolve, reject) => {
    const header = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const CREATE_TASK = TASK_CREATE_ENDPOINT + projectId + '/create_new_task/';

    axios
      .post(
        CREATE_TASK,
        {
          title: title,
          description: description,
          start_date: startDate,
          deadline_date: endDate,
          status: status,
          user: id,
        },

        header,
      )
      .then((response) => {
        if (response.status === 201) {
          resolve(response.data);
        }
      })
      .catch((error) => {
        reject(error);
      });
  }, 20000);
}

// onRefreshTasks();
//          toast.success('Tarefa criada', {
//          position: 'bottom-right',
//      autoClose: 5000,
//        hideProgressBar: false,
//      closeOnClick: true,
//    pauseOnHover: false,
//    draggable: true,
//    progress: undefined,
//   theme: 'colored',
// });

//        console.log(error)
//        toast.error('Erro ao criar tarefa', {
//          position: 'bottom-right',
//          autoClose: 5000,
//          hideProgressBar: false,
//          closeOnClick: true,
//          pauseOnHover: false,
//          draggable: true,
//          progress: undefined,
//          theme: 'colored',
//        });
