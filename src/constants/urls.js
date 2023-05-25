export const BACKEND_URL =
  "env" in window ? window.__env__.BACKEND_URL : "http://localhost:8000/";

export const REGISTRATION_ENDPOINT = BACKEND_URL + "api/users/register/";

export const VERIFY_EMAIL_ENDOPOINT = BACKEND_URL + "api/users/email/verify/";

export const LOGIN_ENDOPOINT = BACKEND_URL + "api/users/token /";

export const PROFILE_UPDATE_ENDPOINT = BACKEND_URL + "api/users/profile/update";

export const TASKS_CREATE_ENDPOINT = BACKEND_URL + "api/projects/project_id/tasks/";

