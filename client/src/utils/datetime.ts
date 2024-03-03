import dayjs from 'dayjs';

export const DAY_MS = 1000 * 60 * 60 * 24; // 24 hours in ms

export function getDayStart(date: Date) {
  const clone = new Date(date);
  clone.setHours(0, 0, 0, 0);
  return clone;
}

export const fixTimeForDufault = () => {
  let today = dayjs();
  today = today.add(3, 'hour');
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
