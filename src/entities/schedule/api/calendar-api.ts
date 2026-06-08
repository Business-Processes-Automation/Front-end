import { api } from "@/shared/api";
import { API_ROUTES } from "@/shared/config";

import { appointmentApi } from "@/entities/appointment";

import type {
    AppointmentDetails,
    ScheduleCalendar,
    ScheduleCalendarQuery,
} from "../model/calendar-types";
import {
    mapScheduleCalendar,
    type AppointmentDetailsDto,
    type ScheduleCalendarDto,
} from "./map-calendar";

function buildCalendarParams(query: ScheduleCalendarQuery) {
    const params: Record<string, string | number | boolean> = {
        from: query.from,
        to: query.to,
    };

    if (query.includeCancelled !== undefined) {
        params.includeCancelled = query.includeCancelled;
    }

    if (query.status) {
        params.status = query.status;
    }

    if (query.serviceId) {
        params.serviceId = query.serviceId;
    }

    return params;
}

export const scheduleCalendarApi = {
    getCalendar(query: ScheduleCalendarQuery) {
        return api
            .get<ScheduleCalendarDto>(API_ROUTES.schedule.calendar, {
                params: buildCalendarParams(query),
            })
            .then(({ data }) => mapScheduleCalendar(data));
    },

    /** Делегує до appointmentApi — той самий AppointmentResponseDTO. */
    getAppointment(id: number): Promise<AppointmentDetails> {
        return appointmentApi.getById(id);
    },
};

export type { AppointmentDetailsDto, ScheduleCalendarDto };
