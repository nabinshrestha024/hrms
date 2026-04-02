/**
 * Format a date string or Date object using Intl.DateTimeFormat.
 * No external dependencies (no date-fns, no dayjs).
 */

export interface FormatDateOptions {
  locale?: string; // e.g., 'en-US'
  timezone?: string; // e.g., 'America/New_York'
  format?: 'short' | 'medium' | 'long' | 'full' | 'relative';
}

export function formatDate(
  date: string | Date | number,
  options: FormatDateOptions = {}
): string {
  const { locale = 'en-US', timezone, format = 'medium' } = options;
  const d = date instanceof Date ? date : new Date(date);

  if (isNaN(d.getTime())) return 'Invalid date';

  if (format === 'relative') {
    return formatRelativeDate(d, locale);
  }

  const formatMap: Record<string, Intl.DateTimeFormatOptions> = {
    short: {
      month: 'numeric',
      day: 'numeric',
      year: '2-digit',
      timeZone: timezone,
    },
    medium: {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      timeZone: timezone,
    },
    long: {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      timeZone: timezone,
    },
    full: {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      timeZone: timezone,
    },
  };

  return new Intl.DateTimeFormat(locale, formatMap[format]).format(d);
}

// Relative time formatting: "2 hours ago", "in 3 days"
function formatRelativeDate(date: Date, locale: string): string {
  const now = new Date();
  const diffMs = date.getTime() - now.getTime();
  const diffSecs = Math.round(diffMs / 1000);
  const diffMins = Math.round(diffSecs / 60);
  const diffHours = Math.round(diffMins / 60);
  const diffDays = Math.round(diffHours / 24);

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

  if (Math.abs(diffDays) >= 1) return rtf.format(diffDays, 'day');
  if (Math.abs(diffHours) >= 1) return rtf.format(diffHours, 'hour');
  if (Math.abs(diffMins) >= 1) return rtf.format(diffMins, 'minute');
  return rtf.format(diffSecs, 'second');
}

export function formatDateTime(
  date: string | Date | number,
  options: FormatDateOptions = {}
): string {
  const { locale = 'en-US', timezone } = options;
  const d = date instanceof Date ? date : new Date(date);

  if (isNaN(d.getTime())) return 'Invalid date';

  return new Intl.DateTimeFormat(locale, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZone: timezone,
  }).format(d);
}

export function formatTime(
  date: string | Date | number,
  options: FormatDateOptions = {}
): string {
  const { locale = 'en-US', timezone } = options;
  const d = date instanceof Date ? date : new Date(date);

  if (isNaN(d.getTime())) return 'Invalid date';

  return new Intl.DateTimeFormat(locale, {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: timezone,
  }).format(d);
}
