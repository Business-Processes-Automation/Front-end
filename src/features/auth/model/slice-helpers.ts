import type { User } from "@/entities/user";

import type { AuthState } from "./types";

export function setAuthenticated(state: AuthState, user: User) {
    state.user = user;
    state.isSubmitting = false;
    state.error = null;
    state.isInitialized = true;
}

export function setGuest(state: AuthState, error: string | null = null) {
    state.user = null;
    state.isSubmitting = false;
    state.error = error;
    state.isInitialized = true;
}

export function setSessionPending(state: AuthState) {
    state.isSubmitting = false;
    state.error = null;
}
