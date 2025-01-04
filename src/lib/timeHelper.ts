/**
 * Returns the current time in format 'HH:mm:ss' at the specified ISO timezone.
 * @param isoOffset the iso timezone to return the formatted time of.
 */
export const timeStringAtIsoZoneOffset = (isoOffset: string): string | null => {
  let dateInTimezone: Date;
  if (isoOffset === "Z") {
    // UTC can use date directly as it contains the correct utc time
    dateInTimezone = new Date();
  } else {
    // parse ISO timezone (format: [+/-][hours 'HH']:[seconds 'ss'], return null on invalid input
    const match = isoOffset.match(/^([+-])(\d{2}):(\d{2})$/);
    if (!match) {
      return null;
    }

    // calculate the offset in milliseconds and construct a date from the unix timestamp and the calculated offset
    const sign = match[1] === "+" ? 1 : -1;
    const hours = Number.parseInt(match[2], 10);
    const minutes = Number.parseInt(match[3], 10);
    const offsetMillis = sign * (hours * 60 * 60 * 1000 + minutes * 60 * 1000);
    dateInTimezone = new Date(Date.now() + offsetMillis);
  }

  // format time in given timezone using the 'HH:mm:ss' format
  return `${dateInTimezone.getUTCHours()}:${dateInTimezone.getUTCMinutes()}:${dateInTimezone.getUTCSeconds()}`;
};
