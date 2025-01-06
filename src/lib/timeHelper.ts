/**
 * Parses the given ISO timezone offset and returns a number tuple consisting
 * of the sign bit (1 or -1), the offset hours and offset minutes.
 * @param isoOffset the ISO timezone offset to parse.
 */
export const parseIsoTimezoneOffset = (isoOffset: string): [number, number, number] | null => {
  if (isoOffset === "Z") {
    // UTC can use date directly as it contains the correct utc time
    return [1, 0, 0];
  }

  // parse ISO timezone (format: [+/-][hours 'HH']:[seconds 'ss'], return null on invalid input
  const match = isoOffset.match(/^([+-])(\d{2}):(\d{2})$/);
  if (!match) {
    return null;
  }

  // calculate the offset in milliseconds and construct a date from the unix timestamp and the calculated offset
  const sign = match[1] === "+" ? 1 : -1;
  const hours = Number.parseInt(match[2], 10);
  const minutes = Number.parseInt(match[3], 10);
  return [sign, hours, minutes];
};

/**
 * Returns the current time in format 'HH:mm:ss' at the specified ISO timezone.
 * @param isoOffset the iso timezone to return the formatted time of.
 */
export const timeStringAtIsoZoneOffset = (isoOffset: string): string | null => {
  const parsedOffset = parseIsoTimezoneOffset(isoOffset);
  if (!parsedOffset) {
    return null;
  }

  // format time in given timezone using the 'HH:mm:ss' format
  const [sign, hours, minutes] = parsedOffset;
  const offsetMillis = sign * (hours * 60 * 60 * 1000 + minutes * 60 * 1000);
  const dateInTimezone = new Date(Date.now() + offsetMillis);
  return `${dateInTimezone.getUTCHours()}:${dateInTimezone.getUTCMinutes()}:${dateInTimezone.getUTCSeconds()}`;
};

/**
 * Returns a formatted string indicating the difference between the given timezone and
 * the local timezone or null if the timezone cannot be parsed or there is no difference.
 * @param isoOffset the timezone to get the difference to the local timezone of.
 */
export const formatLocalTimezoneDifference = (isoOffset: string) => {
  const parsedOffset = parseIsoTimezoneOffset(isoOffset);
  if (!parsedOffset) {
    return null;
  }

  // get the local timezone offset in minutes
  const localDate = new Date();
  const localOffset = localDate.getTimezoneOffset() * -1;

  // calculate the timezone diff in minutes, return null if it's the same timezone
  const [sign, hours, minutes] = parsedOffset;
  const timezoneOffsetMinutes = sign * hours * 60 + minutes;
  const offsetMinutes = timezoneOffsetMinutes - localOffset;
  if (offsetMinutes === 0) {
    return null;
  }

  // get the offset minutes and hours from the overall offset minutes
  const absOffsetMinutes = Math.abs(offsetMinutes);
  const offHours = Math.floor(absOffsetMinutes / 60);
  const offMinutes = offsetMinutes % 60;

  // format the diff in a human-readable way, omitting the minutes if there are none to display
  const diffType = offsetMinutes > 0 ? "ahead" : "behind";
  const paddedMinutes = offMinutes.toString().padStart(2, "0");
  return offMinutes > 0 ? `${offHours}:${paddedMinutes}h ${diffType}` : `${offHours}h ${diffType}`;
};
