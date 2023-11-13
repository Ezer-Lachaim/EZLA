import { format as formatFn, OptionsWithTZ } from 'date-fns-tz';

// Use Israel as the constant time zone for now.
// This is until the timezone will be saved in the db.
const TIMEZONE = 'Asia/Jerusalem';

export function formatDate(date: Date | number, format: string, options?: OptionsWithTZ): string {
  return formatFn(date, format, {
    ...options,
    timeZone: TIMEZONE
  });
}
