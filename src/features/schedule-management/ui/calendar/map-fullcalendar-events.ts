import type {
    BusinessHoursInput,
    EventInput,
} from "@fullcalendar/core";

import type { AppointmentStatus } from "@/entities/appointment";
import type { CalendarDay, ScheduleCalendar } from "@/entities/schedule";

const STATUS_CLASS: Record<AppointmentStatus, string> = {
    Planned: "fc-event-status-planned",
    Completed: "fc-event-status-completed",
    Cancelled: "fc-event-status-cancelled",
    Rescheduled: "fc-event-status-rescheduled",
    NoShow: "fc-event-status-noshow",
};

function padSlotTime(time: string, minutesDelta: number): string {
    const [hours, mins] = time.split(":").map(Number);
    const total = hours * 60 + mins + minutesDelta;
    const clamped = Math.max(0, Math.min(24 * 60 - 1, total));
    const nextHours = Math.floor(clamped / 60);
    const nextMins = clamped % 60;

    return `${String(nextHours).padStart(2, "0")}:${String(nextMins).padStart(2, "0")}`;
}

export function mapScheduleCalendarToEvents(
    calendar: ScheduleCalendar,
): EventInput[] {
    const events: EventInput[] = [];

    for (const day of calendar.days) {
        for (const appointment of day.appointments) {
            events.push({
                id: String(appointment.id),
                title: `${appointment.serviceName} — ${appointment.clientName}`,
                start: appointment.startLocal,
                end: appointment.endLocal,
                classNames: [STATUS_CLASS[appointment.status]],
                extendedProps: {
                    type: "appointment",
                    appointmentId: appointment.id,
                    status: appointment.status,
                },
            });
        }

        for (const timeOff of day.timeOffs) {
            events.push({
                id: `timeoff-${timeOff.id}`,
                title: timeOff.isFullDay ? "Вихідний" : "Блок часу",
                start: timeOff.startLocal,
                end: timeOff.endLocal,
                allDay: timeOff.isFullDay,
                display: "background",
                classNames: ["fc-event-timeoff"],
                extendedProps: {
                    type: "timeOff",
                },
            });
        }
    }

    return events;
}

export function mapScheduleCalendarToBusinessHours(
    days: CalendarDay[],
): BusinessHoursInput[] | false {
    const groups = new Map<string, Set<number>>();

    for (const day of days) {
        if (!day.workingHours) {
            continue;
        }

        const key = `${day.workingHours.start}|${day.workingHours.end}`;
        const dayOfWeek = new Date(`${day.date}T12:00:00`).getDay();

        if (!groups.has(key)) {
            groups.set(key, new Set());
        }

        groups.get(key)!.add(dayOfWeek);
    }

    if (groups.size === 0) {
        return false;
    }

    return Array.from(groups.entries()).map(([key, dayNumbers]) => {
        const [startTime, endTime] = key.split("|");

        return {
            daysOfWeek: Array.from(dayNumbers),
            startTime,
            endTime,
        };
    });
}

export function getCalendarSlotBounds(days: CalendarDay[]): {
    slotMinTime: string;
    slotMaxTime: string;
} {
    let min = "23:59";
    let max = "00:00";

    for (const day of days) {
        if (!day.workingHours) {
            continue;
        }

        if (day.workingHours.start < min) {
            min = day.workingHours.start;
        }

        if (day.workingHours.end > max) {
            max = day.workingHours.end;
        }
    }

    if (min === "23:59") {
        return { slotMinTime: "08:00:00", slotMaxTime: "20:00:00" };
    }

    return {
        slotMinTime: `${padSlotTime(min, -60)}:00`,
        slotMaxTime: `${padSlotTime(max, 60)}:00`,
    };
}
