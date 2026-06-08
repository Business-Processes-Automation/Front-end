import { createSlice, isAnyOf } from "@reduxjs/toolkit";

import { addAuthSessionResetMatcher } from "@/shared/store/auth-reset";

import type { ServicesState } from "./state-types";
import {
    createService,
    deleteService,
    fetchServices,
    updateService,
} from "./thunks";

const initialState: ServicesState = {
    items: [],
    isInitialized: false,
    isListLoading: false,
    isSubmitting: false,
    error: null,
};

const mutationThunks = [createService, updateService, deleteService] as const;

export const servicesSlice = createSlice({
    name: "services",
    initialState,
    reducers: {
        clearServicesError(state) {
            state.error = null;
        },
        resetServices() {
            return initialState;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchServices.pending, (state) => {
                state.isListLoading = true;
                state.error = null;
            })
            .addCase(fetchServices.fulfilled, (state, action) => {
                state.items = action.payload;
                state.isListLoading = false;
                state.isInitialized = true;
                state.error = null;
            })
            .addCase(fetchServices.rejected, (state, action) => {
                state.isListLoading = false;
                state.isInitialized = true;
                state.error = action.payload ?? null;
            })

            .addCase(createService.fulfilled, (state, action) => {
                state.items = [...state.items, action.payload].sort((a, b) =>
                    a.serviceName.localeCompare(b.serviceName, "uk"),
                );
                state.error = null;
            })
            .addCase(updateService.fulfilled, (state, action) => {
                state.items = state.items
                    .map((item) =>
                        item.id === action.payload.id ? action.payload : item,
                    )
                    .sort((a, b) =>
                        a.serviceName.localeCompare(b.serviceName, "uk"),
                    );
                state.error = null;
            })
            .addCase(deleteService.fulfilled, (state, action) => {
                state.items = state.items.filter(
                    (item) => item.id !== action.payload,
                );
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

export const { clearServicesError, resetServices } = servicesSlice.actions;
