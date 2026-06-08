"use client";

import { useCallback } from "react";

import type { ScheduleCalendarQuery } from "@/entities/schedule";
import { selectCurrentUser } from "@/features/auth/model";
import { useAppDispatch, useAppSelector } from "@/shared/store";

import {
    clearScheduleCalendarError,
    clearSelectedAppointment,
    fetchAppointmentDetails,
    fetchScheduleCalendar,
    selectIsAppointmentLoading,
    selectIsScheduleCalendarInitialized,
    selectIsScheduleCalendarLoading,
    selectLoadingAppointmentId,
    selectScheduleCalendar,
    selectScheduleCalendarError,
    selectScheduleCalendarQuery,
    selectSelectedAppointment,
} from "../model";

export function useScheduleCalendar() {
    const dispatch = useAppDispatch();
    const userId = useAppSelector(selectCurrentUser)?.id;

    const calendar = useAppSelector(selectScheduleCalendar);
    const lastQuery = useAppSelector(selectScheduleCalendarQuery);
    const selectedAppointment = useAppSelector(selectSelectedAppointment);
    const error = useAppSelector(selectScheduleCalendarError);
    const isInitialized = useAppSelector(selectIsScheduleCalendarInitialized);
    const isCalendarLoading = useAppSelector(selectIsScheduleCalendarLoading);
    const isAppointmentLoading = useAppSelector(selectIsAppointmentLoading);
    const loadingAppointmentId = useAppSelector(selectLoadingAppointmentId);

    const loadCalendar = useCallback(
        (query: ScheduleCalendarQuery) => {
            dispatch(clearScheduleCalendarError());
            return dispatch(fetchScheduleCalendar(query));
        },
        [dispatch],
    );

    const loadAppointment = useCallback(
        async (id: number) => {
            dispatch(clearScheduleCalendarError());
            const result = await dispatch(fetchAppointmentDetails(id));
            return fetchAppointmentDetails.fulfilled.match(result);
        },
        [dispatch],
    );

    return {
        userId,
        calendar,
        lastQuery,
        selectedAppointment,
        error,
        isInitialized,
        isCalendarLoading,
        isAppointmentLoading,
        loadingAppointmentId,
        loadCalendar,
        loadAppointment,
        clearSelectedAppointment: () => dispatch(clearSelectedAppointment()),
        clearError: () => dispatch(clearScheduleCalendarError()),
    };
}
