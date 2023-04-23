export const BACKEND_URL =
  "env" in window ? window.__env__.BACKEND_URL : "http://localhost:8000/";

export const REGISTRATION_ENDPOINT = BACKEND_URL + "api/users/register/";

export const VERIFY_EMAIL_ENDOPOINT = BACKEND_URL + "api/users/email/verify/";

export const LOGIN_ENDOPOINT = BACKEND_URL + "api/users/token /";
