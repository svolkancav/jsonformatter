import cronstrue from 'cronstrue';
import { CronExpressionParser } from 'cron-parser';

export interface CronResult {
  description: string;
  nextRuns: string[];
}

export function explainCron(expr: string): CronResult {
  const trimmed = expr.trim();
  if (!trimmed) throw new Error('Enter a cron expression, e.g. */5 * * * *');

  let description: string;
  try {
    description = cronstrue.toString(trimmed);
  } catch (e) {
    throw new Error('Invalid cron expression: ' + (e instanceof Error ? e.message : 'parse error'));
  }

  const nextRuns: string[] = [];
  try {
    const it = CronExpressionParser.parse(trimmed);
    for (let i = 0; i < 5; i++) {
      nextRuns.push(it.next().toDate().toISOString().replace('T', ' ').replace('.000Z', ' UTC'));
    }
  } catch {
    // The human description is still useful even if next-run calc fails.
  }

  return { description, nextRuns };
}

export const CRON_PRESETS: { label: string; expr: string }[] = [
  { label: 'Every minute', expr: '* * * * *' },
  { label: 'Every 5 minutes', expr: '*/5 * * * *' },
  { label: 'Every 15 minutes', expr: '*/15 * * * *' },
  { label: 'Every hour', expr: '0 * * * *' },
  { label: 'Every day at midnight', expr: '0 0 * * *' },
  { label: 'Every day at 9 AM', expr: '0 9 * * *' },
  { label: 'Weekdays at 9 AM', expr: '0 9 * * 1-5' },
  { label: 'Every Monday', expr: '0 0 * * 1' },
  { label: 'First of the month', expr: '0 0 1 * *' },
  { label: 'Every Sunday at 3 AM', expr: '0 3 * * 0' },
];

export const CRON_FIELDS: { field: string; values: string; notes: string }[] = [
  { field: 'Minute', values: '0–59', notes: 'Minute of the hour' },
  { field: 'Hour', values: '0–23', notes: 'Hour of the day (24h)' },
  { field: 'Day of month', values: '1–31', notes: 'Day of the month' },
  { field: 'Month', values: '1–12', notes: 'Jan=1 … Dec=12' },
  { field: 'Day of week', values: '0–6', notes: 'Sun=0 … Sat=6' },
];
