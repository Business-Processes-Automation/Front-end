"use client";

import { useCallback } from "react";

import type { CreateTimeOffInput, TimeOffDateRange } from "@/entities/schedule";
import { selectCurrentUser } from "@/features/auth/model";
import { useAppDispatch, useAppSelector } from "@/shared/store";

import {
    clearTimeOffsError,
    createTimeOff,
    deleteTimeOff,
    fetchTimeOffs,
    selectIsTimeOffSubmitting,
    selectIsTimeOffsInitialized,
    selectIsTimeOffsLoading,
    selectTimeOffDeletingId,
    selectTimeOffs,
    selectTimeOffsError,
    selectTimeOffsRange,
} from "../model";

export function useTimeOffs() {
    const dispatch = useAppDispatch();
    const userId = useAppSelector(selectCurrentUser)?.id;

    const items = useAppSelector(selectTimeOffs);
    const range = useAppSelector(selectTimeOffsRange);
    const error = useAppSelector(selectTimeOffsError);
    const isInitialized = useAppSelector(selectIsTimeOffsInitialized);
    const isLoading = useAppSelector(selectIsTimeOffsLoading);
    const isSubmitting = useAppSelector(selectIsTimeOffSubmitting);
    const deletingId = useAppSelector(selectTimeOffDeletingId);

    const loadTimeOffs = useCallback(
        (nextRange: TimeOffDateRange) => {
            dispatch(clearTimeOffsError());
            return dispatch(fetchTimeOffs(nextRange));
        },
        [dispatch],
    );

    const addTimeOff = useCallback(
        async (input: CreateTimeOffInput) => {
            dispatch(clearTimeOffsError());
            const result = await dispatch(createTimeOff(input));
            return createTimeOff.fulfilled.match(result);
        },
        [dispatch],
    );

    const removeTimeOff = useCallback(
        async (id: number) => {
            dispatch(clearTimeOffsError());
            const result = await dispatch(deleteTimeOff(id));
            return deleteTimeOff.fulfilled.match(result);
        },
        [dispatch],
    );

    return {
        userId,
        items,
        range,
        error,
        isInitialized,
        isLoading,
        isSubmitting,
        deletingId,
        loadTimeOffs,
        addTimeOff,
        removeTimeOff,
        clearError: () => dispatch(clearTimeOffsError()),
    };
}
