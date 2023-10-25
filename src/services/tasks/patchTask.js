import axios from 'axios';
import {
  EMAIL_ID,
  PATCH_TASK_TEMPLATE_ID,
  PUBLIC_ID_KEY,
  TASK_PATCH_ENDPOINT,
} from '../../constants/urls';
import emailjs from '@emailjs/browser';

export function patchTask(
  accessToken,
  projectId,
  projectName,
  managerEmail,
  editedTask,
) {
  return new Promise((resolve, reject) => {
    const header = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    };

    console.log(editedTask);

    const PATCH_TASK = `${TASK_PATCH_ENDPOINT}${projectId}/tasks/${editedTask.id}/`;
    axios
      .patch(
        PATCH_TASK,
        {
          title: editedTask.title,
          description: editedTask.description,
          start_date: editedTask.start_date,
          deadline_date: editedTask.deadline_date,
          status: editedTask.status,
          user_name: editedTask.user_name,
          user: editedTask.user,
          epic: editedTask.epic,
        },
        header,
      )
      .then((response) => {
        if (response.status === 200) {
          if (process.env.NODE_ENV === 'production') {
            emailjs
              .send(
                EMAIL_ID,
                PATCH_TASK_TEMPLATE_ID,
                {
                  name: editedTask.title,
                  email: managerEmail,
                  message: `A tarefa ${editedTask.title} foi atualizada, acesse o projeto ${projectName} para conferir as alterações.`,
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
