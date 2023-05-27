export function parseDateWithoutTimezone(dateString) {
  const parseDate = dateString.split('T')[0]
  const [year, month, day] = parseDate.split('-');
  const date = new Date(Date.UTC(year, month - 1, day)); // month - 1 porque os meses em JavaScript são baseados em zero

  // Definir as horas para zero para evitar o ajuste do fuso horário
  date.setUTCHours(20, 0, 0, 0);

  return date;
}