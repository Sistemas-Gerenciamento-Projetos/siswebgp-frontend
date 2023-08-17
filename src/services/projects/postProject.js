import { PROJECTS_CREATE_ENDPOINT } from '../../constants/urls';
import axios from 'axios';

export function postProject(
  accessToken,
  userId,
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
      .post(
        PROJECTS_CREATE_ENDPOINT,
        {
          manager: userId,
          project_name: parsedTitle,
          description: description,
          start_date: startDate,
          deadline_date: endDate,
          users: [userId],
        },
        header,
      )
      .then((response) => {
        if (response.status === 201) {
          resolve(response.data);
        } else {
          reject(response);
        }
      })
      .catch((error) => {
        reject(error);
      });
  }, 20000);
}
