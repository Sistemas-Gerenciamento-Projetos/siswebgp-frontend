import { PROJECTS_ENDPOINT } from '../../constants/urls';
import axios from 'axios';

export function patchProject(
  accessToken,
  managerId,
  projectId,
  title,
  description,
  startDate,
  endDate,
) {
  return new Promise((resolve, reject) => {
    const parsedTitle = title.trim();

    const header = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    };

    axios
      .patch(
        `${PROJECTS_ENDPOINT + projectId}/`,
        {
          manager: managerId,
          project_name: parsedTitle,
          description: description,
          start_date: startDate,
          deadline_date: endDate,
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
