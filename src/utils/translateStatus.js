import {
  STATUS_DONE,
  STATUS_INPROGRESS,
  STATUS_PAUSED,
  STATUS_TODO,
} from '../constants/taskStatus';

export default function translateStatus(status) {
  switch (status) {
    case STATUS_TODO:
      return 'A fazer';
    case STATUS_INPROGRESS:
      return 'Em andamento';
    case STATUS_DONE:
      return 'Concluído';
    case STATUS_PAUSED:
      return 'Pausado';
  }
}
