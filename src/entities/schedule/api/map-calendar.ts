import {
    mapAppointment,
    type AppointmentDto,
} from "@/entities/appointment";

import type {
    AppointmentDetails,
    CalendarDay,
    ScheduleCalendar,
} from "../model/calendar-types";
import type { AppointmentStatus } from "../model/calendar-types";
import { mapTimeOff, type TimeOffDto } from "./map-time-off";

type CalendarWorkingHoursDto = {
    start: string;
    end: string;
};

type CalendarAppointmentSummaryDto = {
    id: number;
    serviceId: number;
    startLocal: string;
    endLocal: string;
    serviceName: string;
    clientName: string;
    status: AppointmentStatus;
};

type CalendarDayDto = {
    date: string;
    workingHours: CalendarWorkingHoursDto | null;
    timeOffs: TimeOffDto[];
    appointments: CalendarAppointmentSummaryDto[];
};

export type ScheduleCalendarDto = {
    timeZone: string;
    from: string;
    to: string;
    days: CalendarDayDto[];
};

export type AppointmentDetailsDto = AppointmentDto;

function mapCalendarDay(dto: CalendarDayDto): CalendarDay {
    return {
        date: dto.date,
        workingHours: dto.workingHours
            ? { start: dto.workingHours.start, end: dto.workingHours.end }
            : null,
        timeOffs: dto.timeOffs.map(mapTimeOff),
        appointments: dto.appointments.map((appointment) => ({
            id: appointment.id,
            serviceId: appointment.serviceId,
            startLocal: appointment.startLocal,
            endLocal: appointment.endLocal,
            serviceName: appointment.serviceName,
            clientName: appointment.clientName,
            status: appointment.status,
        })),
    };
}

export function mapScheduleCalendar(dto: ScheduleCalendarDto): ScheduleCalendar {
    return {
        timeZone: dto.timeZone,
        from: dto.from,
        to: dto.to,
        days: dto.days.map(mapCalendarDay),
    };
}

export function mapAppointmentDetails(
    dto: AppointmentDetailsDto,
): AppointmentDetails {
    return mapAppointment(dto);
}
