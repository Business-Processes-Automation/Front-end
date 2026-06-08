import { createSlice, isAnyOf } from "@reduxjs/toolkit";

import { addAuthSessionResetMatcher } from "@/shared/store/auth-reset";

import type { AppointmentsState } from "./state-types";
import {
    cancelAppointment,
    createAppointment,
    fetchAppointmentById,
    fetchAppointments,
    rescheduleAppointment,
    updateAppointment,
} from "./thunks";

const initialState: AppointmentsState = {
    items: [],
    selectedAppointment: null,
    isInitialized: false,
    isListLoading: false,
    isDetailLoading: false,
    isSubmitting: false,
    error: null,
    lastQuery: null,
};

const mutationThunks = [
    createAppointment,
    updateAppointment,
    cancelAppointment,
    rescheduleAppointment,
] as const;

function sortByStart(items: AppointmentsState["items"]) {
    return [...items].sort((a, b) => a.startLocal.localeCompare(b.startLocal));
}

function upsertItem(
    items: AppointmentsState["items"],
    appointment: AppointmentsState["items"][number],
) {
    const exists = items.some((item) => item.id === appointment.id);
    if (exists) {
        return sortByStart(
            items.map((item) =>
                item.id === appointment.id ? appointment : item,
            ),
        );
    }

    return sortByStart([...items, appointment]);
}

export const appointmentsSlice = createSlice({
    name: "appointments",
    initialState,
    reducers: {
        clearAppointmentsError(state) {
            state.error = null;
        },
        clearSelectedAppointment(state) {
            state.selectedAppointment = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAppointments.pending, (state) => {
                state.isListLoading = true;
                state.error = null;
            })
            .addCase(fetchAppointments.fulfilled, (state, action) => {
                state.items = sortByStart(action.payload.items);
                state.lastQuery = action.payload.query;
                state.isListLoading = false;
                state.isInitialized = true;
                state.error = null;
            })
            .addCase(fetchAppointments.rejected, (state, action) => {
                state.isListLoading = false;
                state.isInitialized = true;
                state.error = action.payload ?? null;
            })

            .addCase(fetchAppointmentById.pending, (state) => {
                state.isDetailLoading = true;
                state.error = null;
            })
            .addCase(fetchAppointmentById.fulfilled, (state, action) => {
                state.selectedAppointment = action.payload;
                state.items = upsertItem(state.items, action.payload);
                state.isDetailLoading = false;
                state.error = null;
            })
            .addCase(fetchAppointmentById.rejected, (state, action) => {
                state.isDetailLoading = false;
                state.error = action.payload ?? null;
            })

            .addCase(createAppointment.fulfilled, (state, action) => {
                state.items = upsertItem(state.items, action.payload);
                state.error = null;
            })
            .addCase(updateAppointment.fulfilled, (state, action) => {
                state.items = upsertItem(state.items, action.payload);
                if (state.selectedAppointment?.id === action.payload.id) {
                    state.selectedAppointment = action.payload;
                }
                state.error = null;
            })
            .addCase(cancelAppointment.fulfilled, (state, action) => {
                state.items = upsertItem(state.items, action.payload);
                if (state.selectedAppointment?.id === action.payload.id) {
                    state.selectedAppointment = action.payload;
                }
                state.error = null;
            })
            .addCase(rescheduleAppointment.fulfilled, (state, action) => {
                state.items = upsertItem(state.items, action.payload);
                if (state.selectedAppointment?.id === action.payload.id) {
                    state.selectedAppointment = action.payload;
                }
                state.error = null;
            })

            .addMatcher(isAnyOf(...mutationThunks.map((t) => t.pending)), (state) => {
                state.isSubmitting = true;
                state.error = null;
            })
            .addMatcher(
                isAnyOf(
                    ...mutationThunks.map((t) => t.fulfilled),
                    ...mutationThunks.map((t) => t.rejected),
                ),
                (state) => {
                    state.isSubmitting = false;
                },
            )
            .addMatcher(
                isAnyOf(...mutationThunks.map((t) => t.rejected)),
                (state, action) => {
                    state.error = action.payload ?? null;
                },
            );

        addAuthSessionResetMatcher(builder, initialState);
    },
});

export const { clearAppointmentsError, clearSelectedAppointment } =
    appointmentsSlice.actions;
