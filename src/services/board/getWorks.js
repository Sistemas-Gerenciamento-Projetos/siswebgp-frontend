import { getEpics } from '../epics/getEpics';
import { getTasks } from '../tasks/getTasks';

export default function getWorks(accessToken, projectId) {
  return Promise.all([
    getEpics(accessToken, projectId),
    getTasks(accessToken, projectId),
  ]);
}
