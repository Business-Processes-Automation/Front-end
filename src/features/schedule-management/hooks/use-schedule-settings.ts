"use client";

import { useCallback, useEffect, useRef } from "react";

import type { ScheduleSettingsInput } from "@/entities/schedule";
import { selectCurrentUser } from "@/features/auth/model";
import { useAppDispatch, useAppSelector } from "@/shared/store";

import {
    clearScheduleSettingsError,
    fetchScheduleSettings,
    resetScheduleSettings,
    selectIsScheduleSettingsInitialized,
    selectIsScheduleSettingsLoading,
    selectIsScheduleSettingsNotFound,
    selectIsScheduleSettingsSubmitting,
    selectScheduleSettings,
    selectScheduleSettingsError,
    updateScheduleSettings,
} from "../model";

export function useScheduleSettings() {
    const dispatch = useAppDispatch();
    const userId = useAppSelector(selectCurrentUser)?.id;
    const prevUserIdRef = useRef<number | undefined>(undefined);

    const settings = useAppSelector(selectScheduleSettings);
    const error = useAppSelector(selectScheduleSettingsError);
    const isInitialized = useAppSelector(selectIsScheduleSettingsInitialized);
    const isNotFound = useAppSelector(selectIsScheduleSettingsNotFound);
    const isLoading = useAppSelector(selectIsScheduleSettingsLoading);
    const isSubmitting = useAppSelector(selectIsScheduleSettingsSubmitting);

    const reload = useCallback(() => {
        dispatch(clearScheduleSettingsError());
        return dispatch(fetchScheduleSettings());
    }, [dispatch]);

    useEffect(() => {
        if (!userId) {
            return;
        }

        if (prevUserIdRef.current !== userId) {
            dispatch(resetScheduleSettings());
            prevUserIdRef.current = userId;
        }

        if (isInitialized || isLoading) {
            return;
        }

        void dispatch(fetchScheduleSettings());
    }, [userId, isInitialized, isLoading, dispatch]);

    const saveSettings = useCallback(
        async (input: ScheduleSettingsInput) => {
            dispatch(clearScheduleSettingsError());
            const result = await dispatch(updateScheduleSettings(input));
            return updateScheduleSettings.fulfilled.match(result);
        },
        [dispatch],
    );

    return {
        userId,
        settings,
        error,
        isInitialized,
        isNotFound,
        isLoading,
        isSubmitting,
        reload,
        saveSettings,
        clearError: () => dispatch(clearScheduleSettingsError()),
    };
}
