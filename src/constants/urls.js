export const BACKEND_URL =
  "env" in window ? window.__env__.BACKEND_URL : "http://localhost:8000/";

export const REGISTRATION_ENDPOINT = BACKEND_URL + "api/auth/register/";

export const VERIFY_EMAIL_ENDPOINT = BACKEND_URL + "api/users/email/verify/";

export const LOGIN_ENDPOINT = BACKEND_URL + "api/auth/login/";

export const PROFILE_UPDATE_ENDPOINT = BACKEND_URL + "api/users/profile/update";

export const PROJECTS_CREATE_ENDPOINT = BACKEND_URL + "api/projects/";
