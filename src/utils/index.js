export function checkPasswordComplexity(password, confirmPassword) {
  var retval = [""];

  const lowercaseregex = new RegExp("[a-z]");
  const uppercaseregex = new RegExp("[A-Z]");
  const numberegex = new RegExp("[0-9]");

  const puncRegex = /[!"#$%&'()*+-./:;<=>?@[\]^_{ }~]/g;

  if (!lowercaseregex.test(password, confirmPassword)) {
    retval.push("Necessário uma letra minúscula");
  }

  if (!uppercaseregex.test(password, confirmPassword)) {
    retval.push("Necessário uma letra maiúscula");
  }

  if (!numberegex.test(password, confirmPassword)) {
    retval.push("Necessário um número");
  }

  if (!puncRegex.test(password, confirmPassword)) {
    retval.push("Necessário um caracter especial");
  }

  if (password.length < 8) {
    retval.push("Necessário 8 caracteres");
  }

  if (password !== confirmPassword) {
    retval.push("Password must match");
  }

  return retval;
}
