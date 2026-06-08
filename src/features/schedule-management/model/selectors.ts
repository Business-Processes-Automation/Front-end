import type { ScheduleSettingsState } from "./state-types";

type StateWithScheduleSettings = {
    scheduleSettings: ScheduleSettingsState;
};

export const selectScheduleSettingsState = (state: StateWithScheduleSettings) =>
    state.scheduleSettings;

export const selectScheduleSettings = (state: StateWithScheduleSettings) =>
    state.scheduleSettings.settings;

export const selectScheduleSettingsError = (state: StateWithScheduleSettings) =>
    state.scheduleSettings.error;

export const selectIsScheduleSettingsInitialized = (
    state: StateWithScheduleSettings,
) => state.scheduleSettings.isInitialized;

export const selectIsScheduleSettingsLoading = (
    state: StateWithScheduleSettings,
) => state.scheduleSettings.isLoading;

export const selectIsScheduleSettingsSubmitting = (
    state: StateWithScheduleSettings,
) => state.scheduleSettings.isSubmitting;

export const selectIsScheduleSettingsNotFound = (
    state: StateWithScheduleSettings,
) => state.scheduleSettings.isNotFound;
