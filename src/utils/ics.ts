import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { WorkingDay } from '../page/HomePage/StepSummary';

interface Event {
  start: string;
  end: string;
  summary: string;
  description: string;
  location: string;
  created: string;
  uuid: string;
}

export const generateICS = (workingDays: WorkingDay[], month: number, year: number): string => {
  const currentDateTemplate = (day: number, time: string) =>
    moment(`${year}.${month}.${day} ${time}`, 'YYYY.M.D HH:mm').utc().format('YYYYMMDD\\THHmmss\\Z');

  const events: Event[] = workingDays.map((workingDay) => {
    const start = currentDateTemplate(workingDay.dayNo, workingDay.start);
    const end = currentDateTemplate(workingDay.dayNo, workingDay.end);
    const created = moment().utc().format('YYYYMMDD\\THHmmss\\Z');
    return {
      start,
      end,
      summary: `Work Homla`,
      description: `${workingDay.dayOfWeek} ${workingDay.dayNo}`,
      location: 'Homla',
      created,
      uuid: uuidv4().toUpperCase()
    };
  });

  return calendarTemplate(events);
};

const generateEvent = (event: Event) => `BEGIN:VEVENT
DTSTART:${event.start}
DTEND:${event.end}
DTSTAMP:${event.start}
CREATED:${event.created}
LAST-MODIFIED:${event.created}
SUMMARY:${event.summary}
DESCRIPTION:${event.description}
LOCATION:${event.location}
UID:${event.uuid}
SEQUENCE:0
STATUS:CONFIRMED
TRANSP:OPAQUE
END:VEVENT
`;

const calendarTemplate = (events: Event[]) => `BEGIN:VCALENDAR
PRODID:-//ZUMMAPL/HOMLA-CAL-GEN//PL
VERSION:2.0
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:Homla calendar
X-WR-TIMEZONE:Europe/Warsaw
TZID:Europe/Warsaw
${events.map(generateEvent).join('')}
END:VCALENDAR
`;
