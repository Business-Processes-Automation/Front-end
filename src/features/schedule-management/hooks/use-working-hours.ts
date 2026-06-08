"use client";

import { useCallback, useEffect, useRef } from "react";

import type {
    UpdateWorkingHoursDayInput,
    Weekday,
    WorkingHoursDayInput,
} from "@/entities/schedule";
import { selectCurrentUser } from "@/features/auth/model";
import { useAppDispatch, useAppSelector } from "@/shared/store";

import {
    clearWorkingHoursError,
    deleteWorkingHoursDay,
    fetchWorkingHours,
    replaceWorkingHours,
    resetWorkingHours,
    selectIsWorkingHoursInitialized,
    selectIsWorkingHoursLoading,
    selectIsWorkingHoursSubmittingWeek,
    selectWorkingHoursDeletingDay,
    selectWorkingHoursError,
    selectWorkingHoursSubmittingDay,
    selectWorkingHoursWeek,
    updateWorkingHoursDay,
} from "../model";

export function useWorkingHours() {
    const dispatch = useAppDispatch();
    const userId = useAppSelector(selectCurrentUser)?.id;
    const prevUserIdRef = useRef<number | undefined>(undefined);

    const week = useAppSelector(selectWorkingHoursWeek);
    const error = useAppSelector(selectWorkingHoursError);
    const isInitialized = useAppSelector(selectIsWorkingHoursInitialized);
    const isLoading = useAppSelector(selectIsWorkingHoursLoading);
    const isSubmittingWeek = useAppSelector(selectIsWorkingHoursSubmittingWeek);
    const submittingDay = useAppSelector(selectWorkingHoursSubmittingDay);
    const deletingDay = useAppSelector(selectWorkingHoursDeletingDay);

    const reload = useCallback(() => {
        dispatch(clearWorkingHoursError());
        return dispatch(fetchWorkingHours());
    }, [dispatch]);

    useEffect(() => {
        if (!userId) {
            return;
        }

        if (prevUserIdRef.current !== userId) {
            dispatch(resetWorkingHours());
            prevUserIdRef.current = userId;
        }

        if (isInitialized || isLoading) {
            return;
        }

        void dispatch(fetchWorkingHours());
    }, [userId, isInitialized, isLoading, dispatch]);

    const saveWeek = useCallback(
        async (days: WorkingHoursDayInput[]) => {
            dispatch(clearWorkingHoursError());
            const result = await dispatch(replaceWorkingHours(days));
            return replaceWorkingHours.fulfilled.match(result);
        },
        [dispatch],
    );

    const saveDay = useCallback(
        async (day: Weekday, input: UpdateWorkingHoursDayInput) => {
            dispatch(clearWorkingHoursError());
            const result = await dispatch(updateWorkingHoursDay({ day, input }));
            return updateWorkingHoursDay.fulfilled.match(result);
        },
        [dispatch],
    );

    const removeDay = useCallback(
        async (day: Weekday) => {
            dispatch(clearWorkingHoursError());
            const result = await dispatch(deleteWorkingHoursDay(day));
            return deleteWorkingHoursDay.fulfilled.match(result);
        },
        [dispatch],
    );

    return {
        userId,
        week,
        error,
        isInitialized,
        isLoading,
        isSubmittingWeek,
        submittingDay,
        deletingDay,
        reload,
        saveWeek,
        saveDay,
        removeDay,
        clearError: () => dispatch(clearWorkingHoursError()),
    };
}
