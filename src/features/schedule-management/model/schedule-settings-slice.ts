import { createSlice, isAnyOf } from "@reduxjs/toolkit";

import { SCHEDULE_SETTINGS_NOT_FOUND } from "@/entities/schedule";
import { addAuthSessionResetMatcher } from "@/shared/store/auth-reset";

import type { ScheduleSettingsState } from "./state-types";
import {
    fetchScheduleSettings,
    updateScheduleSettings,
} from "./schedule-settings-thunks";

const initialState: ScheduleSettingsState = {
    settings: null,
    isInitialized: false,
    isNotFound: false,
    isLoading: false,
    isSubmitting: false,
    error: null,
};

export const scheduleSettingsSlice = createSlice({
    name: "scheduleSettings",
    initialState,
    reducers: {
        clearScheduleSettingsError(state) {
            state.error = null;
        },
        resetScheduleSettings() {
            return initialState;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchScheduleSettings.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchScheduleSettings.fulfilled, (state, action) => {
                state.settings = action.payload;
                state.isLoading = false;
                state.isInitialized = true;
                state.isNotFound = false;
                state.error = null;
            })
            .addCase(fetchScheduleSettings.rejected, (state, action) => {
                state.isLoading = false;
                state.isInitialized = true;

                if (action.payload === SCHEDULE_SETTINGS_NOT_FOUND) {
                    state.settings = null;
                    state.isNotFound = true;
                    state.error = null;
                    return;
                }

                state.isNotFound = false;
                state.error = action.payload ?? null;
            })

            .addCase(updateScheduleSettings.fulfilled, (state, action) => {
                state.settings = action.payload;
                state.isNotFound = false;
                state.error = null;
            })
            .addCase(updateScheduleSettings.rejected, (state, action) => {
                state.error = action.payload ?? null;
            })

            .addMatcher(isAnyOf(updateScheduleSettings.pending), (state) => {
                state.isSubmitting = true;
                state.error = null;
            })
            .addMatcher(
                isAnyOf(
                    updateScheduleSettings.fulfilled,
                    updateScheduleSettings.rejected,
                ),
                (state) => {
                    state.isSubmitting = false;
                },
            )

        addAuthSessionResetMatcher(builder, initialState);
    },
});

export const { clearScheduleSettingsError, resetScheduleSettings } =
    scheduleSettingsSlice.actions;
