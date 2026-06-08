import type { WorkingHoursState } from "./working-hours-state-types";

type StateWithWorkingHours = {
    workingHours: WorkingHoursState;
};

export const selectWorkingHoursWeek = (state: StateWithWorkingHours) =>
    state.workingHours.week;

export const selectWorkingHoursError = (state: StateWithWorkingHours) =>
    state.workingHours.error;

export const selectIsWorkingHoursInitialized = (state: StateWithWorkingHours) =>
    state.workingHours.isInitialized;

export const selectIsWorkingHoursLoading = (state: StateWithWorkingHours) =>
    state.workingHours.isLoading;

export const selectIsWorkingHoursSubmittingWeek = (
    state: StateWithWorkingHours,
) => state.workingHours.isSubmittingWeek;

export const selectWorkingHoursSubmittingDay = (
    state: StateWithWorkingHours,
) => state.workingHours.submittingDay;

export const selectWorkingHoursDeletingDay = (state: StateWithWorkingHours) =>
    state.workingHours.deletingDay;

export const selectWorkingHoursState = (state: StateWithWorkingHours) =>
    state.workingHours;
