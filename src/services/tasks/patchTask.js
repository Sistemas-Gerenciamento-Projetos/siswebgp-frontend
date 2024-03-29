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
          resolve(response.data);
        }
      })
      .catch((error) => {
        reject(error);
      });
  }, 20000);
}
