import type { ServicesState } from "./state-types";

type StateWithServices = {
    services: ServicesState;
};

export const selectServices = (state: StateWithServices) => state.services.items;

export const selectServicesError = (state: StateWithServices) =>
    state.services.error;

export const selectIsServicesInitialized = (state: StateWithServices) =>
    state.services.isInitialized;

export const selectIsServicesListLoading = (state: StateWithServices) =>
    state.services.isListLoading;

export const selectIsServiceSubmitting = (state: StateWithServices) =>
    state.services.isSubmitting;
