import dayjs from 'dayjs';

export const HOUR_MS = 1000 * 60 * 60; // 60 minutes
export const DAY_MS = HOUR_MS * 24; // 24 hours in ms

export function getDayStart(date: Date) {
  const clone = new Date(date);
  clone.setHours(0, 0, 0, 0);
  return clone;
}

export const fixTimeForDufault = (rideTimeRestriction?: number | undefined) => {
  let today = dayjs();
  today = today.add(3 + (rideTimeRestriction ?? 0), 'hour');
  const remainderMinutes = today.minute() % 5;
  today = today.minute(today.minute() + 5 - remainderMinutes);
  return today;
};

export function getHoursArray(maxHour: number, minHour = 1) {
  return Array.from({ length: maxHour - minHour + 1 }, (_, i) => i + minHour);
}

export function getMenuHoursLabel(hour: number) {
  if (hour === 1) {
    return 'שעה';
  }
  if (hour === 2) {
    return 'שעתיים';
  }

  return `${hour} שעות`;
}

export function formatPickupDateTime(
  pickupDate?: Date | string,
  relevantTime?: number,
  isShort = false
): string {
  if (!pickupDate || !relevantTime) {
    return 'Invalid date or relevant time';
  }

  const pickupDateStart = new Date(pickupDate);
  if (Number.isNaN(pickupDateStart.getTime())) {
    return 'Invalid date';
  }

  // Calculate end time based on relevant time (in hours)
  const pickupDateEnd = new Date(pickupDateStart.getTime() + relevantTime * HOUR_MS);
  const formattedStartDate = dayjs(pickupDateStart).format('DD/MM/YYYY');
  const formattedEndDate = dayjs(pickupDateEnd).format('DD/MM/YYYY');
  const formattedStartTime = dayjs(pickupDateStart).format('HH:mm');
  const formattedEndTime = dayjs(pickupDateEnd).format('HH:mm');
  const formattedStartWeekDay = getWeekDay(pickupDateStart);
  const formattedEndWeekDay = getWeekDay(pickupDateEnd);
  const isStartSameAsEnd = isSameDate(pickupDateStart, pickupDateEnd);
  const between = isShort ? '' : 'בין ';

  // const dayOfWeekStart = new Intl.DateTimeFormat('he-IL', { weekday: 'short' }).format(pickupDate);
  if (isStartSameAsEnd && formattedStartTime === formattedEndTime) {
    return `${formattedStartWeekDay} ${formattedStartDate} ${formattedStartTime}`;
  }
  if (isStartSameAsEnd) {
    return `${formattedStartWeekDay} ${formattedStartDate} ${between}${formattedStartTime} - ${formattedEndTime}`;
  }

  return (
    `${between}${formattedStartWeekDay} ${formattedStartDate} ${formattedStartTime}` +
    ` - ${formattedEndWeekDay} ${formattedEndDate} ${formattedEndTime}`
  );
}

function getWeekDay(date: Date) {
  const today = new Date();
  if (isSameDate(today, date)) {
    return 'היום';
  }

  const tomorrow = new Date(today.getTime() + DAY_MS);
  if (isSameDate(tomorrow, date)) {
    return 'מחר';
  }

  return new Intl.DateTimeFormat('he-IL', { weekday: 'short' }).format(date);
}

function isSameDate(date1: Date, date2: Date) {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
}
