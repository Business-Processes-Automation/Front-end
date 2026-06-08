import { createSlice, isAnyOf } from "@reduxjs/toolkit";

import { addAuthSessionResetMatcher } from "@/shared/store/auth-reset";

import type { TimeOffsState } from "./time-offs-state-types";
import { createTimeOff, deleteTimeOff, fetchTimeOffs } from "./time-offs-thunks";

const initialState: TimeOffsState = {
    items: [],
    range: null,
    isInitialized: false,
    isLoading: false,
    isSubmitting: false,
    deletingId: null,
    error: null,
};

export const timeOffsSlice = createSlice({
    name: "timeOffs",
    initialState,
    reducers: {
        clearTimeOffsError(state) {
            state.error = null;
        },
        resetTimeOffs() {
            return initialState;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTimeOffs.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchTimeOffs.fulfilled, (state, action) => {
                state.items = action.payload.items;
                state.range = action.payload.range;
                state.isLoading = false;
                state.isInitialized = true;
                state.error = null;
            })
            .addCase(fetchTimeOffs.rejected, (state, action) => {
                state.isLoading = false;
                state.isInitialized = true;
                state.error = action.payload ?? null;
            })

            .addCase(createTimeOff.fulfilled, (state, action) => {
                state.items = [...state.items, action.payload].sort((a, b) =>
                    a.startLocal.localeCompare(b.startLocal),
                );
                state.error = null;
            })
            .addCase(createTimeOff.rejected, (state, action) => {
                state.error = action.payload ?? null;
            })

            .addCase(deleteTimeOff.fulfilled, (state, action) => {
                state.items = state.items.filter(
                    (item) => item.id !== action.payload,
                );
                state.error = null;
            })
            .addCase(deleteTimeOff.rejected, (state, action) => {
                state.error = action.payload ?? null;
            })

            .addMatcher(isAnyOf(createTimeOff.pending), (state) => {
                state.isSubmitting = true;
                state.error = null;
            })
            .addMatcher(
                isAnyOf(createTimeOff.fulfilled, createTimeOff.rejected),
                (state) => {
                    state.isSubmitting = false;
                },
            )

            .addMatcher(isAnyOf(deleteTimeOff.pending), (state, action) => {
                state.deletingId = action.meta.arg;
                state.error = null;
            })
            .addMatcher(
                isAnyOf(deleteTimeOff.fulfilled, deleteTimeOff.rejected),
                (state) => {
                    state.deletingId = null;
                },
            )

        addAuthSessionResetMatcher(builder, initialState);
    },
});

export const { clearTimeOffsError, resetTimeOffs } = timeOffsSlice.actions;
