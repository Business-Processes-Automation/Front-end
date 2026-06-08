import { api } from "@/shared/api";
import { API_ROUTES } from "@/shared/config";

import type {
    AppointmentListQuery,
    CreateAppointmentInput,
    RescheduleAppointmentInput,
    UpdateAppointmentInput,
} from "../model/appointment-types";
import { mapAppointment, mapAppointmentList } from "./map-appointment";
import type { AppointmentDto } from "./types";

function buildListParams(query: AppointmentListQuery) {
    const params: Record<string, string | number> = {
        from: query.from,
        to: query.to,
    };

    if (query.status) {
        params.status = query.status;
    }

    if (query.serviceId) {
        params.serviceId = query.serviceId;
    }

    return params;
}

/**
 * API записів майстра.
 * Базовий шлях: /api/masters/me/appointments
 */
export const appointmentApi = {
    /** GET /api/masters/me/appointments */
    list(query: AppointmentListQuery) {
        return api
            .get<AppointmentDto[]>(API_ROUTES.appointments.base, {
                params: buildListParams(query),
            })
            .then(({ data }) => mapAppointmentList(data));
    },

    /** GET /api/masters/me/appointments/{id} */
    getById(id: number) {
        return api
            .get<AppointmentDto>(API_ROUTES.appointments.byId(id))
            .then(({ data }) => mapAppointment(data));
    },

    /** POST /api/masters/me/appointments → 201 */
    create(input: CreateAppointmentInput) {
        return api
            .post<AppointmentDto>(API_ROUTES.appointments.base, input)
            .then(({ data }) => mapAppointment(data));
    },

    /** PATCH /api/masters/me/appointments/{id} */
    update(id: number, input: UpdateAppointmentInput) {
        return api
            .patch<AppointmentDto>(API_ROUTES.appointments.byId(id), input)
            .then(({ data }) => mapAppointment(data));
    },

    /** POST /api/masters/me/appointments/{id}/cancel */
    cancel(id: number) {
        return api
            .post<AppointmentDto>(API_ROUTES.appointments.cancel(id))
            .then(({ data }) => mapAppointment(data));
    },

    /** POST /api/masters/me/appointments/{id}/reschedule */
    reschedule(id: number, input: RescheduleAppointmentInput) {
        return api
            .post<AppointmentDto>(
                API_ROUTES.appointments.reschedule(id),
                input,
            )
            .then(({ data }) => mapAppointment(data));
    },
};
