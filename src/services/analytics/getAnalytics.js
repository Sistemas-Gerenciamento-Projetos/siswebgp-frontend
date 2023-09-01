import axios from 'axios';
import { ANALYTICS_GET_ENDPOINT } from '../../constants/urls';

export function getAnalytics(accessToken, projectId) {
  return new Promise((resolve, reject) => {
    const header = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const GET_ANALYTICS_URL = `${ANALYTICS_GET_ENDPOINT}${projectId}/analytics/`;
    axios
      .get(GET_ANALYTICS_URL, header)
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
