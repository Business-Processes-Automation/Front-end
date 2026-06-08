import { createAsyncThunk } from "@reduxjs/toolkit";

import type {
    AppointmentDetails,
    ScheduleCalendar,
    ScheduleCalendarQuery,
} from "@/entities/schedule";
import { scheduleCalendarApi } from "@/entities/schedule";
import { getApiErrorMessage } from "@/shared/lib/api-error";

type ScheduleCalendarThunkConfig = {
    rejectValue: string;
};

export const fetchScheduleCalendar = createAsyncThunk<
    { calendar: ScheduleCalendar; query: ScheduleCalendarQuery },
    ScheduleCalendarQuery,
    ScheduleCalendarThunkConfig
>("scheduleCalendar/fetch", async (query, { rejectWithValue }) => {
    try {
        const calendar = await scheduleCalendarApi.getCalendar(query);
        return { calendar, query };
    } catch (error) {
        return rejectWithValue(getApiErrorMessage(error));
    }
});

export const fetchAppointmentDetails = createAsyncThunk<
    AppointmentDetails,
    number,
    ScheduleCalendarThunkConfig
>("scheduleCalendar/fetchAppointment", async (id, { rejectWithValue }) => {
    try {
        return await scheduleCalendarApi.getAppointment(id);
    } catch (error) {
        return rejectWithValue(getApiErrorMessage(error));
    }
});
