import type { AuthState } from "./types";

type StateWithAuth = {
    auth: AuthState;
};

export const selectAuthState = (state: StateWithAuth) => state.auth;

export const selectCurrentUser = (state: StateWithAuth) => state.auth.user;

export const selectAuthError = (state: StateWithAuth) => state.auth.error;

export const selectIsAuthInitialized = (state: StateWithAuth) =>
    state.auth.isInitialized;

export const selectIsSubmitting = (state: StateWithAuth) =>
    state.auth.isSubmitting;

/** Перевірка cookie-сесії при старті застосунку. */
export const selectIsSessionPending = (state: StateWithAuth) =>
    !state.auth.isInitialized;

export const selectIsAuthenticated = (state: StateWithAuth) =>
    state.auth.isInitialized && state.auth.user !== null;

/** Для форм і кнопок (сабміт або початкова перевірка сесії). */
export const selectIsAuthLoading = (state: StateWithAuth) =>
    selectIsSessionPending(state) || selectIsSubmitting(state);
