import { createSlice, isAnyOf } from "@reduxjs/toolkit";

import { addAuthSessionResetMatcher } from "@/shared/store/auth-reset";

import type { ScheduleCalendarState } from "./schedule-calendar-state-types";
import {
    fetchAppointmentDetails,
    fetchScheduleCalendar,
} from "./schedule-calendar-thunks";

const initialState: ScheduleCalendarState = {
    calendar: null,
    lastQuery: null,
    selectedAppointment: null,
    isCalendarInitialized: false,
    isCalendarLoading: false,
    isAppointmentLoading: false,
    loadingAppointmentId: null,
    error: null,
};

export const scheduleCalendarSlice = createSlice({
    name: "scheduleCalendar",
    initialState,
    reducers: {
        clearScheduleCalendarError(state) {
            state.error = null;
        },
        clearSelectedAppointment(state) {
            state.selectedAppointment = null;
        },
        resetScheduleCalendar() {
            return initialState;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchScheduleCalendar.pending, (state) => {
                state.isCalendarLoading = true;
                state.error = null;
            })
            .addCase(fetchScheduleCalendar.fulfilled, (state, action) => {
                state.calendar = action.payload.calendar;
                state.lastQuery = action.payload.query;
                state.isCalendarLoading = false;
                state.isCalendarInitialized = true;
                state.error = null;
            })
            .addCase(fetchScheduleCalendar.rejected, (state, action) => {
                state.isCalendarLoading = false;
                state.isCalendarInitialized = true;
                state.error = action.payload ?? null;
            })

            .addCase(fetchAppointmentDetails.fulfilled, (state, action) => {
                state.selectedAppointment = action.payload;
                state.error = null;
            })
            .addCase(fetchAppointmentDetails.rejected, (state, action) => {
                state.error = action.payload ?? null;
            })

            .addMatcher(isAnyOf(fetchAppointmentDetails.pending), (state, action) => {
                state.isAppointmentLoading = true;
                state.loadingAppointmentId = action.meta.arg;
                state.error = null;
            })
            .addMatcher(
                isAnyOf(
                    fetchAppointmentDetails.fulfilled,
                    fetchAppointmentDetails.rejected,
                ),
                (state) => {
                    state.isAppointmentLoading = false;
                    state.loadingAppointmentId = null;
                },
            )

        addAuthSessionResetMatcher(builder, initialState);
    },
});

export const {
    clearScheduleCalendarError,
    clearSelectedAppointment,
    resetScheduleCalendar,
} = scheduleCalendarSlice.actions;
