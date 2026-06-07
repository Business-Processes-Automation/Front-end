import { createSlice, isAnyOf } from "@reduxjs/toolkit";

import {
    setAuthenticated,
    setGuest,
    setSessionPending,
} from "./slice-helpers";
import type { AuthState } from "./types";
import {
    fetchCurrentUser,
    login,
    logout,
    register,
} from "./thunks";

const initialState: AuthState = {
    user: null,
    isInitialized: false,
    isSubmitting: false,
    error: null,
};

const sessionThunks = [login, register, logout] as const;

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearAuthError(state) {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCurrentUser.fulfilled, (state, action) => {
                setAuthenticated(state, action.payload);
            })
            .addCase(fetchCurrentUser.rejected, (state) => {
                setGuest(state);
            })

            .addCase(login.fulfilled, (state, action) => {
                setAuthenticated(state, action.payload);
            })
            .addCase(login.rejected, (state, action) => {
                setGuest(state, action.payload ?? null);
            })

            .addCase(register.fulfilled, (state, action) => {
                setAuthenticated(state, action.payload);
            })
            .addCase(register.rejected, (state, action) => {
                setGuest(state, action.payload ?? null);
            })

            .addCase(logout.fulfilled, (state) => {
                setGuest(state);
            })
            .addCase(logout.rejected, (state, action) => {
                setGuest(state, action.payload ?? null);
            })

            .addMatcher(isAnyOf(...sessionThunks.map((t) => t.pending)), (state) => {
                state.isSubmitting = true;
                state.error = null;
            })
            .addMatcher(
                isAnyOf(
                    ...sessionThunks.map((t) => t.fulfilled),
                    ...sessionThunks.map((t) => t.rejected),
                ),
                (state) => {
                    state.isSubmitting = false;
                },
            )

            .addMatcher(isAnyOf(fetchCurrentUser.pending), (state) => {
                if (!state.isInitialized) {
                    setSessionPending(state);
                }
            });
    },
});

export const { clearAuthError } = authSlice.actions;
