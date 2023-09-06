export const BACKEND_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8000/'
    : 'https://siswebgp-backend-django.vercel.app';

export const REGISTRATION_ENDPOINT = BACKEND_URL + 'api/auth/register/';

export const VERIFY_EMAIL_ENDPOINT = BACKEND_URL + 'api/users/email/verify/';

export const LOGIN_ENDPOINT = BACKEND_URL + 'api/auth/login/';

export const PROFILE_UPDATE_ENDPOINT =
  BACKEND_URL + 'api/users/profile/update/';

export const PROJECTS_CREATE_ENDPOINT = BACKEND_URL + 'api/projects/';

export const PROJECTS_GET_ENDPOINT =
  BACKEND_URL + 'api/projects/projects_by_user/';

export const TASKS_GET_ENDPOINT = BACKEND_URL + 'api/projects/';

export const TASK_CREATE_ENDPOINT = BACKEND_URL + 'api/projects/';

export const TASK_PATCH_ENDPOINT = BACKEND_URL + 'api/projects/';

export const PROJECTS_ENDPOINT = BACKEND_URL + 'api/projects/';

export const USERS_GET_ENDPOINT = BACKEND_URL + 'api/projects/';

export const ADD_USER_IN_PROJECT_ENDPOINT = '/include_users/';

export const GET_EXTERNAL_USERS_ENDPOINT = '/external_users/';

export const EMAIL_ID = 'service_mo3esbq';
export const INVITE_TEMPLATE_ID = 'template_unaeasm';
export const PATCH_TASK_TEMPLATE_ID = 'template_boqsumt';
export const PUBLIC_ID_KEY = '5KH-A9jK1wAHPRmmC';

export const EPICS_GET_ENDPOINT = BACKEND_URL + 'api/projects/';
export const EPICS_POST_ENDPOINT = BACKEND_URL + 'api/projects/';
export const EPIC_PATCH_ENDPOINT = BACKEND_URL + 'api/projects/';
export const EPIC_DELETE_ENDPOINT = BACKEND_URL + 'api/projects/';

export const ANALYTICS_GET_ENDPOINT = BACKEND_URL + 'api/projects/';
