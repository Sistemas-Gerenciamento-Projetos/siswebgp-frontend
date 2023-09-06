import axios from 'axios';
import {
  EMAIL_ID,
  PATCH_TASK_TEMPLATE_ID,
  PROJECTS_ENDPOINT,
  PUBLIC_ID_KEY,
} from '../../constants/urls';
import emailjs from '@emailjs/browser';

export async function deleteTask(
  accessToken,
  projectId,
  projectName,
  managerEmail,
  id,
) {
  return new Promise((resolve, reject) => {
    const header = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const DELETE_TASK = `${PROJECTS_ENDPOINT}${projectId}/tasks/${id}/`;

    axios
      .delete(DELETE_TASK, header)
      .then((response) => {
        if (response.status === 200) {
          if (process.env.NODE_ENV === 'production') {
            emailjs
              .send(
                EMAIL_ID,
                PATCH_TASK_TEMPLATE_ID,
                {
                  email: managerEmail,
                  message: `Uma tarefa foi deletada, acesse o projeto ${projectName} para conferir essa atualização.`,
                },
                PUBLIC_ID_KEY,
              )
              .then((result) => {
                console.log(result.text);
              })
              .catch((error) => {
                console.log(error.text);
              });
          }
          resolve(response.data);
        }
      })
      .catch((error) => {
        reject(error);
      });
  }, 20000);
}
