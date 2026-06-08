import type { TimeOffsState } from "./time-offs-state-types";

type StateWithTimeOffs = {
    timeOffs: TimeOffsState;
};

export const selectTimeOffs = (state: StateWithTimeOffs) => state.timeOffs.items;

export const selectTimeOffsRange = (state: StateWithTimeOffs) =>
    state.timeOffs.range;

export const selectTimeOffsError = (state: StateWithTimeOffs) =>
    state.timeOffs.error;

export const selectIsTimeOffsInitialized = (state: StateWithTimeOffs) =>
    state.timeOffs.isInitialized;

export const selectIsTimeOffsLoading = (state: StateWithTimeOffs) =>
    state.timeOffs.isLoading;

export const selectIsTimeOffSubmitting = (state: StateWithTimeOffs) =>
    state.timeOffs.isSubmitting;

export const selectTimeOffDeletingId = (state: StateWithTimeOffs) =>
    state.timeOffs.deletingId;
