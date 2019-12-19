export function currentDate(unixTimestamp) {
  const date = new Date(unixTimestamp);
  return date.toLocaleDateString()
              .concat(' às ', date.getHours())
              .concat(':', date.getMinutes());
}
