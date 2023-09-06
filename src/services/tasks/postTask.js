import {
  EMAIL_ID,
  PATCH_TASK_TEMPLATE_ID,
  PUBLIC_ID_KEY,
  TASK_CREATE_ENDPOINT,
} from '../../constants/urls';
import axios from 'axios';
import emailjs from '@emailjs/browser';

export function postTask(
  accessToken,
  projectId,
  projectName,
  managerEmail,
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
          //  emailjs
          //    .send(
          //      EMAIL_ID,
          //      PATCH_TASK_TEMPLATE_ID,
          //      {
          //        name: title,
          //        email: managerEmail,
          //        message: `A tarefa ${title} foi criada, acesse o projeto ${projectName} para conferir a nova tarefa.`,
          //      },
          //      PUBLIC_ID_KEY,
          //    )
          //    .then((result) => {
          //     console.log(result.text);
          //   })
          //   .catch((error) => {
          //     console.log(error.text);
          //   });
          resolve(response.data);
        }
      })
      .catch((error) => {
        reject(error);
      });
  }, 20000);
}
