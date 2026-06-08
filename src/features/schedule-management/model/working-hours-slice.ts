import { createSlice, isAnyOf } from "@reduxjs/toolkit";

import { addAuthSessionResetMatcher } from "@/shared/store/auth-reset";

import type { WorkingHoursState } from "./working-hours-state-types";
import {
    deleteWorkingHoursDay,
    fetchWorkingHours,
    replaceWorkingHours,
    updateWorkingHoursDay,
} from "./working-hours-thunks";

const initialState: WorkingHoursState = {
    week: null,
    isInitialized: false,
    isLoading: false,
    isSubmittingWeek: false,
    submittingDay: null,
    deletingDay: null,
    error: null,
};

export const workingHoursSlice = createSlice({
    name: "workingHours",
    initialState,
    reducers: {
        clearWorkingHoursError(state) {
            state.error = null;
        },
        resetWorkingHours() {
            return initialState;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWorkingHours.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchWorkingHours.fulfilled, (state, action) => {
                state.week = action.payload;
                state.isLoading = false;
                state.isInitialized = true;
                state.error = null;
            })
            .addCase(fetchWorkingHours.rejected, (state, action) => {
                state.isLoading = false;
                state.isInitialized = true;
                state.error = action.payload ?? null;
            })

            .addCase(replaceWorkingHours.fulfilled, (state, action) => {
                state.week = action.payload;
                state.error = null;
            })
            .addCase(replaceWorkingHours.rejected, (state, action) => {
                state.error = action.payload ?? null;
            })

            .addCase(updateWorkingHoursDay.fulfilled, (state, action) => {
                const updatedDay = action.payload;
                if (state.week) {
                    state.week = state.week.map((day) =>
                        day.dayOfWeek === updatedDay.dayOfWeek
                            ? updatedDay
                            : day,
                    );
                }
                state.error = null;
            })
            .addCase(updateWorkingHoursDay.rejected, (state, action) => {
                state.error = action.payload ?? null;
            })

            .addCase(deleteWorkingHoursDay.fulfilled, (state, action) => {
                state.week = action.payload;
                state.error = null;
            })
            .addCase(deleteWorkingHoursDay.rejected, (state, action) => {
                state.error = action.payload ?? null;
            })

            .addMatcher(isAnyOf(replaceWorkingHours.pending), (state) => {
                state.isSubmittingWeek = true;
                state.error = null;
            })
            .addMatcher(
                isAnyOf(
                    replaceWorkingHours.fulfilled,
                    replaceWorkingHours.rejected,
                ),
                (state) => {
                    state.isSubmittingWeek = false;
                },
            )

            .addMatcher(isAnyOf(updateWorkingHoursDay.pending), (state, action) => {
                state.submittingDay = action.meta.arg.day;
                state.error = null;
            })
            .addMatcher(
                isAnyOf(
                    updateWorkingHoursDay.fulfilled,
                    updateWorkingHoursDay.rejected,
                ),
                (state) => {
                    state.submittingDay = null;
                },
            )

            .addMatcher(isAnyOf(deleteWorkingHoursDay.pending), (state, action) => {
                state.deletingDay = action.meta.arg;
                state.error = null;
            })
            .addMatcher(
                isAnyOf(
                    deleteWorkingHoursDay.fulfilled,
                    deleteWorkingHoursDay.rejected,
                ),
                (state) => {
                    state.deletingDay = null;
                },
            )

        addAuthSessionResetMatcher(builder, initialState);
    },
});

export const { clearWorkingHoursError, resetWorkingHours } =
    workingHoursSlice.actions;
