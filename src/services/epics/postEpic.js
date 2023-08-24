import { EPICS_POST_ENDPOINT } from '../../constants/urls';
import axios from 'axios';

export function postEpic(
  accessToken,
  userId,
  projectId,
  title,
  description,
  startDate,
  endDate,
  status,
) {
  return new Promise((resolve, reject) => {
    const header = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    };

    console.log(userId);

    axios
      .post(
        EPICS_POST_ENDPOINT,
        {
          title: title,
          description: description,
          start_date: startDate,
          deadline_date: endDate,
          status: status,
          user: userId,
          project: projectId,
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
