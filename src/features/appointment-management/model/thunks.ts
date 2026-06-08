import { createAsyncThunk } from "@reduxjs/toolkit";

import type {
    Appointment,
    AppointmentListQuery,
    CreateAppointmentInput,
    RescheduleAppointmentInput,
} from "@/entities/appointment";
import { appointmentApi } from "@/entities/appointment";
import { getApiErrorMessage } from "@/shared/lib/api-error";

import type { UpdateAppointmentPayload } from "./state-types";

type AppointmentThunkConfig = {
    rejectValue: string;
};

export const fetchAppointments = createAsyncThunk<
    { items: Appointment[]; query: AppointmentListQuery },
    AppointmentListQuery,
    AppointmentThunkConfig
>("appointments/fetchList", async (query, { rejectWithValue }) => {
    try {
        const items = await appointmentApi.list(query);
        return { items, query };
    } catch (error) {
        return rejectWithValue(getApiErrorMessage(error));
    }
});

export const fetchAppointmentById = createAsyncThunk<
    Appointment,
    number,
    AppointmentThunkConfig
>("appointments/fetchById", async (id, { rejectWithValue }) => {
    try {
        return await appointmentApi.getById(id);
    } catch (error) {
        return rejectWithValue(getApiErrorMessage(error));
    }
});

export const createAppointment = createAsyncThunk<
    Appointment,
    CreateAppointmentInput,
    AppointmentThunkConfig
>("appointments/create", async (input, { rejectWithValue }) => {
    try {
        return await appointmentApi.create(input);
    } catch (error) {
        return rejectWithValue(getApiErrorMessage(error));
    }
});

export const updateAppointment = createAsyncThunk<
    Appointment,
    UpdateAppointmentPayload,
    AppointmentThunkConfig
>("appointments/update", async ({ id, input }, { rejectWithValue }) => {
    try {
        return await appointmentApi.update(id, input);
    } catch (error) {
        return rejectWithValue(getApiErrorMessage(error));
    }
});

export const cancelAppointment = createAsyncThunk<
    Appointment,
    number,
    AppointmentThunkConfig
>("appointments/cancel", async (id, { rejectWithValue }) => {
    try {
        return await appointmentApi.cancel(id);
    } catch (error) {
        return rejectWithValue(getApiErrorMessage(error));
    }
});

export const rescheduleAppointment = createAsyncThunk<
    Appointment,
    { id: number; input: RescheduleAppointmentInput },
    AppointmentThunkConfig
>("appointments/reschedule", async ({ id, input }, { rejectWithValue }) => {
    try {
        return await appointmentApi.reschedule(id, input);
    } catch (error) {
        return rejectWithValue(getApiErrorMessage(error));
    }
});
